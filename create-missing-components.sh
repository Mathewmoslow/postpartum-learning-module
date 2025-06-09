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
            { id: "cry", text: "Strong, lusty cry", critical: false }
          ]
        },
        airway: {
          title: "Airway & Breathing",
          items: [
            { id: "airway_clear", text: "Airway clear, no excessive secretions", critical: true },
            { id: "breath_sounds", text: "Bilateral breath sounds equal", critical: true },
            { id: "no_distress", text: "No respiratory distress (grunting, flaring, retracting)", critical: true },
            { id: "o2_sat", text: "O2 saturation >90% by 10 minutes", critical: true }
          ]
        },
        circulation: {
          title: "Circulation",
          items: [
            { id: "cap_refill", text: "Capillary refill <3 seconds", critical: false },
            { id: "pulses", text: "Strong peripheral pulses", critical: false },
            { id: "cord", text: "Umbilical cord: 2 arteries, 1 vein", critical: false }
          ]
        },
        neuro: {
          title: "Neurological",
          items: [
            { id: "tone", text: "Good muscle tone", critical: true },
            { id: "reflexes", text: "Primitive reflexes present (Moro, grasp)", critical: false },
            { id: "alert", text: "Alert periods, responds to stimuli", critical: false }
          ]
        }
      }
    },
    comprehensive: {
      title: "Comprehensive Assessment (2-24 hours)",
      sections: {
        head: {
          title: "Head & Neck",
          items: [
            { id: "fontanels", text: "Fontanels soft and flat", critical: false },
            { id: "sutures", text: "Sutures approximated, may overlap", critical: false },
            { id: "scalp", text: "No cephalohematoma or caput", critical: false },
            { id: "eyes", text: "Eyes clear, red reflex present", critical: true },
            { id: "ears", text: "Ears well-formed, appropriate position", critical: false },
            { id: "nose", text: "Nares patent bilaterally", critical: true },
            { id: "mouth", text: "Palate intact, strong suck", critical: true },
            { id: "neck", text: "Full ROM, no masses", critical: false }
          ]
        },
        cardio: {
          title: "Cardiovascular",
          items: [
            { id: "heart_sounds", text: "Regular rate and rhythm, no murmur", critical: true },
            { id: "femoral", text: "Femoral pulses present and equal", critical: true },
            { id: "perfusion", text: "Good peripheral perfusion", critical: false }
          ]
        },
        respiratory: {
          title: "Respiratory",
          items: [
            { id: "chest_shape", text: "Chest symmetric, no retractions", critical: true },
            { id: "breath_clear", text: "Breath sounds clear throughout", critical: true },
            { id: "effort", text: "Respiratory effort unlabored", critical: true }
          ]
        },
        abdomen: {
          title: "Abdomen",
          items: [
            { id: "soft", text: "Soft, non-distended", critical: true },
            { id: "cord_intact", text: "Umbilical cord clamped, no bleeding", critical: true },
            { id: "liver", text: "Liver 1-2 cm below costal margin", critical: false },
            { id: "bowel", text: "Bowel sounds present", critical: false }
          ]
        },
        genitourinary: {
          title: "Genitourinary",
          items: [
            { id: "urine", text: "Voided within 24 hours", critical: true },
            { id: "male_testes", text: "Male: Testes descended bilaterally", critical: false },
            { id: "female_labia", text: "Female: Labia majora cover minora", critical: false },
            { id: "anus", text: "Anus patent, meconium passed", critical: true }
          ]
        },
        musculoskeletal: {
          title: "Musculoskeletal",
          items: [
            { id: "spine", text: "Spine straight, no dimples or tufts", critical: true },
            { id: "hips", text: "Hips: negative Ortolani/Barlow", critical: true },
            { id: "extremities", text: "All extremities move symmetrically", critical: true },
            { id: "digits", text: "10 fingers, 10 toes, no webbing", critical: false },
            { id: "clavicles", text: "Clavicles intact", critical: false }
          ]
        },
        skin: {
          title: "Skin",
          items: [
            { id: "color_pink", text: "Pink, well-perfused", critical: true },
            { id: "no_rash", text: "No significant rashes or lesions", critical: false },
            { id: "turgor", text: "Good skin turgor", critical: false },
            { id: "birthmarks", text: "Document any birthmarks", critical: false }
          ]
        }
      }
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getCompletionStats = () => {
    const currentAssessment = assessmentCategories[selectedAge];
    let totalItems = 0;
    let checkedCount = 0;
    let criticalMissing = [];

    Object.entries(currentAssessment.sections).forEach(([sectionKey, section]) => {
      section.items.forEach(item => {
        totalItems++;
        if (checkedItems[item.id]) {
          checkedCount++;
        } else if (item.critical) {
          criticalMissing.push(item.text);
        }
      });
    });

    return {
      percentage: totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0,
      checked: checkedCount,
      total: totalItems,
      criticalMissing
    };
  };

  const stats = getCompletionStats();
  const currentAssessment = assessmentCategories[selectedAge];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Baby className="w-6 h-6 text-blue-600" />
          Newborn Assessment Checklist
        </h2>
        <p className="text-gray-600">Comprehensive evaluation guide for newborn assessment</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assessment Type
        </label>
        <select
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="immediate">Immediate (0-1 hour)</option>
          <option value="comprehensive">Comprehensive (2-24 hours)</option>
        </select>
      </div>

      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-blue-800">Progress</h3>
          <span className="text-2xl font-bold text-blue-600">{stats.percentage}%</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-3 mb-2">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
        <p className="text-sm text-blue-700">
          {stats.checked} of {stats.total} items completed
        </p>
      </div>

      {stats.criticalMissing.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Critical Items Missing
          </h4>
          <ul className="space-y-1">
            {stats.criticalMissing.map((item, index) => (
              <li key={index} className="text-red-700 text-sm">• {item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {Object.entries(currentAssessment.sections).map(([sectionKey, section]) => (
          <div key={sectionKey} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(sectionKey)}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
            >
              <h3 className="font-semibold text-gray-800">{section.title}</h3>
              {expandedSections[sectionKey] ? 
                <ChevronUp className="w-5 h-5 text-gray-600" /> : 
                <ChevronDown className="w-5 h-5 text-gray-600" />
              }
            </button>
            
            {expandedSections[sectionKey] && (
              <div className="p-4 space-y-2">
                {section.items.map(item => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="mt-0.5"
                    >
                      {checkedItems[item.id] ? 
                        <CheckSquare className="w-5 h-5 text-green-600" /> : 
                        <Square className="w-5 h-5 text-gray-400" />
                      }
                    </button>
                    <span className={`flex-1 ${checkedItems[item.id] ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                      {item.text}
                      {item.critical && (
                        <span className="ml-2 text-xs text-red-600 font-semibold">CRITICAL</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
        <button 
          onClick={() => setCheckedItems({})}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> This checklist serves as a guide. Always perform assessments 
          according to institutional protocols and document findings thoroughly in the medical record.
        </p>
      </div>
    </div>
  );
};

export default NewbornAssessmentChecklist;
EOF

echo "✅ Created NewbornAssessmentChecklist.jsx"

# Create ContraceptionEffectivenessChart.jsx
cat > src/components/ContraceptionEffectivenessChart.jsx << 'EOF'
import React, { useState } from 'react';
import { BarChart, Info, AlertCircle, Check, X } from 'lucide-react';

const ContraceptionEffectivenessChart = () => {
  const [sortBy, setSortBy] = useState('effectiveness');
  const [showDetails, setShowDetails] = useState(null);

  const methods = [
    {
      id: 'implant',
      name: 'Implant (Nexplanon)',
      effectiveness: 99.95,
      typical: 99.95,
      duration: '3 years',
      reversible: true,
      breastfeeding: 'Safe',
      startTime: 'Immediate if inserted within 5 days postpartum',
      pros: ['Most effective', 'Long-lasting', 'Nothing to remember'],
      cons: ['Irregular bleeding', 'Requires insertion procedure']
    },
    {
      id: 'iud_copper',
      name: 'Copper IUD',
      effectiveness: 99.2,
      typical: 99.2,
      duration: '10-12 years',
      reversible: true,
      breastfeeding: 'Safe',
      startTime: 'Immediate postpartum or 6 weeks',
      pros: ['Hormone-free', 'Long-lasting', 'Emergency contraception'],
      cons: ['Heavier periods', 'Insertion discomfort']
    },
    {
      id: 'iud_hormonal',
      name: 'Hormonal IUD (Mirena/Skyla)',
      effectiveness: 99.8,
      typical: 99.8,
      duration: '3-7 years',
      reversible: true,
      breastfeeding: 'Safe',
      startTime: 'Immediate postpartum or 6 weeks',
      pros: ['Reduces menstrual flow', 'Long-lasting'],
      cons: ['Irregular spotting initially', 'Insertion discomfort']
    },
    {
      id: 'sterilization',
      name: 'Sterilization',
      effectiveness: 99.5,
      typical: 99.5,
      duration: 'Permanent',
      reversible: false,
      breastfeeding: 'Safe',
      startTime: 'Can be done during cesarean or mini-lap postpartum',
      pros: ['Permanent', 'No maintenance'],
      cons: ['Irreversible', 'Surgical procedure']
    },
    {
      id: 'depo',
      name: 'Depo-Provera Injection',
      effectiveness: 94,
      typical: 94,
      duration: '3 months',
      reversible: true,
      breastfeeding: 'Safe',
      startTime: '6 weeks postpartum if breastfeeding',
      pros: ['Private', 'No daily action needed'],
      cons: ['Weight gain', 'Delayed fertility return', 'Bone density concerns']
    },
    {
      id: 'mini_pill',
      name: 'Mini-Pill (POP)',
      effectiveness: 91,
      typical: 91,
      duration: 'Daily',
      reversible: true,
      breastfeeding: 'Preferred',
      startTime: 'Immediately postpartum',
      pros: ['No estrogen', 'Can start immediately'],
      cons: ['Must take same time daily', 'Irregular bleeding']
    },
    {
      id: 'combined_pill',
      name: 'Combined Pill',
      effectiveness: 91,
      typical: 91,
      duration: 'Daily',
      reversible: true,
      breastfeeding: 'Not recommended',
      startTime: '6 weeks if not breastfeeding',
      pros: ['Regulates periods', 'Reduces acne'],
      cons: ['Daily pill', 'Not for breastfeeding', 'Blood clot risk']
    },
    {
      id: 'patch',
      name: 'Patch',
      effectiveness: 91,
      typical: 91,
      duration: 'Weekly',
      reversible: true,
      breastfeeding: 'Not recommended',
      startTime: '6 weeks if not breastfeeding',
      pros: ['Weekly application', 'Easy to use'],
      cons: ['Visible', 'Skin irritation', 'Not for breastfeeding']
    },
    {
      id: 'ring',
      name: 'Vaginal Ring',
      effectiveness: 91,
      typical: 91,
      duration: 'Monthly',
      reversible: true,
      breastfeeding: 'Not recommended',
      startTime: '6 weeks if not breastfeeding',
      pros: ['Monthly', 'User-controlled'],
      cons: ['Vaginal insertion', 'Not for breastfeeding']
    },
    {
      id: 'condom',
      name: 'Male Condom',
      effectiveness: 82,
      typical: 82,
      duration: 'Each use',
      reversible: true,
      breastfeeding: 'Safe',
      startTime: 'Anytime',
      pros: ['STI protection', 'No hormones', 'Available OTC'],
      cons: ['Must use every time', 'Can break']
    },
    {
      id: 'lam',
      name: 'LAM (Lactational Amenorrhea)',
      effectiveness: 98,
      typical: 95,
      duration: 'Up to 6 months',
      reversible: true,
      breastfeeding: 'Required',
      startTime: 'Birth to 6 months',
      pros: ['Natural', 'Free', 'No side effects'],
      cons: ['Strict criteria', 'Temporary', 'No period predictor']
    },
    {
      id: 'withdrawal',
      name: 'Withdrawal',
      effectiveness: 78,
      typical: 78,
      duration: 'Each use',
      reversible: true,
      breastfeeding: 'Safe',
      startTime: 'Anytime',
      pros: ['Free', 'Always available'],
      cons: ['Requires self-control', 'No STI protection']
    }
  ];

  const sortedMethods = [...methods].sort((a, b) => {
    if (sortBy === 'effectiveness') return b.typical - a.typical;
    if (sortBy === 'duration') {
      const order = ['Permanent', '10-12 years', '3-7 years', '3 years', '3 months', 'Monthly', 'Weekly', 'Daily', 'Each use', 'Up to 6 months'];
      return order.indexOf(a.duration) - order.indexOf(b.duration);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <BarChart className="w-6 h-6 text-blue-600" />
          Contraception Effectiveness Chart
        </h2>
        <p className="text-gray-600">Compare effectiveness rates and features of postpartum contraception options</p>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="effectiveness">Effectiveness</option>
          <option value="duration">Duration</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="space-y-3">
        {sortedMethods.map(method => (
          <div key={method.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setShowDetails(showDetails === method.id ? null : method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{method.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm">
                    <span className="text-gray-600">Duration: {method.duration}</span>
                    <span className={`flex items-center gap-1 ${method.breastfeeding === 'Safe' || method.breastfeeding === 'Preferred' ? 'text-green-600' : method.breastfeeding === 'Required' ? 'text-blue-600' : 'text-red-600'}`}>
                      {method.breastfeeding === 'Safe' || method.breastfeeding === 'Preferred' ? <Check className="w-4 h-4" /> : method.breastfeeding === 'Required' ? <Info className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      {method.breastfeeding === 'Safe' ? 'Breastfeeding safe' : method.breastfeeding === 'Preferred' ? 'Best for breastfeeding' : method.breastfeeding === 'Required' ? 'Requires breastfeeding' : 'Not for breastfeeding'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{method.typical}%</div>
                  <div className="text-xs text-gray-500">Typical use</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Effectiveness:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${method.typical}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {showDetails === method.id && (
              <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Advantages</h4>
                    <ul className="space-y-1">
                      {method.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Considerations</h4>
                    <ul className="space-y-1">
                      {method.cons.map((con, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-100 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>When to start:</strong> {method.startTime}
                  </p>
                </div>
                {!method.reversible && (
                  <div className="mt-2 p-3 bg-yellow-100 rounded-md">
                    <p className="text-sm text-yellow-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <strong>Note:</strong> This method is permanent and not reversible.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
          <Info className="w-5 h-5" />
          Important Considerations
        </h3>
        <ul className="space-y-1 text-sm text-purple-700">
          <li>• Effectiveness rates shown are for typical use (real-world conditions)</li>
          <li>• Discuss all options with healthcare provider considering individual health factors</li>
          <li>• Some methods may affect milk supply if breastfeeding</li>
          <li>• Consider STI protection needs - only barrier methods provide protection</li>
        </ul>
      </div>
    </div>
  );
};

export default ContraceptionEffectivenessChart;
EOF

echo "✅ Created ContraceptionEffectivenessChart.jsx"

echo ""
echo "✨ All missing components have been created!"
echo ""
echo "Next steps:"
echo "1. Try running: npm start"
echo "2. The app should now compile without errors"
echo "3. Add your audio files to public/audio/"
echo "4. Test that components appear at the correct timestamps"
echo ""
echo "Component locations:"
echo "  src/components/BreastfeedingPositionGuide.jsx"
echo "  src/components/PainManagementCalculator.jsx"
echo "  src/components/NewbornAssessmentChecklist.jsx"
echo "  src/components/ContraceptionEffectivenessChart.jsx"
EOF

chmod +x create-missing-components.sh
echo "✅ Script created: create-missing-components.sh"
echo "Run it with: bash create-missing-components.sh"
