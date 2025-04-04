import React, { useState } from 'react';
import { X } from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  showSkip?: boolean;
  showDeny?: boolean;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Bienvenido a OpenDaily',
    description: 'Aquí comienza tu viaje',
    showSkip: true,
    showDeny: true
  },
  {
    title: 'Más videos de esta playlist',
    description: 'En esta playlist encontrarás videos con los que podrás ganar dinero',
    showSkip: true,
    showDeny: true
  },
  {
    title: 'Más videos de esta playlist',
    description: 'Aquí se crea corta y breve descripción sobre la playlist que se está presentando en la parte superior de la pantalla.',
    showSkip: true,
    showDeny: true
  },
  {
    title: 'Hogares autosostenibles',
    description: 'Negocio en UPlay, se cultiva y gana dinero para sacar en el ranking.',
    showSkip: true,
    showDeny: true
  }
];

interface VideoOnboardingProps {
  onComplete: () => void;
}

export function VideoOnboarding({ onComplete }: VideoOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('videoOnboardingComplete', 'true');
    onComplete();
  };

  const handleSkip = () => {
    const confirmSkip = window.confirm('¿Estás seguro de que quieres saltar el tutorial? Podrás acceder a él más tarde desde la configuración.');
    if (confirmSkip) {
      handleComplete();
    }
  };

  if (!showTutorial) return null;

  const step = onboardingSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white rounded-xl p-6">
          <button
            onClick={handleSkip}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Close tutorial"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-medium mb-2">{step.title}</h2>
          <p className="text-gray-600 text-sm mb-6">{step.description}</p>

          <div className="flex items-center justify-center space-x-2 mb-6">
            {/* Progress dots */}
            <div className="flex space-x-1">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            {step.showDeny && (
              <button
                onClick={handleSkip}
                className="flex-1 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Omitir
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}