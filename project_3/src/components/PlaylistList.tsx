import React, { useState, useEffect } from 'react';
import { MoreVertical, Play } from 'lucide-react';
import { Playlist } from '../lib/types';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PlaylistMenu } from './PlaylistMenu';

interface PlaylistListProps {
  onPlaylistSelect?: (playlist: Playlist) => void;
}

export function PlaylistList({ onPlaylistSelect }: PlaylistListProps) {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!user) return;
      try {
        const { data } = await supabase
          .from('playlists')
          .select(`
            *,
            videos:playlist_videos(
              id,
              video_id,
              position,
              video:videos(*)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data) {
          setPlaylists(data);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, [user]);

  return (
    <div className="space-y-4">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="bg-white rounded-lg shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-medium">{playlist.name}</h3>
              <p className="text-sm text-gray-500">
                {playlist.videos?.length || 0} Videos · {playlist.is_private ? 'Privada' : 'Pública'}
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === playlist.id ? null : playlist.id)}
                className="p-1 hover:bg-gray-100 rounded-full"
                aria-label={`Opciones para la lista ${playlist.name}`}
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              {activeMenu === playlist.id && (
                <PlaylistMenu
                  playlist={playlist}
                  onClose={() => setActiveMenu(null)}
                />
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onPlaylistSelect?.(playlist)}
              className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium flex items-center"
            >
              <Play className="w-4 h-4 mr-1" />
              Reproducir
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Aleatorio
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}