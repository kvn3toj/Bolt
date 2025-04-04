import React from 'react';
import { Calendar, Star, Trophy, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'achievement' | 'lesson' | 'quiz' | 'streak';
  title: string;
  description: string;
  points?: number;
  date: string;
}

interface ProfileActivityProps {
  activities: Activity[];
}

export function ProfileActivity({ activities }: ProfileActivityProps) {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'achievement':
        return Trophy;
      case 'lesson':
        return Clock;
      case 'quiz':
        return Star;
      case 'streak':
        return Calendar;
      default:
        return Star;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = getIcon(activity.type);
        
        return (
          <div
            key={activity.id}
            className="bg-white p-4 rounded-xl shadow-sm flex items-start space-x-4"
          >
            <div className={`
              p-2 rounded-full
              ${activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' : ''}
              ${activity.type === 'lesson' ? 'bg-blue-100 text-blue-600' : ''}
              ${activity.type === 'quiz' ? 'bg-green-100 text-green-600' : ''}
              ${activity.type === 'streak' ? 'bg-purple-100 text-purple-600' : ''}
            `}>
              <Icon className="w-5 h-5" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-400">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
                {activity.points && (
                  <div className="ml-4 flex items-center text-purple-600">
                    <Star className="w-3 h-3 mr-1" />
                    <span className="text-xs font-medium">+{activity.points}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}