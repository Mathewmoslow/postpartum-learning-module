#!/bin/bash

# Script to fix PostpartumLearningModule.jsx with minimal changes

echo "🔧 Applying fixes to PostpartumLearningModule.jsx..."

# 1. Replace BookmarkCheck with CheckSquare
sed -i 's/BookmarkCheck/CheckSquare/g' src/PostpartumLearningModule.jsx

# 2. Fix audio file paths
sed -i "s|audioFile: '/audio/|audioFile: \`\${process.env.PUBLIC_URL}/audio/|g" src/PostpartumLearningModule.jsx
sed -i "s|audioFile: \"/audio/|audioFile: \`\${process.env.PUBLIC_URL}/audio/|g" src/PostpartumLearningModule.jsx
sed -i "s|\.mp3'|.mp3\`|g" src/PostpartumLearningModule.jsx
sed -i "s|\.mp3\"|.mp3\`|g" src/PostpartumLearningModule.jsx

# 3. Add component imports after existing imports (line 2)
sed -i '2a\\n// Interactive Component Imports\nimport PostpartumAssessment from '\''./components/PostpartumAssessment'\'';\nimport SimpleFetalCirculation from '\''./components/SimpleFetalCirculation'\'';\nimport NewbornTransitionSimulator from '\''./components/NewbornTransitionSimulator'\'';\nimport APGARCalculator from '\''./components/APGARCalculator'\'';\nimport InvolutionSimulator from '\''./components/InvolutionSimulator'\'';\nimport LactationStagesExplorer from '\''./components/LactationStagesExplorer'\'';\nimport BreastfeedingTroubleshooter from '\''./components/BreastfeedingTroubleshooter'\'';\nimport MaternalAdaptationQuiz from '\''./components/MaternalAdaptationQuiz'\'';\nimport PainManagementCalculator from '\''./components/PainManagementCalculator'\'';\nimport FeedingProgressTracker from '\''./components/FeedingProgressTracker'\'';\nimport MethodEffectivenessChart from '\''./components/MethodEffectivenessChart'\'';\nimport ContraceptionSelector from '\''./components/ContraceptionSelector'\'';\nimport BallardScoreAssessment from '\''./components/BallardScoreAssessment'\'';\nimport FetalCirculationDiagram from '\''./components/FetalCirculationDiagram'\'';\nimport NewbornCareProtocols from '\''./components/NewbornCareProtocols'\'';' src/PostpartumLearningModule.jsx

# 4. Add InteractiveComponentWrapper before ContentViewer component
sed -i '/const ContentViewer = /i\\n// Interactive Component Wrapper\nconst InteractiveComponentWrapper = ({ component, isActive }) => {\n  if (!isActive) return null;\n  \n  return (\n    <div className="my-8 p-6 bg-blue-50 rounded-lg shadow-lg animate-fadeIn">\n      <div className="mb-4 flex items-center gap-2 text-blue-700">\n        <Calculator className="w-5 h-5" />\n        <span className="font-semibold">Interactive Component</span>\n      </div>\n      {component}\n    </div>\n  );\n};' src/PostpartumLearningModule.jsx

# 5. Add activeComponents state to ContentViewer (after existing useState)
sed -i '/const \[.*useState.*\];/a\  const [activeComponents, setActiveComponents] = useState([]);' src/PostpartumLearningModule.jsx

# 6. Add useEffect for component timing (after existing useEffects)
sed -i '/}, \[.*currentTime.*lesson.*\]);/a\\n  // Handle component timing\n  useEffect(() => {\n    if (!lesson.components) return;\n    \n    const active = lesson.components.filter(comp => {\n      const endTime = comp.timestamp + (comp.duration || 300);\n      return currentTime >= comp.timestamp && currentTime <= endTime;\n    });\n    \n    setActiveComponents(active);\n  }, [currentTime, lesson]);' src/PostpartumLearningModule.jsx

# 7. Add component rendering in ContentViewer (before closing div)
sed -i '/return (/,/^  );$/{
    /^  );$/{
        i\
        {/* Render active components */}\
        {activeComponents.map((comp, index) => (\
          <InteractiveComponentWrapper\
            key={`${comp.timestamp}-${index}`}\
            component={comp.component}\
            isActive={true}\
          />\
        ))}
    }
}' src/PostpartumLearningModule.jsx

# 8. Add CSS animation to index.css
cat >> src/index.css << 'EOF'

/* Component fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
EOF

echo "✅ Applied all fixes!"
echo ""
echo "📋 Next steps:"
echo "1. Add components arrays to your lessons where needed"
echo "2. Example component in lesson:"
echo "   components: ["
echo "     {"
echo "       timestamp: 180,"
echo "       component: <PostpartumAssessment />,"
echo "       duration: 600"
echo "     }"
echo "   ]"
echo "3. Test: npm start"