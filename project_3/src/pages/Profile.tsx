import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileProgress } from '../components/ProfileProgress';
import { ProfileTabs } from '../components/ProfileTabs';
import { ProfileActivity } from '../components/ProfileActivity';
import { ProfileRanking } from '../components/ProfileRanking';
import { BottomNavigation } from '../components/BottomNavigation';

const TABS = [
  { id: 'progress', label: 'Mi progreso' },
  { id: 'activity', label: 'Actividad' },
  { id: 'ranking', label: 'Ranking' }
];

export function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('progress');
  
  const stats = {
    points: 450,
    level: 5,
    streak: 3,
    completed: 12,
    total: 30
  };

  const activities = [
    {
      id: '1',
      type: 'achievement' as const,
      title: '¡Primera lección completada!',
      description: 'Completaste tu primera lección de programación',
      points: 50,
      date: '2025-03-30T10:00:00Z'
    },
    {
      id: '2',
      type: 'quiz' as const,
      title: 'Quiz de JavaScript',
      description: 'Obtuviste una puntuación perfecta',
      points: 100,
      date: '2025-03-29T15:30:00Z'
    },
    {
      id: '3',
      type: 'streak' as const,
      title: '¡Racha de 7 días!',
      description: 'Has mantenido tu racha de aprendizaje por una semana',
      points: 70,
      date: '2025-03-28T20:15:00Z'
    }
  ];

  const rankingUsers = [
    {
      id: '1',
      name: 'Ana García',
      points: 1250,
      rank: 1,
      trend: 'up' as const
    },
    {
      id: '2',
      name: 'Carlos López',
      points: 1100,
      rank: 2,
      trend: 'same' as const
    },
    {
      id: user?.id || '3',
      name: user?.user_metadata.name || 'You',
      points: 950,
      rank: 3,
      trend: 'up' as const
    }
  ];

  return (
    <div className="max-w-lg mx-auto bg-gray-50 min-h-screen">
      <ProfileHeader title="Mi Perfil" />
      
      {/* User Profile Card */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
          alt="Profile background"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-xl font-semibold">{user?.user_metadata.name || 'User'}</h2>
          <p className="text-sm opacity-90">{user?.email}</p>
        </div>
      </div>

      <ProfileTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="p-4 pb-20">
        {activeTab === 'progress' && <ProfileProgress stats={stats} />}
        {activeTab === 'activity' && <ProfileActivity activities={activities} />}
        {activeTab === 'ranking' && (
          <ProfileRanking users={rankingUsers} currentUserId={user?.id || ''} />
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
}