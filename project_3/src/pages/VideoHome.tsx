import React, { useState, useEffect } from 'react';
import { Menu, Search, MessageSquare, Bell } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Video } from '../lib/types';
import { VideoSection } from '../components/VideoHome/VideoSection';
import { VideoCategories } from '../components/VideoHome/VideoCategories';
import { BottomNavigation } from '../components/BottomNavigation';

export function VideoHome() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [recentVideos, setRecentVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecentProgress = async () => {
      if (!user) return;
      try {
        const { data } = await supabase
          .from('video_progress')
          .select(`
            *,
            video:videos(*)
          `)
          .eq('user_id', user.id)
          .order('last_watched_at', { ascending: false })
          .limit(4);

        if (data) {
          const recentVids = data.map(progress => progress.video).filter(Boolean);
          setRecentVideos(recentVids as Video[]);
        }
      } catch (error) {
        console.error('Error fetching recent progress:', error);
      }
    };

    fetchVideos();
    fetchRecentProgress();

  }, [selectedCategory, user]);

  const fetchVideos = async () => {
    try {
      const { data } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setVideos(data);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredVideos = (categoryIds: number[]) => {
    return videos.filter(video => categoryIds.includes(video.id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button aria-label="Abrir menú" className="p-2">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="ml-2 text-xl font-semibold">ÜPlay</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button aria-label="Buscar" className="p-2">
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            <button aria-label="Mensajes" className="p-2">
              <MessageSquare className="w-6 h-6 text-gray-600" />
            </button>
            <button aria-label="Notificaciones" className="p-2 relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>

      <VideoCategories
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div>
            {recentVideos.length > 0 && (
              <VideoSection
                title="Continuar viendo"
                videos={recentVideos}
              />
            )}
            
            {/* Educational Categories */}
            {videos.length > 0 && (
              <>
                <VideoSection
                  title="Desarrollo Personal"
                  videos={getFilteredVideos([13, 16, 17, 20])}
                />
                <VideoSection
                  title="Tecnología y Diseño"
                  videos={getFilteredVideos([12, 14, 18])}
                />
                <VideoSection
                  title="Negocios y Finanzas"
                  videos={getFilteredVideos([15, 19, 21])}
                />
              </>
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}