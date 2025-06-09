#!/bin/bash

# Script to create the 4 missing component files
# Run from your project root: bash create-missing-components.sh

echo "🔧 Creating missing component files..."

# Create BreastfeedingPositionGuide.jsx
cat > src/components/BreastfeedingPositionGuide.jsx << 'EOF'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Baby, Heart, AlertCircle, CheckCircle } from 'lucide-react';

const BreastfeedingPositionGuide = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  
  const positions = [
    {
      name: "Cradle Hold",
      description: "The most common position where baby's head rests in the crook of your elbow",
      steps: [
        "Sit comfortably with back support",
        "Hold baby's head in crook of your elbow",
        "Baby's body faces yours, tummy to tummy",
        "Support baby's back with your forearm"
      ],
      benefits: ["Natural and intuitive", "Good for full-term babies", "Allows eye contact"],
      challenges: ["May be difficult after C-section", "Less head control for newborns"]
    },
    {
      name: "Cross-Cradle Hold",
      description: "Similar to cradle but offers more control of baby's head",
      steps: [
        "Hold baby with opposite arm from breast",
        "Support baby's head with your hand",
        "Guide baby to breast with more control",
        "Switch arms once latched if desired"
      ],
      benefits: ["Better control for latching", "Good for premature babies", "Helpful for learning"],
      challenges: ["Can tire your arms", "May need pillow support"]
    },
    {
      name: "Football Hold",
      description: "Baby is tucked under your arm like a football",
      steps: [
        "Tuck baby under your arm on same side",
        "Support head with your hand",
        "Baby's body extends along your forearm",
        "Feet point toward your back"
      ],
      benefits: ["Good after C-section", "Works for large breasts", "Good view of latch"],
      challenges: ["Requires chair with arms", "May feel awkward initially"]
    },
    {
      name: "Side-Lying Position",
      description: "Both mother and baby lie on their sides facing each other",
      steps: [
        "Lie on your side with pillows for support",
        "Baby lies facing you",
        "Align baby's nose with your nipple",
        "Support baby's back with your arm"
      ],
      benefits: ["Restful for night feeds", "Comfortable after C-section", "Reduces back strain"],
      challenges: ["Risk of falling asleep", "Harder to see latch"]
    },
    {
      name: "Laid-Back Position",
      description: "Semi-reclined position using gravity to help baby latch",
      steps: [
        "Recline comfortably at 45-degree angle",
        "Place baby tummy-down on your chest",
        "Let baby find breast naturally",
        "Support baby's body as needed"
      ],
      benefits: ["Triggers baby's reflexes", "Very relaxing", "Hands-free option"],
      challenges: ["May need practice", "Not discrete for public"]
    }
  ];

  const currentPos = positions[currentPosition];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Breastfeeding Position Guide</h2>
        <p className="text-gray-600">Master different positions for comfortable and effective breastfeeding</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentPosition(Math.max(0, currentPosition - 1))}
            disabled={currentPosition === 0}
            className="p-2 rounded-full bg-blue-100 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h3 className="text-xl font-semibold text-gray-800">{currentPos.name}</h3>
          
          <button
            onClick={() => setCurrentPosition(Math.min(positions.length - 1, currentPosition + 1))}
            disabled={currentPosition === positions.length - 1}
            className="p-2 rounded-full bg-blue-100 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center mb-4">
          {positions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPosition(index)}
              className={`w-2 h-2 mx-1 rounded-full transition-colors ${
                index === currentPosition ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-700 italic">{currentPos.description}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Baby className="w-5 h-5 text-blue-600" />
            Step-by-Step Instructions
          </h4>
          <ol className="space-y-2">
            {currentPos.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Benefits
            </h4>
            <ul className="space-y-1">
              {currentPos.benefits.map((benefit, index) => (
                <li key={index} className="text-green-700 flex items-start gap-2">
                  <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Considerations
            </h4>
            <ul className="space-y-1">
              {currentPos.challenges.map((challenge, index) => (
                <li key={index} className="text-yellow-700 flex items-start gap-2">
                  <span className="w-1 h-1 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-purple-800 text-sm">
            <strong>Remember:</strong> The best position is the one that works for you and your baby. 
            It may take practice to find what's most comfortable. Don't hesitate to ask for help from 
            a lactation consultant if needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreastfeedingPositionGuide;
EOF

echo "✅ Created BreastfeedingPositionGuide.jsx"

# Create PainManagementCalculator.jsx
cat > src/components/PainManagementCalculator.jsx << 'EOF'
import React, { useState } from 'react';
import { Calculator, AlertCircle, Info, Pill, Clock, Weight } from 'lucide-react';

const PainManagementCalculator = () => {
  const [patientWeight, setPatientWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [selectedMedication, setSelectedMedication] = useState('acetaminophen');
  const [painScore, setPainScore] = useState(5);

  const medications = {
    acetaminophen: {
      name: 'Acetaminophen',
      dosage: { min: 10, max: 15, unit: 'mg/kg' },
      frequency: 'every 4-6 hours',
      maxDaily: { amount: 4000, unit: 'mg' },
      notes: 'Safe for breastfeeding',
      contraindications: ['Liver disease', 'Chronic alcohol use']
    },
    ibuprofen: {
      name: 'Ibuprofen',
      dosage: { min: 400, max: 800, unit: 'mg' },
      frequency: 'every 6-8 hours',
      maxDaily: { amount: 3200, unit: 'mg' },
      notes: 'Take with food. Safe for breastfeeding',
      contraindications: ['Peptic ulcer', 'Renal disease', 'Bleeding disorders']
    },
    oxycodone: {
      name: 'Oxycodone',
      dosage: { min: 5, max: 10, unit: 'mg' },
      frequency: 'every 4-6 hours',
      maxDaily: { amount: 40, unit: 'mg' },
      notes: 'Monitor infant for sedation if breastfeeding',
      contraindications: ['Respiratory depression', 'Paralytic ileus']
    },
    ketorolac: {
      name: 'Ketorolac',
      dosage: { min: 10, max: 30, unit: 'mg' },
      frequency: 'every 6 hours',
      maxDaily: { amount: 120, unit: 'mg' },
      notes: 'Maximum 5 days use',
      contraindications: ['Bleeding risk', 'Renal impairment', 'Peptic ulcer']
    }
  };

  const calculateDose = () => {
    if (!patientWeight) return null;
    
    const weightInKg = weightUnit === 'lbs' ? patientWeight * 0.453592 : parseFloat(patientWeight);
    const med = medications[selectedMedication];
    
    if (selectedMedication === 'acetaminophen') {
      const minDose = weightInKg * med.dosage.min;
      const maxDose = weightInKg * med.dosage.max;
      const maxSingleDose = 1000; // Maximum single dose
      
      return {
        min: Math.min(minDose, maxSingleDose),
        max: Math.min(maxDose, maxSingleDose),
        unit: 'mg'
      };
    }
    
    return {
      min: med.dosage.min,
      max: med.dosage.max,
      unit: med.dosage.unit
    };
  };

  const dose = calculateDose();
  const currentMed = medications[selectedMedication];

  const getPainManagementRecommendation = () => {
    if (painScore <= 3) return "Consider non-pharmacological methods first";
    if (painScore <= 6) return "Moderate pain - consider scheduled dosing";
    return "Severe pain - multimodal approach recommended";
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          Pain Management Calculator
        </h2>
        <p className="text-gray-600">Calculate safe medication dosages for postpartum pain management</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Weight
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={patientWeight}
                onChange={(e) => setPatientWeight(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter weight"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pain Score (0-10)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="10"
                value={painScore}
                onChange={(e) => setPainScore(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="w-12 text-center font-semibold text-lg">{painScore}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{getPainManagementRecommendation()}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medication
            </label>
            <select
              value={selectedMedication}
              onChange={(e) => setSelectedMedication(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(medications).map(([key, med]) => (
                <option key={key} value={key}>{med.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {dose && patientWeight && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Pill className="w-5 h-5" />
                Dosage Calculation
              </h3>
              <div className="space-y-2 text-blue-700">
                <p>
                  <strong>Dose Range:</strong> {dose.min.toFixed(0)} - {dose.max.toFixed(0)} {dose.unit}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <strong>Frequency:</strong> {currentMed.frequency}
                </p>
                <p>
                  <strong>Maximum Daily:</strong> {currentMed.maxDaily.amount} {currentMed.maxDaily.unit}
                </p>
              </div>
            </div>
          )}

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Clinical Notes
            </h3>
            <p className="text-green-700 text-sm">{currentMed.notes}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Contraindications
            </h3>
            <ul className="space-y-1">
              {currentMed.contraindications.map((item, index) => (
                <li key={index} className="text-yellow-700 text-sm flex items-start gap-2">
                  <span className="w-1 h-1 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Multimodal Approach</h3>
            <ul className="space-y-1 text-purple-700 text-sm">
              <li>• Combine with non-pharmacological methods</li>
              <li>• Ice packs for perineal pain</li>
              <li>• Sitz baths for comfort</li>
              <li>• Position changes and ambulation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            This calculator provides general guidance only. Always verify dosages with current 
            guidelines and consider individual patient factors. Consult pharmacy for specific 
            formulations and dosing recommendations.
          </span>
        </p>
      </div>
    </div>
  );
};

export default PainManagementCalculator;
EOF

echo "✅ Created PainManagementCalculator.jsx"

# Create NewbornAssessmentChecklist.jsx
cat > src/components/NewbornAssessmentChecklist.jsx << 'EOF'
import React, { useState } from 'react';
import { CheckSquare, Square, AlertCircle, Baby, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const NewbornAssessmentChecklist = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedAge, setSelectedAge] = useState('immediate');

  const assessmentCategories = {
    immediate: {
      title: "Immediate Assessment (0-1 hour)",
      sections: {
        vital_signs: {
          title: "Vital Signs",
          items: [
            { id: "temp", text: "Temperature: 97.7-99.5°F (36.5-37.5°C)", critical: true },
            { id: "hr", text: "Heart rate: 110-160 bpm", critical: true },
            { id: "rr", text: "Respiratory rate: 30-60/min", critical: true },
            { id: "color", text: "Pink trunk, may have acrocyanosis", critical: false },
