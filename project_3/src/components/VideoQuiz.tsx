import React, { useState, useEffect, useCallback } from 'react';
import { Star, Clock } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type?: 'binary' | 'multiple';
}

interface VideoQuizProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
  onClose: () => void;
  points?: number;
  timeLimit?: number;
}

export function VideoQuiz({
  question,
  onAnswer,
  onClose,
  points = 10,
  timeLimit = 30
}: VideoQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const isBinary = question.type === 'binary' || question.options.length === 2;

  const handleAnswer = useCallback((index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    const isCorrect = index === question.correctAnswer;
    onAnswer(isCorrect);

    setTimeout(() => {
      onClose();
    }, 3000);
  }, [question.correctAnswer, onAnswer, onClose]);

  useEffect(() => {
    if (timeLimit > 0 && !showFeedback) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAnswer(-1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLimit, showFeedback, handleAnswer]);

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/80 backdrop-blur-sm z-50">
      <div className="w-full max-w-2xl px-4">
        {/* Points and Timer */}
        <div className="flex justify-end mb-4 space-x-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-white flex items-center">
            <Star className="w-4 h-4 mr-1" />
            {points}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-white flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {timeLeft}s
          </span>
        </div>

        {/* Question */}
        <h3 className="text-2xl text-white text-center font-medium mb-12">{question.question}</h3>

        {/* Options */}
        <div className={`grid ${isBinary ? 'grid-cols-2' : 'grid-cols-1'} gap-6 max-w-xl mx-auto`}>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswer(index)}
              disabled={showFeedback}
              className={`w-full p-6 rounded-2xl text-center transition-all ${
                showFeedback
                  ? index === question.correctAnswer
                    ? 'bg-green-500/30 border border-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-500/30 border border-red-500'
                    : 'bg-white/10'
                  : isBinary
                    ? 'bg-white/10 hover:bg-white/20 h-32 flex items-center justify-center text-3xl font-medium'
                    : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {isBinary ? (
                <span className="text-white text-center w-full text-4xl font-bold">{option}</span>
              ) : (
                <>
                  <span className="inline-block w-8 h-8 rounded-full bg-white/10 text-center mr-3 leading-8">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-12 w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-purple-500 h-full rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / timeLimit) * 100}%` }}
          />
        </div>
        
        {/* Feedback Message */}
        {showFeedback && (
          <div className="mt-8 text-center text-2xl">
            {selectedAnswer === question.correctAnswer ? (
              <span className="text-green-400">¡Correcto! +{points} puntos 🎉</span>
            ) : (
              <span className="text-red-400">Incorrecto. Inténtalo de nuevo.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}