// fix-postpartum-module.js
// Run this with: node fix-postpartum-module.js

const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'PostpartumLearningModule.jsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix the BookmarkCheck import
content = content.replace(
  "BookmarkCheck, Search",
  "CheckSquare, Search"
);

// 2. Fix all BookmarkCheck usages
content = content.replace(/BookmarkCheck/g, 'CheckSquare');

// 3. Add component imports after the lucide-react import
const componentImports = `
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
`;

// Find the lucide-react import and add component imports after it
const lucideImportRegex = /from 'lucide-react';/;
content = content.replace(lucideImportRegex, `from 'lucide-react';${componentImports}`);

// 4. Fix audio file paths
// Replace all audioFile paths to use PUBLIC_URL
content = content.replace(
  /audioFile: '\/audio\/([\w-]+\.mp3)'/g,
  "audioFile: `${process.env.PUBLIC_URL}/audio/$1`"
);

// Write the fixed content back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Fixed PostpartumLearningModule.jsx successfully!');
console.log('\nChanges made:');
console.log('  - Replaced BookmarkCheck with CheckSquare');
console.log('  - Added all 14 component imports');
console.log('  - Updated audio file paths to use PUBLIC_URL');
console.log('\nNow you need to:');
console.log('  1. Add components arrays to your lessons where you want them to appear');
console.log('  2. Add the component rendering logic to ContentViewer');
console.log('\nRestart your development server to see the changes.');
