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
