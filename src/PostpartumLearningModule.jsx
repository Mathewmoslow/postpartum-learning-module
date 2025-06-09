import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, BookOpen, CheckCircle, X, Calculator, Bookmark, CheckSquare, Search, Info, Menu, Moon, Sun } from 'lucide-react';
// Import all 14 components
import SimpleFetalCirculation from './components/SimpleFetalCirculation';
import NewbornTransitionSimulator from './components/NewbornTransitionSimulator';
import APGARCalculator from './components/APGARCalculator';
import PostpartumAssessment from './components/PostpartumAssessment';
import InvolutionSimulator from './components/InvolutionSimulator';
import LactationStagesExplorer from './components/LactationStagesExplorer';
import BreastfeedingTroubleshooter from './components/BreastfeedingTroubleshooter';
import BreastfeedingPositionGuide from './components/BreastfeedingPositionGuide';
import PainManagementCalculator from './components/PainManagementCalculator';
import NewbornAssessmentChecklist from './components/NewbornAssessmentChecklist';
import MaternalAdaptationQuiz from './components/MaternalAdaptationQuiz';
import ContraceptionSelector from './components/ContraceptionSelector';
import ContraceptionEffectivenessChart from './components/ContraceptionEffectivenessChart';
import NewbornCareProtocols from './components/NewbornCareProtocols';

// Custom Hook for localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// Audio Player Component
const AudioPlayer = ({ audioFile, onTimeUpdate, onEnded, bookmarks, onAddBookmark }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
      if (onTimeUpdate) {
        onTimeUpdate(audio.currentTime);
      }
    };

    const handleError = (e) => {
      console.error('Audio loading error:', e);
      console.error('Failed to load:', audioFile);
      setAudioError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    });

    // Reset error state when audio file changes
    setAudioError(false);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('error', handleError);
    };
  }, [audioFile, onTimeUpdate, onEnded]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => {
        console.error('Play error:', e);
        setAudioError(true);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleSpeedChange = (speed) => {
    audioRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const skipTime = (seconds) => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAddBookmark = () => {
    if (onAddBookmark) {
      onAddBookmark(currentTime);
    }
  };

  return (
    <div className="w-full bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <audio ref={audioRef} src={audioFile} />
      
      {audioError && (
        <div className="bg-red-600 text-white p-2 rounded mb-4 text-sm">
          Error loading audio file. Please check that {audioFile} exists in public/audio/
        </div>
      )}
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <button
            onClick={handleAddBookmark}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
            title="Add bookmark at current time"
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <span className="text-sm">{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => skipTime(-10)}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          disabled={audioError}
        >
          <SkipBack className="w-5 h-5" />
        </button>
        
        <button
          onClick={togglePlayPause}
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
          disabled={audioError}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        
        <button
          onClick={() => skipTime(10)}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          disabled={audioError}
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Volume2 className="w-4 h-4" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">Speed:</span>
          {[0.5, 1, 1.25, 1.5, 2].map(speed => (
            <button
              key={speed}
              onClick={() => handleSpeedChange(speed)}
              className={`px-2 py-1 text-xs rounded ${
                playbackRate === speed ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Interactive Component Wrapper
const InteractiveComponentWrapper = ({ component, isActive }) => {
  if (!isActive) return null;
  
  return (
    <div className="my-8 p-6 bg-blue-50 rounded-lg shadow-lg animate-fadeIn">
      <div className="mb-4 flex items-center gap-2 text-blue-700">
        <Calculator className="w-5 h-5" />
        <span className="font-semibold">Interactive Component</span>
      </div>
      {component}
    </div>
  );
};

// Define lessons with integrated components
const completePostpartumLessons = [
  {
    id: 1,
    title: "Introduction to Postpartum & Newborn Care",
    duration: "15 min",
    audioFile: `${process.env.PUBLIC_URL}/audio/introduction.mp3`,
    content: {
      title: "Introduction to Postpartum Care",
      sections: [
        {
          heading: "Overview",
          text: "This comprehensive learning module covers essential aspects of postpartum and newborn care. You'll learn about immediate assessments, ongoing monitoring, and evidence-based interventions to ensure optimal outcomes for both mother and baby."
        },
        {
          heading: "Learning Objectives",
          list: [
            "Understand the physiological changes during the postpartum period",
            "Master assessment techniques for both mother and newborn",
            "Recognize warning signs and complications",
            "Provide evidence-based care and education"
          ]
        }
      ]
    },
    components: [
      {
        timestamp: 120, // 2 minutes into the audio
        component: <SimpleFetalCirculation />,
        duration: 300 // Show for 5 minutes
      },
      {
        timestamp: 450, // 7.5 minutes
        component: <NewbornTransitionSimulator />,
        duration: 300
      }
    ]
  },
  {
    id: 2,
    title: "Immediate Postpartum - Maternal",
    duration: "20 min",
    audioFile: `${process.env.PUBLIC_URL}/audio/immediate-maternal.mp3`,
    content: {
      title: "Immediate Postpartum Maternal Care",
      sections: [
        {
          heading: "Critical First Hour",
          text: "The first hour after delivery is crucial for maternal stability. Focus on hemorrhage prevention, vital sign monitoring, and early bonding facilitation."
        },
        {
          heading: "Assessment Priorities",
          list: [
            "Fundal assessment and massage",
            "Lochia evaluation", 
            "Perineal/cesarean incision check",
            "Vital signs monitoring",
            "Pain assessment"
          ]
        }
      ]
    },
    components: [
      {
        timestamp: 180, // 3 minutes
        component: <PostpartumAssessment />,
        duration: 600 // Show for 10 minutes
      },
      {
        timestamp: 900, // 15 minutes
        component: <PainManagementCalculator />,
        duration: 300
      }
    ]
  },
  {
    id: 3,
    title: "Immediate Postpartum - Neonatal",
    duration: "25 min",
    audioFile: `${process.env.PUBLIC_URL}/audio/immediate-neonatal.mp3`,
    content: {
      title: "Immediate Newborn Care",
      sections: [
        {
          heading: "Golden Hour Care",
          text: "The first hour of life establishes the foundation for newborn health. Prioritize thermoregulation, respiratory stability, and early feeding."
        },
        {
          heading: "Essential Assessments",
          list: [
            "APGAR scoring at 1 and 5 minutes",
            "Initial physical examination",
            "Vital signs and measurements",
            "Gestational age assessment",
            "Feeding readiness"
          ]
        }
      ]
    },
    components: [
      {
        timestamp: 60, // 1 minute
        component: <APGARCalculator />,
        duration: 300
      },
      {
        timestamp: 600, // 10 minutes
        component: <NewbornAssessmentChecklist />,
        duration: 600
      }
    ]
  },
  {
    id: 4,
    title: "Early Postpartum (2-24 hours)",
    duration: "30 min",
    audioFile: `${process.env.PUBLIC_URL}/audio/early-postpartum.mp3`,
    content: {
      title: "Early Postpartum Period",
      sections: [
        {
          heading: "Maternal Monitoring",
          text: "Continue vigilant assessment while promoting recovery and bonding. Monitor for complications while supporting self-care abilities."
        },
        {
          heading: "Key Interventions",
          list: [
            "Ongoing fundal and lochia checks",
            "Pain management optimization",
            "Ambulation and bladder function",
            "Breastfeeding support",
            "Education on warning signs"
          ]
        }
      ]
    },
    components: [
      {
        timestamp: 300, // 5 minutes
        component: <InvolutionSimulator />,
        duration: 400
      },
      {
        timestamp: 900, // 15 minutes
        component: <BreastfeedingPositionGuide />,
        duration: 600
      },
      {
        timestamp: 1500, // 25 minutes
        component: <BreastfeedingTroubleshooter />,
        duration: 300
      }
    ]
  },
  {
    id: 5,
    title: "Extended Postpartum & Discharge Planning",
    duration: "25 min",
    audioFile: `${process.env.PUBLIC_URL}/audio/extended-postpartum.mp3`,
    content: {
      title: "Extended Postpartum Care",
      sections: [
        {
          heading: "Preparing for Discharge",
          text: "Ensure mothers and families are equipped with knowledge and resources for successful transition home."
        },
        {
          heading: "Discharge Teaching",
          list: [
            "Self-care and recovery expectations",
            "Newborn care basics",
            "Feeding plans and support",
            "Warning signs requiring immediate care",
            "Follow-up appointments",
            "Contraception options"
          ]
        }
      ]
    },
    components: [
      {
        timestamp: 180, // 3 minutes
        component: <MaternalAdaptationQuiz />,
        duration: 600
      },
      {
        timestamp: 900, // 15 minutes
        component: <ContraceptionSelector />,
        duration: 300
      },
      {
        timestamp: 1200, // 20 minutes
        component: <ContraceptionEffectivenessChart />,
        duration: 300
      }
    ]
  },
  {
    id: 6,
    title: "Breastfeeding Support & Education",
    duration: "20 min",
    audioFile: "/audio/breastfeeding-support.mp3",
    content: {
    audioFile: `${process.env.PUBLIC_URL}/audio/breastfeeding-support.mp3`,
      sections: [
        {
          heading: "Establishing Successful Breastfeeding",
          text: "Support optimal breastfeeding through education, hands-on assistance, and problem-solving strategies."
        },
        {
          heading: "Key Topics",
          list: [
            "Latch assessment and correction",
            "Milk supply establishment",
            "Common challenges and solutions",
            "Pumping and storage guidelines",
            "Support resources"
          ]
        }
      ]
    },
    components: [
      {
        timestamp: 120, // 2 minutes
        component: <LactationStagesExplorer />,
        duration: 600
      },
      {
        timestamp: 900, // 15 minutes
        component: <BreastfeedingTroubleshooter />,
        duration: 300
      }
    ]
  },
  {
    id: 7,
    title: "Newborn Assessment & Care Protocols",
    duration: "25 min",
    audioFile: `${process.env.PUBLIC_URL}/audio/newborn-assessment.mp3`,
    content: {
      title: "Comprehensive Newborn Assessment",
      sections: [
        {
          heading: "Systematic Newborn Evaluation",
          text: "Master the complete newborn assessment to identify normal findings and recognize potential concerns."
        },
        {
          heading: "Assessment Components",
          list: [
            "Head-to-toe physical examination",
            "Neurobehavioral assessment",
            "Feeding evaluation",
            "Parent education priorities",
            "Documentation requirements"
          ]
        }
      ]
    },
    components: [
      {
        timestamp: 300, // 5 minutes
        component: <NewbornCareProtocols />,
        duration: 900
      },
      {
        timestamp: 1200, // 20 minutes
        component: <NewbornAssessmentChecklist />,
        duration: 300
      }
    ]
  }
];

// Sidebar Component
const Sidebar = ({ lessons, currentLesson, onLessonSelect, progress, bookmarks, darkMode }) => {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className={`h-full p-4 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100'}`}>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${
              darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white'
            }`}
          />
        </div>
      </div>
      
      <button
        onClick={() => setShowBookmarks(!showBookmarks)}
        className={`w-full mb-4 p-2 rounded-lg flex items-center justify-center gap-2 ${
          showBookmarks ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
      >
        {showBookmarks ? <CheckSquare className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        {showBookmarks ? 'Show All Lessons' : 'Show Bookmarks'}
      </button>

      <div className="space-y-2">
        {(showBookmarks ? bookmarks : filteredLessons).map((item) => {
          const lesson = showBookmarks ? lessons.find(l => l.id === item.lessonId) : item;
          if (!lesson) return null;
          
          return (
            <button
              key={lesson.id}
              onClick={() => onLessonSelect(lesson)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                currentLesson?.id === lesson.id
                  ? 'bg-blue-600 text-white'
                  : darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-100'
                    : 'bg-white hover:bg-gray-200 text-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium">{lesson.title}</span>
                </div>
                {progress[lesson.id]?.completed && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div className="text-xs opacity-60 mt-1">{lesson.duration}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Content Viewer Component
const ContentViewer = ({ lesson, currentTime, darkMode }) => {
  const [activeComponents, setActiveComponents] = useState([]);
  
  useEffect(() => {
    if (!lesson.components) return;
    
    // Check which components should be active based on current time
    const active = lesson.components.filter(comp => {
      const endTime = comp.timestamp + (comp.duration || 300);
      return currentTime >= comp.timestamp && currentTime <= endTime;
    });
    
    setActiveComponents(active);
  }, [currentTime, lesson]);
  
  return (
    <div className={`flex-1 p-8 overflow-y-auto ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{lesson.content.title}</h1>
        
        {lesson.content.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
            {section.text && <p className="mb-4 leading-relaxed">{section.text}</p>}
            {section.list && (
              <ul className="list-disc list-inside space-y-2">
                {section.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        
        {/* Render active components */}
        {activeComponents.map((comp, index) => (
          <InteractiveComponentWrapper
            key={`${comp.timestamp}-${index}`}
            component={comp.component}
            isActive={true}
          />
        ))}
      </div>
    </div>
  );
};

// Main Component
const PostpartumLearningModule = () => {
  const [currentLesson, setCurrentLesson] = useState(completePostpartumLessons[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useLocalStorage('postpartum-progress', {});
  const [bookmarks, setBookmarks] = useLocalStorage('postpartum-bookmarks', []);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useLocalStorage('postpartum-dark-mode', false);
  const [showHelp, setShowHelp] = useState(false);

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleLessonComplete = () => {
    setProgress({
      ...progress,
      [currentLesson.id]: { completed: true, completedAt: new Date().toISOString() }
    });
  };

  const handleAddBookmark = (time) => {
    const bookmark = {
      id: Date.now(),
      lessonId: currentLesson.id,
      time: time,
      note: '',
      createdAt: new Date().toISOString()
    };
    setBookmarks([...bookmarks, bookmark]);
  };

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    setCurrentTime(0);
  };

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} shadow-sm border-b`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Postpartum Learning Module</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHelp(true)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              <Info className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-80 border-r">
            <Sidebar
              lessons={completePostpartumLessons}
              currentLesson={currentLesson}
              onLessonSelect={handleLessonSelect}
              progress={progress}
              bookmarks={bookmarks}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* Content Area */}
        <ContentViewer
          lesson={currentLesson}
          currentTime={currentTime}
          darkMode={darkMode}
        />
      </div>

      {/* Audio Player */}
      <div className="border-t">
        <AudioPlayer
          audioFile={currentLesson.audioFile}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleLessonComplete}
          bookmarks={bookmarks.filter(b => b.lessonId === currentLesson.id)}
          onAddBookmark={handleAddBookmark}
        />
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} rounded-lg p-6 max-w-md m-4`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Help & Instructions</h2>
              <button onClick={() => setShowHelp(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <p>• Interactive components appear automatically at specific times during audio playback</p>
              <p>• Use the sidebar to navigate between lessons</p>
              <p>• Click the bookmark icon to save important moments</p>
              <p>• Audio controls: Play/Pause (Space), Skip ±10s (Arrow keys)</p>
              <p>• Your progress is automatically saved</p>
              <p>• Components remain visible for 5-10 minutes after appearing</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostpartumLearningModule;