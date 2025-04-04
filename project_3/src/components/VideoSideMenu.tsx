import React from 'react';
import { X, List, Heart, Share, Flag, Info, Download, PlayCircle } from 'lucide-react';

interface VideoSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaylistAdd: () => void;
  onToggleFavorite: () => void;
  onShare: () => void;
  onReport: () => void;
  isFavorited: boolean;
  videoTitle: string;
  videoDescription: string;
}

export function VideoSideMenu({
  isOpen,
  onClose,
  onPlaylistAdd,
  onToggleFavorite,
  onShare,
  onReport,
  isFavorited,
  videoTitle,
  videoDescription
}: VideoSideMenuProps) {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Opciones</h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close options"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-medium text-gray-900">{videoTitle}</h3>
            <p className="mt-1 text-sm text-gray-500">{videoDescription}</p>
          </div>

          <div className="p-2">
            <button
              onClick={onPlaylistAdd}
              className="w-full p-3 flex items-center text-left hover:bg-gray-50 rounded-lg"
            >
              <List className="w-5 h-5 text-gray-600 mr-3" />
              <span>Agregar a playlist</span>
            </button>

            <button
              onClick={onToggleFavorite}
              className="w-full p-3 flex items-center text-left hover:bg-gray-50 rounded-lg"
            >
              <Heart
                className={`w-5 h-5 mr-3 ${
                  isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'
                }`}
              />
              <span>{isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>
            </button>

            <button
              onClick={onShare}
              className="w-full p-3 flex items-center text-left hover:bg-gray-50 rounded-lg"
            >
              <Share className="w-5 h-5 text-gray-600 mr-3" />
              <span>Compartir</span>
            </button>

            <button
              onClick={onReport}
              className="w-full p-3 flex items-center text-left hover:bg-gray-50 rounded-lg"
            >
              <Flag className="w-5 h-5 text-gray-600 mr-3" />
              <span>Reportar problema</span>
            </button>
          </div>

          <div className="p-4 border-t mt-auto">
            <div className="flex items-center text-sm text-gray-500">
              <Info className="w-4 h-4 mr-2" />
              <span>Calidad de video: HD</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Download className="w-4 h-4 mr-2" />
              <span>Disponible sin conexión</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <PlayCircle className="w-4 h-4 mr-2" />
              <span>Reproducción automática: Activada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}