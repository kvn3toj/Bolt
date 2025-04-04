import { Play, Clock } from 'lucide-react';

interface VideoProgressProps {
  title: string;
  progress: number;
  duration: number;
  lastWatched: string;
  thumbnailUrl?: string;
  onResume: () => void;
}

export function VideoProgress({
  title,
  progress,
  duration,
  lastWatched,
  thumbnailUrl,
  onResume
}: VideoProgressProps) {
  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hrs}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center p-4">
        <div className="relative flex-shrink-0">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-24 h-16 object-cover rounded-lg"
            />
          ) : (
            <div className="w-24 h-16 bg-gray-200 rounded-lg" />
          )}
          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
            <span className="text-white text-sm ml-1">
              {formatTime(duration / 60)}
            </span>
          </div>
        </div>

        <div className="ml-4 flex-1">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{title}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>{Math.round(progress * 100)}% completado</span>
            <span className="mx-2">•</span>
            <span>Último: {formatDate(lastWatched)}</span>
          </div>
          <div className="relative">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-200 ease-in-out"
                style={{ '--progress-width': `${Math.round(progress * 100)}%`, width: 'var(--progress-width)' } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        <button
          onClick={onResume}
          className="ml-4 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          aria-label="Reanudar reproducción"
        >
          <Play className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}