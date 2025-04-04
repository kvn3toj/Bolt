import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileProgress } from '../components/ProfileProgress';
import { ProfileTabs } from '../components/ProfileTabs';
import { ProfileActivity } from '../components/ProfileActivity';
import { ProfileRanking } from '../components/ProfileRanking';
import { BottomNavigation } from '../components/BottomNavigation';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface Activity {
  id: string;
  type: 'achievement' | 'quiz' | 'streak';
  title: string;
  description: string;
  points: number;
  date: string;
}

interface Stats {
  points: number;
  level: number;
  streak: number;
  completed: number;
  total: number;
}

const TABS = [
  { id: 'progress', label: 'Mi progreso' },
  { id: 'activity', label: 'Actividad' },
  { id: 'ranking', label: 'Ranking' }
];

const calculateStreak = (progressData: any[]) => {
  const today = new Date();
  let streak = 0;
  
  // Ordenar por fecha más reciente
  const sortedProgress = [...progressData].sort((a, b) => 
    new Date(b.last_watched_at).getTime() - new Date(a.last_watched_at).getTime()
  );

  for (const progress of sortedProgress) {
    const date = new Date(progress.last_watched_at);
    if (date.toDateString() === today.toDateString()) {
      streak++;
      today.setDate(today.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

export function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('progress');
  const [stats, setStats] = useState<Stats>({
    points: 0,
    level: 0,
    streak: 0,
    completed: 0,
    total: 0
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      setError(null);

      try {
        // Obtener progreso total y puntos
        const [progressResponse, quizResponse] = await Promise.all([
          supabase
            .from('video_progress')
            .select('*')
            .eq('user_id', user.id),
          supabase
            .from('quiz_results')
            .select('points_earned')
            .eq('user_id', user.id)
        ]);

        if (progressResponse.error) throw progressResponse.error;
        if (quizResponse.error) throw quizResponse.error;

        const progressData = progressResponse.data || [];
        const quizData = quizResponse.data || [];

        // Calcular stats
        setStats({
          points: quizData.reduce((sum, result) => sum + result.points_earned, 0),
          level: Math.floor(progressData.length / 5), // 5 videos por nivel
          streak: calculateStreak(progressData),
          completed: progressData.filter(p => p.progress >= 0.9).length,
          total: progressData.length
        });

        // Obtener actividades
        const [quizResults, videoProgress, achievements] = await Promise.all([
          supabase
            .from('quiz_results')
            .select(`
              id,
              points_earned,
              created_at,
              video:videos(title)
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false }),
          supabase
            .from('video_progress')
            .select(`
              id,
              progress,
              last_watched_at,
              video:videos(title)
            `)
            .eq('user_id', user.id)
            .order('last_watched_at', { ascending: false }),
          supabase
            .from('achievements')
            .select('*')
            .eq('user_id', user.id)
            .order('earned_at', { ascending: false })
        ]);

        if (quizResults.error) throw quizResults.error;
        if (videoProgress.error) throw videoProgress.error;
        if (achievements.error) throw achievements.error;

        const formattedActivities: Activity[] = [];

        // Agregar resultados de quizzes
        quizResults.data?.forEach(result => {
          formattedActivities.push({
            id: `quiz_${result.id}`,
            type: 'quiz',
            title: `Quiz: ${result.video.title}`,
            description: `Obtuviste ${result.points_earned} puntos`,
            points: result.points_earned,
            date: result.created_at
          });
        });

        // Agregar videos completados
        videoProgress.data?.forEach(progress => {
          if (progress.progress >= 0.9) {
            formattedActivities.push({
              id: `video_${progress.id}`,
              type: 'achievement',
              title: `Lección completada: ${progress.video.title}`,
              description: '¡Felicidades por completar esta lección!',
              points: 50,
              date: progress.last_watched_at
            });
          }
        });

        // Agregar logros
        achievements.data?.forEach(achievement => {
          formattedActivities.push({
            id: `achievement_${achievement.id}`,
            type: 'achievement',
            title: achievement.title,
            description: achievement.description,
            points: achievement.points,
            date: achievement.earned_at
          });
        });

        // Ordenar por fecha
        formattedActivities.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setActivities(formattedActivities);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error al cargar los datos del perfil. Por favor, intenta de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

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