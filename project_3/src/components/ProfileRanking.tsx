import React from 'react';
import { Trophy, Star, TrendingUp } from 'lucide-react';

interface RankingUser {
  id: string;
  name: string;
  points: number;
  rank: number;
  avatar?: string;
  trend: 'up' | 'down' | 'same';
}

interface ProfileRankingProps {
  users: RankingUser[];
  currentUserId: string;
}

export function ProfileRanking({ users, currentUserId }: ProfileRankingProps) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: RankingUser['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
      default:
        return <div className="w-4 h-4 flex items-center justify-center">-</div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-medium text-gray-900">Ranking Global</h2>
        <p className="text-sm text-gray-500">Compite con otros estudiantes</p>
      </div>

      <div className="divide-y divide-gray-100">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-4 ${
              user.id === currentUserId ? 'bg-purple-50' : ''
            }`}
          >
            <div className="flex items-center justify-center w-8">
              {user.rank <= 3 ? (
                <Trophy className={`w-5 h-5 ${getRankColor(user.rank)}`} />
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  {user.rank}
                </span>
              )}
            </div>

            <div className="ml-4 flex-1">
              <div className="flex items-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="ml-3 font-medium text-gray-900">
                  {user.name}
                </span>
                {user.id === currentUserId && (
                  <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                    Tú
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-purple-600 mr-1" />
                <span className="font-medium">{user.points}</span>
              </div>
              {getTrendIcon(user.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}