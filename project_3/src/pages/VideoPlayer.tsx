import React, { useState, useRef, useEffect, useCallback } from 'react';
import { VideoOnboarding } from '../components/VideoOnboarding';
import { VideoQuiz } from '../components/VideoQuiz';
import { type VideoQuestion } from '../lib/types';

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef<number>();

  // Content state
  const [activeQuestion, setActiveQuestion] = useState<VideoQuestion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('videoOnboardingComplete');
  });

  // Player container ref for fullscreen
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Auto-hide controls
  const hideControls = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying && !activeQuestion) {
        setIsControlsVisible(false);
      }
    }, 3000);
  }, [isPlaying, activeQuestion]);

  const showControls = useCallback(() => {
    setIsControlsVisible(true);
    hideControls();
  }, [hideControls]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
    };
    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
    };
  }, []);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }
  }, []);

  // Auto-hide controls effect
  useEffect(() => {
    if (isPlaying && !activeQuestion) {
      hideControls();
    } else {
      setIsControlsVisible(true);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, activeQuestion, hideControls]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
          setIsPlaying(false);
        });
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (newMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const handleSeek = (time: number) => {
    if (isNaN(time)) return;
    
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleFullscreen = () => {
    if (playerContainerRef.current) {
      if (isFullscreen) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
      }
    }
  };

  const handlePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  return (
    <div 
      ref={playerContainerRef}
      className="max-w-4xl mx-auto bg-black overflow-hidden pb-20 relative group"
      onMouseMove={showControls}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
    >
      {showOnboarding && <VideoOnboarding onComplete={() => setShowOnboarding(false)} />}
      <div className="relative aspect-video">
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          onError={(e) => {
            console.error('Video loading error:', e);
            setError('Failed to load video. Please try again later.');
          }}
          poster=""
          controls={false}
          preload="auto"
          crossOrigin="anonymous"
          src=""
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Error Message Overlay */}
        {error && (
          <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-white">
            <div className="text-center">
              <p className="text-lg">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                }}
                className="mt-4 px-4 py-2 bg-purple-600 rounded-full text-sm hover:bg-purple-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Active Quiz Question Overlay */}
        {activeQuestion && (
          <VideoQuiz
            question={{
              ...activeQuestion,
              correctAnswer: activeQuestion.correct_answer
            }}
            onAnswer={(isCorrect: boolean) => {
              console.log('Quiz answer:', isCorrect);
              setActiveQuestion(null);
              if (videoRef.current) videoRef.current.play();
            }}
            onClose={() => {
              setActiveQuestion(null);
              if (videoRef.current) videoRef.current.play();
            }}
          />
        )}

        {/* Video Controls */}
        <VideoControls
          isPlaying={isPlaying}
          isVisible={isControlsVisible}
          isMuted={isMuted}
          currentTime={currentTime}
          duration={duration}
          playbackSpeed={playbackSpeed}
          showSubtitles={showSubtitles}
          volume={volume}
          isFullscreen={isFullscreen}
          isBuffering={isBuffering}
          onPlayPause={togglePlay}
          onMute={toggleMute}
          onVolumeChange={handleVolumeChange}
          onSeek={handleSeek}
          onSpeedChange={handlePlaybackSpeed}
          onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
          onFullscreen={handleFullscreen}
        />
        
        {/* Buffering Indicator */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
}