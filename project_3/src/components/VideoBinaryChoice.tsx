import React, { useState, useEffect, useCallback } from 'react';
import { Clock } from 'lucide-react';

interface BinaryChoice {
  id: string;
  question?: string; // Optional, might not have a question for binary choices
  options: string[];
  correctAnswer: number;
  time_limit?: number;
  points?: number;
}

interface VideoBinaryChoiceProps {
  choice: BinaryChoice;
  onAnswer: (isCorrect: boolean) => void;
  onClose: () => void;
  onExpand?: () => void;
  pausedTimestamp?: number | null;
}

export function VideoBinaryChoice({
  choice,
  onAnswer,
  onClose,
  onExpand,
  pausedTimestamp
}: VideoBinaryChoiceProps) {
  const [timeLeft, setTimeLeft] = useState(choice.time_limit || 10);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Handle timer adjustment if video buffered
  useEffect(() => {
    if (pausedTimestamp && !showFeedback) {
      const adjustmentTime = Math.floor((Date.now() - pausedTimestamp) / 1000);
      if (adjustmentTime > 0) {
        setTimeLeft(prev => Math.min(prev + adjustmentTime, choice.time_limit || 10));
      }
    }
  }, [pausedTimestamp, showFeedback, choice.time_limit]);
  
  const handleAnswer = useCallback((index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
    
    const isCorrect = index === choice.correctAnswer;
    onAnswer(isCorrect);
    
    // Close after feedback
    setTimeout(() => {
      onClose();
    }, 2000);
  }, [choice.correctAnswer, onAnswer, onClose]);
  
  // Handle countdown timer
  useEffect(() => {
    if (timeLeft <= 0 || showFeedback) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Handle timeout - no answer selected
          handleAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, showFeedback, handleAnswer]);
  
  return (
    <div className="absolute bottom-16 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-3 z-40 transition-all duration-300">
      {/* Header with timer */}
      <div className="flex justify-between items-center mb-2">
        {choice.question && (
          <h4 className="text-white text-sm font-medium mr-2">{choice.question}</h4>
        )}
        <div className="bg-white/20 px-2 py-0.5 rounded-full text-white text-xs flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {timeLeft}s
        </div>
      </div>
      
      {/* Options */}
      <div className="flex space-x-2">
        {choice.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && handleAnswer(index)}
            disabled={showFeedback}
            className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
              showFeedback
                ? index === choice.correctAnswer
                  ? 'bg-green-500/60'
                  : index === selectedOption
                  ? 'bg-red-500/60'
                  : 'bg-white/10'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="progress-bar-container">
        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-200 ease-in-out"
          style={{ '--progress-width': `${Math.round((timeLeft / (choice.time_limit || 10)) * 100)}%`, width: 'var(--progress-width)' } as React.CSSProperties}
        />
      </div>
      
      {/* Expand button */}
      {onExpand && (
        <button 
          onClick={onExpand}
          className="mt-2 text-xs text-white/70 hover:text-white w-full text-center"
        >
          Expandir
        </button>
      )}
    </div>
  );
} 