import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Bookmark, Clock, ChevronRight, Menu, X, BookOpen, CheckCircle, AlertCircle, Home, HelpCircle, Sun, Moon, BarChart } from 'lucide-react';

// Import all interactive components
import PostpartumAssessment from './components/PostpartumAssessment';
import MaternalAdaptationQuiz from './components/MaternalAdaptationQuiz';
import InvolutionSimulator from './components/InvolutionSimulator';
import LactationStagesExplorer from './components/LactationStagesExplorer';
import FeedingMethodComparison from './components/FeedingMethodComparison';
import BreastfeedingTroubleshooter from './components/BreastfeedingTroubleshooter';
import MethodEffectivenessChart from './components/MethodEffectivenessChart';
import ContraceptionSelector from './components/ContraceptionSelector';
import APGARCalculator from './components/APGARCalculator';
import BallardScoreAssessment from './components/BallardScoreAssessment';
import FetalCirculationDiagram from './components/FetalCirculationDiagram';
import NewbornTransitionSimulator from './components/NewbornTransitionSimulator';
import SimpleFetalCirculation from './components/SimpleFetalCirculation';
import NewbornCareProtocols from './components/NewbornCareProtocols';

// Component loader for dynamic components
const componentMap = {
  PostpartumAssessment,
  MaternalAdaptationQuiz,
  InvolutionSimulator,
  LactationStagesExplorer,
  FeedingMethodComparison,
  BreastfeedingTroubleshooter,
  MethodEffectivenessChart,
  ContraceptionSelector,
  APGARCalculator,
  BallardScoreAssessment,
  FetalCirculationDiagram,
  NewbornTransitionSimulator,
  SimpleFetalCirculation,
  NewbornCareProtocols
};

const ComponentLoader = ({ componentName }) => {
  const Component = componentMap[componentName];
  return Component ? <Component /> : null;
};

// Custom hook for localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// Complete lesson data with all components integrated
const completePostpartumLessons = [
  {
    id: 'introduction',
    title: 'Introduction',
    duration: '5:30',
    audioFile: '/audio/introduction.mp3',
    content: {
      title: 'Welcome to the Postpartum Process',
      sections: [
        {
          heading: 'Overview',
          paragraphs: [
            'Welcome to this comprehensive learning module on the postpartum process.',
            'This interactive experience will guide you through the critical period following childbirth.',
            'You\'ll learn about both maternal and neonatal adaptations during this transformative time.'
          ]
        },
        {
          heading: 'Learning Objectives',
          paragraphs: [
            'By the end of this module, you will be able to:',
            '• Identify normal physiological changes in the postpartum period',
            '• Recognize signs of complications requiring intervention',
            '• Understand neonatal adaptation to extrauterine life',
            '• Apply evidence-based nursing interventions',
            '• Support families during the postpartum transition'
          ]
        },
        {
          heading: 'Module Structure',
          paragraphs: [
            'This module is divided into chronological sections following the postpartum timeline.',
            'Each section includes interactive elements to reinforce learning.',
            'Audio narration accompanies visual content for optimal engagement.',
            'Practice your clinical skills with our assessment tools and simulators.'
          ]
        }
      ]
    },
    interactiveElements: []
  },
  {
    id: 'immediate-maternal',
    title: 'Immediate Post-Delivery: Maternal',
    duration: '12:00',
    audioFile: '/audio/immediate-maternal.mp3',
    content: {
      title: 'Immediate Post-Delivery Period (0-2 Hours) - Maternal',
      sections: [
        {
          heading: 'The Fourth Stage of Labor',
          paragraphs: [
            'The moment the placenta delivers marks the beginning of dramatic physiological changes.',
            'The uterus immediately begins the process of involution through powerful myometrial contractions.',
            'These contractions compress blood vessels at the placental site, achieving hemostasis.',
            'The fundus should remain firm and at or below the umbilicus level.',
            'Continued mild contractions help expel clots and maintain hemostasis.'
          ]
        },
        {
          heading: 'Expected Maternal Findings',
          table: {
            headers: ['Assessment', 'Normal Finding', 'Frequency', 'Red Flags'],
            rows: [
              ['Fundus', 'Firm, midline, at umbilicus', 'q15min × 1hr, then q30min', 'Boggy, displaced, or rising'],
              ['Lochia', 'Rubra, moderate amount', 'With each fundal check', 'Heavy flow, large clots, foul odor'],
              ['Vital Signs', 'BP stable, HR 60-100', 'q15min × 1hr', 'BP <90/60, HR >110, Temp >100.4°F'],
              ['Perineum', 'Intact or minimal edema', 'Within first hour', 'Hematoma, excessive swelling'],
              ['Bladder', 'Voiding within 4-6hr', 'Assess with fundal checks', 'Distention, inability to void']
            ]
          }
        },
        {
          heading: 'Hormonal Cascade',
          paragraphs: [
            'Dramatic hormonal changes occur immediately after placental delivery.',
            'Estrogen drops from 50,000 pg/mL to less than 100 pg/mL within hours.',
            'Progesterone falls from 150 ng/mL to less than 5 ng/mL.',
            'Prolactin remains elevated at 200-400 ng/mL if breastfeeding.',
            'Oxytocin increases with breastfeeding in a pulsatile release pattern.'
          ]
        },
        {
          heading: 'Perineal Assessment',
          paragraphs: [
            'Regular perineal assessment is crucial in the immediate postpartum period.',
            'The REEDA scale provides a standardized method for evaluating perineal healing.',
            'Documentation of findings helps track healing progress and identify complications early.'
          ]
        }
      ]
    },
    interactiveElements: [
      {
        type: 'quiz',
        timestamp: 300,
        question: 'What is the normal blood loss for a vaginal delivery?',
        options: ['<300mL', '<500mL', '<1000mL', '<1500mL'],
        correct: 1,
        explanation: 'Normal blood loss for vaginal delivery is less than 500mL. Cesarean delivery allows up to 1000mL.',
        shown: false
      },
      {
        type: 'component',
        componentName: 'PostpartumAssessment',
        timestamp: 360,
        description: 'Practice using clinical assessment tools'
      },
      {
        type: 'quiz',
        timestamp: 480,
        question: 'How often should you assess the fundus in the first hour postpartum?',
        options: ['Every 5 minutes', 'Every 15 minutes', 'Every 30 minutes', 'Every hour'],
        correct: 1,
        explanation: 'Fundal assessment should be performed every 15 minutes for the first hour, then every 30 minutes for the second hour.',
        shown: false
      }
    ]
  },
  {
    id: 'immediate-neonatal',
    title: 'Immediate Post-Delivery: Neonatal',
    duration: '10:45',
    audioFile: '/audio/immediate-neonatal.mp3',
    content: {
      title: 'Immediate Post-Delivery Period (0-2 Hours) - Neonatal',
      sections: [
        {
          heading: 'Neonatal Adaptations',
          paragraphs: [
            'The newborn undergoes perhaps even more dramatic changes in these first moments.',
            'The transition from intrauterine to extrauterine life requires immediate respiratory adaptation.',
            'Multiple stimuli work together to initiate and maintain breathing.'
          ]
        },
        {
          heading: 'Stimuli for First Breath',
          paragraphs: [
            'Chemical stimuli include decreased oxygen (from 25-30 to 50-70 mmHg), increased CO2, and acidosis (pH <7.35).',
            'Mechanical stimuli involve thoracic compression and recoil creating -70 cm H2O pressure.',
            'Thermal stimuli result from temperature drop of 2°C per minute if not managed.',
            'Sensory stimuli include light, sound, touch, and gravity effects.'
          ]
        },
        {
          heading: 'Fetal Shunt Closure',
          table: {
            headers: ['Shunt', 'Function', 'Trigger', 'Timing', 'What to Monitor'],
            rows: [
              ['Ductus Venosus', 'Bypasses liver; connects umbilical vein to IVC', 'Cord clamping', 'Immediate', 'Color changes, perfusion'],
              ['Foramen Ovale', 'Right atrium to left atrium shunt to bypass lungs', '↑ Left atrial pressure', 'Hours to days', 'O2 saturation, cyanosis'],
              ['Ductus Arteriosus', 'Pulmonary artery to aorta to bypass lungs', '↑ O2, ↓ Prostaglandin E2', '15-24 hours', 'Murmurs, respiratory effort']
            ]
          }
        },
        {
          heading: 'Heat Loss Prevention',
          paragraphs: [
            'Newborns are at high risk for heat loss through four mechanisms.',
            'Prevention strategies must address each mechanism to maintain neutral thermal environment.',
            'Temperature instability can lead to serious complications including hypoglycemia.'
          ],
          table: {
            headers: ['Mechanism', 'Description', 'Prevention Strategy'],
            rows: [
              ['Evaporation', 'Wet skin losing heat to air', 'Dry immediately, delay bath'],
              ['Conduction', 'Direct contact with cold surface', 'Pre-warm surfaces, skin-to-skin'],
              ['Convection', 'Air currents across skin', 'No drafts, warm room, hat'],
              ['Radiation', 'Heat loss to cooler objects', 'Away from windows, warm walls']
            ]
          }
        },
        {
          heading: 'APGAR Scoring',
          paragraphs: [
            'The APGAR score provides a rapid assessment of newborn status at 1 and 5 minutes after birth.',
            'Each component is scored 0-2, with a maximum total score of 10.',
            'Scores help guide immediate interventions and document newborn condition.'
          ]
        }
      ]
    },
    interactiveElements: [
      {
        type: 'component',
        componentName: 'APGARCalculator',
        timestamp: 180,
        description: 'Practice APGAR scoring'
      },
      {
        type: 'component',
        componentName: 'NewbornTransitionSimulator',
        timestamp: 300,
        description: 'Explore circulatory changes'
      },
      {
        type: 'component',
        componentName: 'SimpleFetalCirculation',
        timestamp: 420,
        description: 'Visualize fetal shunt closure'
      },
      {
        type: 'quiz',
        timestamp: 540,
        question: 'Which fetal shunt closure can cause temporary murmurs in the first 48 hours?',
        options: ['Ductus Venosus', 'Foramen Ovale', 'Ductus Arteriosus', 'All of the above'],
        correct: 2,
        explanation: 'The ductus arteriosus closure can cause temporary murmurs as it constricts. This is a normal finding in the first 48 hours of life.',
        shown: false
      }
    ]
  },
  {
    id: 'early-postpartum',
    title: 'Early Postpartum (2-24 Hours)',
    duration: '15:00',
    audioFile: '/audio/early-postpartum.mp3',
    content: {
      title: 'Early Postpartum Period (2-24 Hours)',
      sections: [
        {
          heading: 'Maternal System Changes',
          paragraphs: [
            'Uterine involution continues steadily, with the fundus descending approximately 1 cm daily.',
            'This period involves significant physiological adjustments as the body begins returning to pre-pregnant state.',
            'Multiple body systems undergo dramatic changes during this critical period.'
          ],
          table: {
            headers: ['System', 'Expected Changes', 'Clinical Significance', 'Nursing Interventions'],
            rows: [
              ['Cardiovascular', 'Diuresis begins (>3000mL/day), Diaphoresis, ↑ CO 60-80%', 'Risk for orthostatic hypotension', 'Assist first ambulation, Extra linens'],
              ['Hematologic', 'WBC up to 30,000/mm³, Clotting factors ↑', 'DVT risk elevated 20-80×', 'SCD/TED hose, Early ambulation q2h'],
              ['Renal', '↑ GFR 25% above normal, Bladder hypotonia', 'Risk for urinary retention', 'Void within 4-6hr, Measure first 3 voids'],
              ['GI', 'Delayed motility, ↓ Appetite initially', 'Risk for constipation', 'High fiber diet, Stool softener, Ambulation']
            ]
          }
        },
        {
          heading: 'Managing Afterpains',
          paragraphs: [
            'Afterpains increase in severity with multiparity and during breastfeeding.',
            'These contractions are protective, preventing postpartum hemorrhage.',
            'Management varies based on parity and breastfeeding status.'
          ],
          table: {
            headers: ['Severity Factor', 'Management Strategy', 'Patient Education'],
            rows: [
              ['First baby', 'PRN medication usually sufficient, Heat packs', '"Cramping means your uterus is contracting well"'],
              ['Multiple babies', 'Scheduled ibuprofen 600-800mg q6h, Narcotic backup', '"Afterpains prevent bleeding - they\'re protective"'],
              ['Breastfeeding', 'Medicate 30min before feeding, Breathing techniques', '"Oxytocin from feeding triggers contractions"'],
              ['Full bladder', 'Void q2-3h, Double void technique', '"Empty bladder allows uterus to contract"']
            ]
          }
        },
        {
          heading: 'Lactogenesis Stages',
          paragraphs: [
            'Breast milk production follows predictable stages after delivery.',
            'Understanding these stages helps nurses support successful breastfeeding.',
            'Each stage has unique characteristics and nursing considerations.'
          ],
          table: {
            headers: ['Stage', 'Timing', 'Characteristics', 'Nursing Support'],
            rows: [
              ['I - Colostrum', 'Pregnancy - Day 2-3', 'Small volume, thick, yellow, high antibodies', 'Reassure about volume, frequent feeding'],
              ['II - Transitional', 'Days 2-3 to 10-14', 'Volume ↑ rapidly, breast fullness', 'Manage engorgement, ensure good latch'],
              ['III - Mature', 'Day 10+', 'Supply regulated, foremilk/hindmilk', 'Assess transfer, problem-solve issues']
            ]
          }
        },
        {
          heading: 'Neonatal Behavioral States',
          paragraphs: [
            'Newborns cycle through predictable behavioral states.',
            'Recognizing these states helps optimize care timing and parent education.',
            'The quiet alert state is optimal for feeding and bonding activities.'
          ],
          table: {
            headers: ['State', 'Characteristics', 'Duration', 'Optimal Care Activities'],
            rows: [
              ['Deep Sleep', 'No eye movement, regular breathing', '10-20 min cycles', 'Minimal stimulation, cluster care'],
              ['Light Sleep', 'REM visible, irregular breathing', '10-45 min', 'Can attempt feeding, may wake easily'],
              ['Quiet Alert', 'Eyes wide open, minimal movement', '10-20 min', 'OPTIMAL for feeding, bonding, assessment'],
              ['Active Alert', 'Eyes open, much movement', 'Variable', 'Calming needed, may refuse breast'],
              ['Crying', 'Intense cry, difficult to console', 'Until needs met', 'Identify needs, skin-to-skin, swaddling']
            ]
          }
        }
      ]
    },
    interactiveElements: [
      {
        type: 'quiz',
        timestamp: 240,
        question: 'What is the expected diuresis amount in early postpartum?',
        options: ['>1000mL/day', '>2000mL/day', '>3000mL/day', '>4000mL/day'],
        correct: 2,
        explanation: 'Diuresis of greater than 3000mL per day is expected as the body eliminates excess fluid from pregnancy.',
        shown: false
      },
      {
        type: 'component',
        componentName: 'InvolutionSimulator',
        timestamp: 420,
        description: 'Visualize uterine involution process'
      },
      {
        type: 'quiz',
        timestamp: 480,
        question: 'Which behavioral state is optimal for newborn feeding?',
        options: ['Deep sleep', 'Light sleep', 'Quiet alert', 'Active alert'],
        correct: 2,
        explanation: 'The quiet alert state is optimal for feeding as the baby is awake, focused, and ready to latch.',
        shown: false
      },
      {
        type: 'component',
        componentName: 'LactationStagesExplorer',
        timestamp: 720,
        description: 'Explore breast milk composition changes'
      },
      {
        type: 'quiz',
        timestamp: 840,
        question: 'How long is the DVT risk elevated postpartum?',
        options: ['24 hours', '1 week', '4-6 weeks', '3 months'],
        correct: 2,
        explanation: 'DVT risk remains elevated for 4-6 weeks postpartum due to continued hypercoagulability.',
        shown: false
      }
    ]
  },
  {
    id: 'extended-postpartum',
    title: 'Extended Postpartum (24 Hours - 6 Weeks)',
    duration: '20:00',
    audioFile: '/audio/extended-postpartum.mp3',
    content: {
      title: 'Extended Postpartum Period',
      sections: [
        {
          heading: 'Physical Recovery Timeline',
          paragraphs: [
            'The extended postpartum period encompasses complete physical recovery.',
            'Most physiological changes resolve within 6 weeks, though some persist longer.',
            'Individual variation is normal and influenced by multiple factors.'
          ],
          table: {
            headers: ['Week', 'Expected Changes', 'Activity Guidelines', 'Warning Signs'],
            rows: [
              ['1', 'Lochia serosa, fundus palpable', 'Light activities, rest priority', 'Heavy bleeding, fever, foul odor'],
              ['2', 'Lochia alba begins, fundus not palpable', 'Gradual increase in activity', 'Persistent heavy flow, pain'],
              ['3-4', 'Minimal discharge, energy returning', 'Most daily activities OK', 'Return of heavy bleeding'],
              ['5-6', 'Near complete involution', 'Exercise as tolerated', 'Any unusual symptoms']
            ]
          }
        },
        {
          heading: 'Psychosocial Adaptations',
          paragraphs: [
            'Emotional adjustments are as significant as physical changes.',
            'Role transitions affect the entire family system.',
            'Early identification of mood disorders improves outcomes.'
          ]
        },
        {
          heading: 'Baby Blues vs Postpartum Depression',
          table: {
            headers: ['Characteristic', 'Baby Blues', 'Postpartum Depression', 'Action Needed'],
            rows: [
              ['Onset', 'Days 3-5', 'Any time in first year', 'Screen at all visits'],
              ['Duration', '<2 weeks', '>2 weeks', 'Refer if persistent'],
              ['Severity', 'Mild mood swings', 'Significant impairment', 'Mental health referral'],
              ['Treatment', 'Support, rest', 'Therapy, possible medication', 'Multidisciplinary approach']
            ]
          }
        },
        {
          heading: 'Edinburgh Postnatal Depression Scale',
          paragraphs: [
            'Validated screening tool for postpartum depression.',
            'Score ≥10 indicates possible depression, ≥13 indicates high risk.',
            'Should be administered at multiple timepoints during postpartum care.'
          ]
        },
        {
          heading: 'Contraception Planning',
          paragraphs: [
            'Family planning discussions should begin before discharge.',
            'Method selection depends on breastfeeding status and personal preferences.',
            'Many options are safe for immediate postpartum use.'
          ]
        },
        {
          heading: 'Infant Growth and Development',
          paragraphs: [
            'Normal newborn weight loss is up to 10% of birth weight.',
            'Birth weight should be regained by 10-14 days.',
            'Growth spurts occur around 7-10 days, 3 weeks, and 6 weeks.'
          ],
          table: {
            headers: ['Age', 'Expected Weight Gain', 'Feeding Pattern', 'Development'],
            rows: [
              ['Week 1', 'Loss then stabilization', '8-12 feeds/24hr', 'Sleep-wake cycles establishing'],
              ['Week 2-4', '20-30g/day', 'Cluster feeding common', 'Increased alertness'],
              ['Week 4-6', '150-200g/week', 'More predictable', 'Social smile emerges']
            ]
          }
        }
      ]
    },
    interactiveElements: [
      {
        type: 'quiz',
        timestamp: 300,
        question: 'When do non-lactating women typically see return of menses?',
        options: ['2-4 weeks', '6-10 weeks', '3-4 months', '6 months'],
        correct: 1,
        explanation: 'Non-lactating women typically see return of menses at 6-10 weeks postpartum.',
        shown: false
      },
      {
        type: 'component',
        componentName: 'MaternalAdaptationQuiz',
        timestamp: 600,
        description: 'Test your knowledge of maternal adaptations'
      },
      {
        type: 'quiz',
        timestamp: 900,
        question: 'What Edinburgh score indicates high risk for postpartum depression?',
        options: ['≥5', '≥10', '≥13', '≥20'],
        correct: 2,
        explanation: 'An Edinburgh score of 13 or higher indicates high risk requiring mental health referral.',
        shown: false
      },
      {
        type: 'component',
        componentName: 'ContraceptionSelector',
        timestamp: 1080,
        description: 'Find personalized contraception recommendations'
      },
      {
        type: 'component',
        componentName: 'MethodEffectivenessChart',
        timestamp: 1140,
        description: 'Compare contraceptive method effectiveness'
      },
      {
        type: 'quiz',
        timestamp: 1200,
        question: 'When should an infant regain birth weight?',
        options: ['3-5 days', '7 days', '10-14 days', '3 weeks'],
        correct: 2,
        explanation: 'Infants should regain their birth weight by 10-14 days of age.',
        shown: false
      }
    ]
  },
  {
    id: 'breastfeeding-support',
    title: 'Breastfeeding Support',
    duration: '18:00',
    audioFile: '/audio/breastfeeding-support.mp3',
    content: {
      title: 'Comprehensive Breastfeeding Support',
      sections: [
        {
          heading: 'Benefits of Breastfeeding',
          paragraphs: [
            'Breastfeeding provides optimal nutrition and numerous health benefits.',
            'Both immediate and long-term advantages exist for mother and baby.',
            'Support and education significantly impact breastfeeding success.'
          ]
        },
        {
          heading: 'Positioning and Latch',
          paragraphs: [
            'Proper positioning prevents many breastfeeding problems.',
            'Multiple positions accommodate different situations and preferences.',
            'Signs of effective latch include comfortable feeding and adequate transfer.'
          ],
          table: {
            headers: ['Position', 'Best For', 'Key Points', 'Common Mistakes'],
            rows: [
              ['Cradle', 'Term infants, experienced mothers', 'Baby\'s head in elbow crease', 'Baby too far from breast'],
              ['Cross-cradle', 'Newborns, latch difficulties', 'Better head control', 'Inadequate support'],
              ['Football', 'C-sections, twins, large breasts', 'Good visualization', 'Baby sliding down'],
              ['Side-lying', 'Night feeds, rest needed', 'Align baby with breast', 'Baby rolling away']
            ]
          }
        },
        {
          heading: 'Common Breastfeeding Challenges',
          paragraphs: [
            'Most breastfeeding problems have solutions with proper support.',
            'Early intervention prevents complications and preserves breastfeeding.',
            'Lactation consultant referral may be beneficial for persistent issues.'
          ]
        },
        {
          heading: 'Signs of Adequate Intake',
          table: {
            headers: ['Age', 'Wet Diapers', 'Stools', 'Weight', 'Behavior'],
            rows: [
              ['Day 1-2', '1-2/day', '1-2 meconium', 'Loss <7%', 'Sleepy but rousable'],
              ['Day 3-4', '3-4/day', '3+ transitional', 'Loss stabilizes', 'More alert periods'],
              ['Day 5+', '6+/day', '3+ yellow, seedy', 'Gaining', 'Satisfied after feeds'],
              ['Week 2+', '6+/day', 'Variable (1-10/day)', '20-30g/day gain', 'Alert, content periods']
            ]
          }
        }
      ]
    },
    interactiveElements: [
      {
        type: 'component',
        componentName: 'FeedingMethodComparison',
        timestamp: 180,
        description: 'Compare feeding methods comprehensively'
      },
      {
        type: 'quiz',
        timestamp: 360,
        question: 'How many wet diapers indicate adequate intake after day 5?',
        options: ['2-3/day', '4-5/day', '6+/day', '10+/day'],
        correct: 2,
        explanation: 'Six or more wet diapers per day after day 5 indicates adequate fluid intake.',
        shown: false
      },
      {
        type: 'component',
        componentName: 'BreastfeedingTroubleshooter',
        timestamp: 720,
        description: 'Troubleshoot common breastfeeding problems'
      },
      {
        type: 'quiz',
        timestamp: 900,
        question: 'Which position provides the best visualization for latch?',
        options: ['Cradle', 'Cross-cradle', 'Football', 'Side-lying'],
        correct: 2,
        explanation: 'The football hold provides the best visualization of the latch, making it easier to ensure proper attachment.',
        shown: false
      }
    ]
  },
  {
    id: 'newborn-assessment',
    title: 'Comprehensive Newborn Assessment',
    duration: '15:00',
    audioFile: '/audio/newborn-assessment.mp3',
    content: {
      title: 'Comprehensive Newborn Assessment',
      sections: [
        {
          heading: 'Systematic Physical Assessment',
          paragraphs: [
            'A thorough newborn assessment identifies variations and abnormalities.',
            'Assessment should proceed systematically from head to toe.',
            'Documentation of findings establishes baseline for ongoing care.'
          ]
        },
        {
          heading: 'Head-to-Toe Assessment',
          table: {
            headers: ['System', 'Normal Findings', 'Variations', 'Abnormal Findings'],
            rows: [
              ['Head', 'Molding, fontanels soft/flat', 'Caput, cephalohematoma', 'Bulging fontanel, microcephaly'],
              ['Eyes', 'Clear, tracks to midline', 'Subconjunctival hemorrhage', 'Cataracts, persistent discharge'],
              ['Cardiac', 'HR 120-160, regular', 'Transient murmur', 'Persistent murmur, cyanosis'],
              ['Abdomen', 'Soft, bowel sounds present', 'Umbilical hernia', 'Distention, absent bowel sounds'],
              ['Genitalia', 'Appropriate for sex/GA', 'Pseudomenstruation', 'Ambiguous genitalia'],
              ['Extremities', 'Full ROM, equal pulses', 'Positional deformities', 'Hip clicks, absent pulses']
            ]
          }
        },
        {
          heading: 'Gestational Age Assessment',
          paragraphs: [
            'The Ballard score combines physical and neuromuscular maturity.',
            'Accurate gestational age assessment guides care decisions.',
            'Assessment is most accurate within 12-24 hours after birth.'
          ]
        },
        {
          heading: 'Newborn Screening',
          paragraphs: [
            'Metabolic screening identifies treatable conditions.',
            'Hearing screening detects early hearing loss.',
            'Critical congenital heart disease screening uses pulse oximetry.'
          ],
          table: {
            headers: ['Screening Type', 'Timing', 'Method', 'Follow-up'],
            rows: [
              ['Metabolic', '24-48 hours', 'Heel stick blood sample', 'Results in 1-2 weeks'],
              ['Hearing', 'Before discharge', 'OAE or ABR', 'Refer if fail 2x'],
              ['CCHD', '24-48 hours', 'Pulse ox right hand & foot', 'Echo if fail'],
              ['Bilirubin', 'Before discharge', 'Transcutaneous or serum', 'Plot on nomogram']
            ]
          }
        }
      ]
    },
    interactiveElements: [
      {
        type: 'component',
        componentName: 'BallardScoreAssessment',
        timestamp: 300,
        description: 'Practice gestational age assessment'
      },
      {
        type: 'component',
        componentName: 'NewbornCareProtocols',
        timestamp: 600,
        description: 'Review evidence-based care protocols'
      },
      {
        type: 'quiz',
        timestamp: 720,
        question: 'When is metabolic screening most accurate?',
        options: ['0-12 hours', '12-24 hours', '24-48 hours', '>72 hours'],
        correct: 2,
        explanation: 'Metabolic screening is most accurate when performed between 24-48 hours of age.',
        shown: false
      },
      {
        type: 'component',
        componentName: 'FetalCirculationDiagram',
        timestamp: 840,
        description: 'Review fetal circulation pathways'
      }
    ]
  }
];

// Main App Component
const PostpartumLearningModule = () => {
  const [lessons] = useState(completePostpartumLessons);
  const [currentLesson, setCurrentLesson] = useState(completePostpartumLessons[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useLocalStorage('postpartum-progress', {});
  const [bookmarks, setBookmarks] = useLocalStorage('postpartum-bookmarks', []);
  const [quizScores, setQuizScores] = useLocalStorage('postpartum-quiz-scores', {});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage('postpartum-dark-mode', false);
  const [showDashboard, setShowDashboard] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalLessons = lessons.length;
    const completedLessons = Object.values(progress).filter(p => p.completed).length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  // Sidebar Component
  const Sidebar = () => (
    <div className={`bg-gray-50 h-full p-4 overflow-y-auto transition-all duration-300 ${
      sidebarOpen ? 'w-64' : 'w-0'
    } ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-indigo-600">Lessons</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-2">
        {lessons.map((lesson) => {
          const isCompleted = progress[lesson.id]?.completed;
          const isActive = currentLesson.id === lesson.id;
          
          return (
            <button
              key={lesson.id}
              onClick={() => setCurrentLesson(lesson)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-indigo-600 text-white' 
                  : 'hover:bg-gray-200 text-gray-700'
              } ${darkMode && !isActive ? 'hover:bg-gray-800 text-gray-300' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {isCompleted ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      isActive ? 'border-white' : 'border-gray-400'
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{lesson.title}</div>
                  <div className={`text-sm ${isActive ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {lesson.duration}
                  </div>
                </div>
              </div>
              {progress[lesson.id]?.percentage > 0 && (
                <div className="mt-2 ml-7">
                  <div className="w-full bg-gray-300 rounded-full h-1">
                    <div
                      className="bg-green-500 h-1 rounded-full"
                      style={{ width: `${progress[lesson.id].percentage}%` }}
                    />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
        <div className="text-sm text-indigo-700 font-medium">Overall Progress</div>
        <div className="text-2xl font-bold text-indigo-600">{calculateOverallProgress()}%</div>
        <div className="mt-2 w-full bg-indigo-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: `${calculateOverallProgress()}%` }}
          />
        </div>
      </div>
    </div>
  );

  // Audio Player Component
  const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div className={`fixed bottom-0 left-0 right-0 p-4 shadow-lg ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <SkipBack size={20} />
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <SkipForward size={20} />
            </button>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{formatTime(currentTime)}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{currentLesson.duration}</span>
              </div>
            </div>
            
            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(Number(e.target.value))}
              className="text-sm border rounded px-2 py-1"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
            
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Volume2 size={20} />
            </button>
            
            <button
              onClick={() => {
                const newBookmark = {
                  lessonId: currentLesson.id,
                  timestamp: currentTime,
                  note: '',
                  created: new Date().toISOString()
                };
                setBookmarks([...bookmarks, newBookmark]);
              }}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <Bookmark size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Content Viewer Component
  const ContentViewer = () => {
    const renderInteractiveElement = (element, index) => {
      if (element.type === 'quiz' && currentTime >= element.timestamp && !element.shown) {
        return (
          <div key={index} className="my-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Quick Check</h3>
            <p className="mb-4">{element.question}</p>
            <div className="space-y-2">
              {element.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  className="w-full text-left p-3 bg-white rounded border hover:bg-blue-100"
                  onClick={() => {
                    const isCorrect = optIndex === element.correct;
                    alert(isCorrect ? 'Correct! ' + element.explanation : 'Try again!');
                    element.shown = true;
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      } else if (element.type === 'component' && currentTime >= element.timestamp) {
        return (
          <div key={index} className="my-8">
            <div className="mb-4 p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <p className="text-sm text-indigo-700 font-medium">
                Interactive Element: {element.description}
              </p>
            </div>
            <ComponentLoader componentName={element.componentName} />
          </div>
        );
      }
      return null;
    };

    return (
      <div className={`flex-1 p-6 overflow-y-auto ${darkMode ? 'bg-gray-800 text-white' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-indigo-600 mb-6">
            {currentLesson.content.title}
          </h1>
          
          {currentLesson.content.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
              
              {section.paragraphs && section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              
              {section.table && (
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        {section.table.headers.map((header, hIndex) => (
                          <th key={hIndex} className="border border-gray-300 px-4 py-2 text-left">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIndex) => (
                        <tr key={rIndex} className={rIndex % 2 === 0 ? 'bg-gray-50' : ''}>
                          {row.map((cell, cIndex) => (
                            <td key={cIndex} className="border border-gray-300 px-4 py-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
          
          {currentLesson.interactiveElements && 
            currentLesson.interactiveElements.map((element, index) => 
              renderInteractiveElement(element, index)
            )
          }
        </div>
      </div>
    );
  };

  // Help Modal
  const HelpModal = () => {
    if (!showHelp) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">How to Use This Module</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Navigation</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use the sidebar to navigate between lessons</li>
                <li>Your progress is automatically saved</li>
                <li>Green checkmarks indicate completed lessons</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Audio Controls</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Play/pause audio with the center button</li>
                <li>Adjust playback speed from 0.5x to 2x</li>
                <li>Create bookmarks at important moments</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Interactive Elements</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Quizzes appear automatically during playback</li>
                <li>Interactive tools help practice clinical skills</li>
                <li>All components are mobile-friendly</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Keyboard Shortcuts</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><kbd>Space</kbd> - Play/pause</li>
                <li><kbd>←/→</kbd> - Skip back/forward 10 seconds</li>
                <li><kbd>↑/↓</kbd> - Increase/decrease volume</li>
                <li><kbd>B</kbd> - Create bookmark</li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={() => setShowHelp(false)}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Got it!
          </button>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      {!isMobile && <Sidebar />}
      
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64">
            <Sidebar />
          </div>
        </div>
      )}
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`p-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Menu size={24} />
                </button>
              )}
              <h1 className="text-xl font-bold text-indigo-600">
                Postpartum Process Learning Module
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowDashboard(!showDashboard)}
                className="p-2 text-gray-600 hover:text-gray-800"
                title="Dashboard"
              >
                <BarChart size={20} />
              </button>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-600 hover:text-gray-800"
                title="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={() => setShowHelp(true)}
                className="p-2 text-gray-600 hover:text-gray-800"
                title="Help"
              >
                <HelpCircle size={20} />
              </button>
            </div>
          </div>
        </header>
        
        {/* Content viewer */}
        <ContentViewer />
        
        {/* Audio player */}
        <AudioPlayer />
      </div>
      
      {/* Help modal */}
      <HelpModal />
    </div>
  );
};

export default PostpartumLearningModule;