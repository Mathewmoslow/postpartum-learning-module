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
