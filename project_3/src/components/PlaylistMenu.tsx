import React from 'react';
import { Plus, Trash, Edit, Lock, Share } from 'lucide-react';
import { Playlist } from '../lib/types';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface PlaylistMenuProps {
  playlist: Playlist;
  videoId?: number;
  onClose: () => void;
}

export function PlaylistMenu({ playlist, videoId, onClose }: PlaylistMenuProps) {
  const { user } = useAuth();
  const isOwner = user?.id === playlist.user_id;

  const handleAddToPlaylist = async () => {
    if (!videoId || !user) return;

    try {
      const { count } = await supabase
        .from('playlist_videos')
        .select('*', { count: 'exact' })
        .eq('playlist_id', playlist.id);

      await supabase.from('playlist_videos').insert({
        playlist_id: playlist.id,
        video_id: videoId,
        position: (count || 0) + 1
      });

      onClose();
    } catch (error) {
      console.error('Error adding video to playlist:', error);
    }
  };

  const handleRemoveFromPlaylist = async () => {
    if (!videoId || !isOwner) return;

    try {
      await supabase
        .from('playlist_videos')
        .delete()
        .eq('playlist_id', playlist.id)
        .eq('video_id', videoId);

      onClose();
    } catch (error) {
      console.error('Error removing video from playlist:', error);
    }
  };

  const handleDeletePlaylist = async () => {
    if (!isOwner) return;

    if (window.confirm('¿Estás seguro de que quieres eliminar esta playlist?')) {
      try {
        await supabase
          .from('playlists')
          .delete()
          .eq('id', playlist.id);

        onClose();
      } catch (error) {
        console.error('Error deleting playlist:', error);
      }
    }
  };

  const handleTogglePrivate = async () => {
    if (!isOwner) return;

    try {
      await supabase
        .from('playlists')
        .update({ is_private: !playlist.is_private })
        .eq('id', playlist.id);

      onClose();
    } catch (error) {
      console.error('Error updating playlist privacy:', error);
    }
  };

  const handleShare = () => {
    if (playlist.is_private) {
      alert('Esta playlist es privada y no se puede compartir.');
      return;
    }

    // Implement sharing functionality
    console.log('Share playlist:', playlist.id);
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
      {videoId ? (
        <>
          <button
            onClick={handleAddToPlaylist}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar a otra playlist
          </button>
          <button
            onClick={handleRemoveFromPlaylist}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <Trash className="w-4 h-4 mr-2" />
            Eliminar de la playlist
          </button>
        </>
      ) : (
        isOwner && (
          <>
            <button
              onClick={() => {}} // Implement edit functionality
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar Playlist
            </button>
            <button
              onClick={handleTogglePrivate}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Lock className="w-4 h-4 mr-2" />
              {playlist.is_private ? 'Hacer Pública' : 'Hacer Privada'}
            </button>
            <button
              onClick={handleShare}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Share className="w-4 h-4 mr-2" />
              Compartir
            </button>
            <button
              onClick={handleDeletePlaylist}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center"
            >
              <Trash className="w-4 h-4 mr-2" />
              Eliminar Playlist
            </button>
          </>
        )
      )}
    </div>
  );
}