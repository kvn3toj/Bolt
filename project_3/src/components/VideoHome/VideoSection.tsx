import React from 'react';
import { Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Video {
  id: number;
  title: string;
  thumbnail_url: string;
  duration: number;
}

interface VideoSectionProps {
  title: string;
  videos: Video[];
  showViewAll?: boolean;
}

export function VideoSection({ title, videos, showViewAll = true }: VideoSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {showViewAll && (
          <button className="text-sm text-purple-600 font-medium">
            Ver todo
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {videos.map((video) => (
          <Link
            key={video.id}
            to={`/video/${video.id}`}
            className="group relative rounded-lg overflow-hidden bg-gray-100"
          >
            <div className="aspect-video relative">
              <img
                src={video.thumbnail_url}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <button className="absolute inset-0 flex items-center justify-center">
                <Play className="w-10 h-10 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
              </button>
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                {video.title}
              </h3>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600 ml-1">4.8</span>
                <span className="text-xs text-gray-500 ml-2">• 2.5k vistas</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}