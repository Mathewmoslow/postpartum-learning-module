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
