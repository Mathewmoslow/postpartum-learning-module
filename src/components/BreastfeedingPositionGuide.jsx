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
