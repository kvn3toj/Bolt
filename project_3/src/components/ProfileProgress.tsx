import React from 'react';
import { Star } from 'lucide-react';

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
}

function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface ProfileProgressProps {
  stats: {
    points: number;
    level: number;
    streak: number;
    completed: number;
    total: number;
  };
}

export function ProfileProgress({ stats }: ProfileProgressProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium mb-1">Tu camino</h2>
          <p className="text-sm text-gray-500">
            Has completado {stats.completed} de {stats.total} lecciones
          </p>
        </div>
        <div className="flex items-center bg-purple-100 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-purple-600 mr-1" />
          <span className="text-sm font-medium text-purple-600">{stats.points}</span>
        </div>
      </div>

      <ProgressBar
        value={stats.completed}
        max={stats.total}
        label="Progreso general"
      />

      <ProgressBar
        value={stats.level}
        max={100}
        label="Nivel"
      />

      <ProgressBar
        value={stats.streak}
        max={7}
        label="Racha semanal"
      />
    </div>
  );
}