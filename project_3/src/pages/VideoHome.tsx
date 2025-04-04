import { useState, useEffect } from 'react';
import { Menu, Search, MessageSquare, Bell } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { VideoSection } from '../components/VideoHome/VideoSection';
import { VideoCategories } from '../components/VideoHome/VideoCategories';
import { BottomNavigation } from '../components/BottomNavigation';

// Interfaz para adaptar los videos de la BD al formato que espera VideoSection
interface VideoSectionData {
  title: string;
  videos: {
    id: number;
    title: string;
    thumbnail_url: string;
    duration: number;
  }[];
}

interface SupabaseVideo {
  id: string;
  title: string;
  thumbnail_url: string;
  thumbnailUrl: string;
  duration: number;
}

interface SupabaseProgress {
  video_id: string;
  videos: {
    id: string;
    title: string;
    thumbnail_url: string;
    thumbnailUrl: string;
    duration: number;
  };
}

export function VideoHome() {
  const { user } = useAuth();
  const [videos, setVideos] = useState<VideoSectionData[]>([]);
  const [recentVideos, setRecentVideos] = useState<VideoSectionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Mapear los datos para que coincidan con lo que espera VideoSection
        const formattedVideos = (data as unknown as SupabaseVideo[]).map(video => ({
          title: video.title,
          videos: [{
            id: parseInt(video.id),
            title: video.title,
            thumbnail_url: video.thumbnail_url || video.thumbnailUrl || '',
            duration: video.duration
          }]
        }));
        setVideos(formattedVideos);

        // Cargar videos recientes si el usuario está autenticado
        if (user) {
          const { data: recentData, error: recentError } = await supabase
            .from('video_progress')
            .select(`
              video_id,
              videos!inner (
                id,
                title,
                thumbnail_url,
                duration
              )
            `)
            .eq('user_id', user.id)
            .order('last_watched_at', { ascending: false })
            .limit(5);

          if (recentError) throw recentError;

          const recentVids = (recentData as unknown as SupabaseProgress[])
            .filter(Boolean)
            .map(progress => ({
              title: progress.videos.title,
              videos: [{
                id: parseInt(progress.videos.id),
                title: progress.videos.title,
                thumbnail_url: progress.videos.thumbnail_url || progress.videos.thumbnailUrl || '',
                duration: progress.videos.duration
              }]
            }));
          setRecentVideos(recentVids);
        }
      } catch (err) {
        console.error('Error loading videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, [user]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button className="p-2" aria-label="Menú">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="ml-2 text-xl font-semibold">ÜPlay</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2" aria-label="Buscar">
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2" aria-label="Mensajes">
              <MessageSquare className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2 relative" aria-label="Notificaciones">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>

      <VideoCategories
        onSelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />

      <div className="px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"
              title="Loading videos"
            />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p title="Error message">{error}</p>
          </div>
        ) : (
          <div>
            {recentVideos.length > 0 && (
              <VideoSection
                title="Continuar viendo"
                videos={recentVideos[0].videos}
                showViewAll={false}
              />
            )}
            <VideoSection
              title="Videos populares"
              videos={videos[0]?.videos || []}
            />
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}