import React from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  Subtitles
} from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  showSubtitles: boolean;
  volume: number;
  onPlayPause: () => void;
  onMute: () => void;
  onVolumeChange: (value: number) => void;
  onSeek: (time: number) => void;
  onSkip: (seconds: number) => void;
  onSpeedChange: (speed: number) => void;
  onToggleSubtitles: () => void;
  onFullscreen: () => void;
}

export function VideoControls({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  playbackSpeed,
  showSubtitles,
  volume,
  onPlayPause,
  onMute,
  onVolumeChange,
  onSeek: handleTimeUpdate,
  onSkip,
  onSpeedChange,
  onToggleSubtitles,
  onFullscreen
}: VideoControlsProps) {
  const [showSettings, setShowSettings] = React.useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={handleTimeUpdate}
        className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer"
        style={{
          backgroundSize: `${(currentTime / duration) * 100}% 100%`,
          backgroundImage: 'linear-gradient(to right, white, white)'
        }}
      />

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-4">
          <button onClick={onPlayPause} className="text-white hover:text-gray-300">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          <button onClick={() => onSkip(-10)} className="text-white hover:text-gray-300">
            <SkipBack className="w-5 h-5" />
          </button>
          <button onClick={() => onSkip(10)} className="text-white hover:text-gray-300">
            <SkipForward className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <button onClick={onMute} className="text-white hover:text-gray-300">
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
            />
          </div>

          <span className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:text-gray-300"
            >
              <Settings className="w-5 h-5" />
            </button>
            {showSettings && (
              <div className="absolute bottom-full left-0 mb-2 bg-black/90 backdrop-blur-sm rounded-xl p-2 min-w-[200px]">
                <div className="text-white text-sm">
                  <p className="px-2 py-1">Velocidad de reproducción</p>
                  {[0.5, 1, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => onSpeedChange(speed)}
                      className={`block w-full px-2 py-1 text-left hover:bg-white/10 ${
                        playbackSpeed === speed ? 'text-purple-400' : ''
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onToggleSubtitles}
            className={`text-white hover:text-gray-300 ${
              showSubtitles ? 'text-purple-400' : ''
            }`}
          >
            <Subtitles className="w-5 h-5" />
          </button>
        </div>

        <button onClick={onFullscreen} className="text-white hover:text-gray-300">
          <Maximize className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}