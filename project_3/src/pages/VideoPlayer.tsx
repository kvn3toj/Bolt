import { useState, useRef, useEffect, useCallback } from 'react';
import { VideoOnboarding } from '../components/VideoOnboarding';
import { VideoQuiz } from '../components/VideoQuiz';
import { VideoControls } from '../components/VideoControls';
import { type VideoQuestion } from '../lib/types';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
}

interface VideoMetadata {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail_url: string;
  duration: number;
  created_at: string;
}

export function VideoPlayer({ videoId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef<number>();

  // Content state
  const [videoData, setVideoData] = useState<VideoMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<VideoQuestion[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<VideoQuestion | null>(null);
  const [lastShownQuestionId, setLastShownQuestionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('videoOnboardingComplete');
  });

  // Player container ref for fullscreen
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const loadVideoData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: video, error: videoError } = await supabase
        .from('videos')
        .select('*')
        .eq('id', videoId)
        .single();

      if (videoError) throw videoError;
      if (!video) throw new Error('Video not found');

      setVideoData(video);
    } catch (err) {
      console.error('Error loading video data:', err);
      setError('Failed to load video. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [videoId]);

  // Load video data
  useEffect(() => {
    loadVideoData();
  }, [loadVideoData]);

  // Load video questions
  useEffect(() => {
    const loadVideoQuestions = async () => {
      try {
        const { data: questions, error } = await supabase
          .from('video_questions')
          .select('*')
          .eq('video_id', videoId)
          .order('timestamp');

        if (error) throw error;
        // Added raw data logging
        console.log('RAW QUESTIONS DATA FROM SUPABASE:', JSON.stringify(questions, null, 2));
        if (questions && questions.length > 0) {
          console.log('TIMESTAMP TYPES:', 
            questions[0].timestamp, 
            'Type:', typeof questions[0].timestamp
          );
        } else {
          console.log('No questions found');
        }
        setQuestions(questions || []);
      } catch (err) {
        console.error('Error loading video questions:', err);
        setError('Failed to load video questions. Please try again later.');
      }
    };

    loadVideoQuestions();
  }, [videoId]);

  // Check for questions at current timestamp
  useEffect(() => {
    if (!questions.length || !isPlaying || !currentTime) return;
    if (activeQuestion) return;

    // Debug logs before finding a question
    console.log(`---------- QUESTION CHECK STATE ----------`);
    console.log(`Current time: ${currentTime.toFixed(2)}s`);
    console.log(`Questions count: ${questions.length}`);
    console.log(`Questions timestamps: ${questions.map(q => q.timestamp).join(', ')}`);
    console.log(`Is playing: ${isPlaying}`);
    console.log(`Active question: ${activeQuestion ? activeQuestion.id : 'none'}`);
    console.log(`Last shown question ID: ${lastShownQuestionId}`);

    // Temporarily simplify the find condition by removing the lastShownQuestionId check
    const question = questions.find(q => {
      const timeDiff = Math.abs(q.timestamp - currentTime);
      // Log each question comparison
      console.log(`Question ${q.id}: timestamp=${q.timestamp}s, currentTime=${currentTime.toFixed(2)}s, diff=${timeDiff.toFixed(2)}s, would match=${timeDiff < 1.5}, lastShown=${q.id === lastShownQuestionId}`);
      // Temporarily commented out the lastShownQuestionId condition
      // return timeDiff < 1.5 && q.id !== lastShownQuestionId;
      return timeDiff < 1.5;
    });

    if (question) {
      console.log('FOUND MATCHING QUESTION:', question);
      console.log('Will call setActiveQuestion with:', question);
      setActiveQuestion(question);
      console.log('Setting active question and pausing video');
      setLastShownQuestionId(question.id);
      if (videoRef.current) videoRef.current.pause();
    }
  }, [currentTime, questions, isPlaying, activeQuestion, lastShownQuestionId]);

  // Reset last shown question when video is seeked
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      // Si el usuario hace seek, reseteamos la última pregunta mostrada
      // para permitir que las preguntas se muestren de nuevo
      console.log('Video seeked, resetting lastShownQuestionId');
      setLastShownQuestionId(null);
    };

    video.addEventListener('seeked', handleSeeked);
    return () => {
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  const showControls = () => {
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    if (!isPlaying) return;
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        // Controls will be hidden by CSS
      }
    }, 3000);
  };

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (video) {
        setCurrentTime(video.currentTime);
        // Debug log for time updates
        if (Math.floor(video.currentTime) % 5 === 0) { // Log every 5 seconds to avoid flooding
          console.log(`Video time updated: ${video.currentTime.toFixed(2)}s (type: ${typeof video.currentTime})`);
        }
      }
    };

    const handleLoadedMetadata = () => {
      if (video) {
        setDuration(video.duration);
        console.log(`Video duration loaded: ${video.duration}s`);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      console.log('Video started playing');
    };

    const handlePause = () => {
      setIsPlaying(false);
      console.log('Video paused');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
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

  const togglePlay = () => {
    console.log('Toggle play called, current state:', isPlaying);
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
    console.log('Volume changed to:', newVolume);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    console.log('Toggle mute called, current state:', isMuted);
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
    
    console.log('Seek to time:', time);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleFullscreen = () => {
    console.log('Toggle fullscreen called, current state:', isFullscreen);
    if (playerContainerRef.current) {
      if (isFullscreen) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
      }
    }
  };

  const handlePlaybackSpeed = (speed: number) => {
    console.log('Playback speed changed to:', speed);
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      const newTime = videoRef.current.currentTime + seconds;
      console.log(`Skipping ${seconds}s, new time: ${newTime}s`);
      videoRef.current.currentTime = Math.max(0, Math.min(newTime, duration));
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleQuizAnswer = useCallback(async (isCorrect: boolean) => {
    if (!user || !activeQuestion) return;

    console.log(`Quiz answered: ${isCorrect ? 'correct' : 'incorrect'}`);
    try {
      // Guardar el resultado del quiz
      const { error } = await supabase
        .from('quiz_results')
        .insert({
          user_id: user.id,
          video_id: videoId,
          question_id: activeQuestion.id,
          is_correct: isCorrect,
          timestamp: new Date().toISOString(),
          points_earned: isCorrect ? 10 : 0,
          // Agregar campos faltantes del esquema quiz_results
          score: isCorrect ? 100 : 0,
          total_questions: 1
        });

      if (error) throw error;

      // Actualizar el progreso del usuario
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          video_id: videoId,
          last_question_id: activeQuestion.id,
          last_question_correct: isCorrect,
          last_interaction: new Date().toISOString(),
          total_points: isCorrect ? 10 : 0
        }, {
          onConflict: 'user_id,video_id'
        });

      if (progressError) throw progressError;

      console.log('Quiz result saved successfully');
    } catch (error) {
      console.error('Error saving quiz result:', error);
      // Aquí podríamos mostrar un mensaje de error al usuario si lo deseamos
    } finally {
      // Limpiar la pregunta activa y continuar el video
      setActiveQuestion(null);
      if (videoRef.current) videoRef.current.play();
    }
  }, [user, videoId, activeQuestion]);

  return (
    <div 
      ref={playerContainerRef}
      className="max-w-4xl mx-auto bg-black overflow-hidden pb-20 relative group"
      onMouseMove={showControls}
      onMouseLeave={() => {
        if (isPlaying) {
          // Controls will be hidden by CSS
        }
      }}
    >
      {showOnboarding && <VideoOnboarding onComplete={() => setShowOnboarding(false)} />}
      <div className="relative aspect-video">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
              <p className="text-white text-sm">Loading video...</p>
            </div>
          </div>
        )}

        {/* Video */}
        {videoData && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            playsInline
            onError={(e) => {
              console.error('Video loading error:', e);
              setError('Failed to load video. Please try again later.');
            }}
            poster={videoData.thumbnail_url}
            controls={false}
            preload="auto"
            crossOrigin="anonymous"
            src={videoData.url}
          >
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Error Message Overlay */}
        {error && (
          <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-white z-20">
            <div className="text-center">
              <p className="text-lg">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  loadVideoData();
                }}
                className="mt-4 px-4 py-2 bg-purple-600 rounded-full text-sm hover:bg-purple-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Active Quiz Question Overlay */}
        {(() => { console.log('Rendering VideoQuiz because activeQuestion is:', activeQuestion); return null; })()}
        {activeQuestion && (
          <VideoQuiz
            question={{
              ...activeQuestion,
              correctAnswer: activeQuestion.correct_answer
            }}
            onAnswer={handleQuizAnswer}
            onClose={() => {
              setActiveQuestion(null);
              if (videoRef.current) videoRef.current.play();
            }}
          />
        )}

        {/* Video Controls */}
        {!isLoading && !error && (
          <VideoControls
            isPlaying={isPlaying}
            isMuted={isMuted}
            currentTime={currentTime}
            duration={duration}
            playbackSpeed={playbackSpeed}
            showSubtitles={showSubtitles}
            volume={volume}
            onPlayPause={togglePlay}
            onMute={toggleMute}
            onVolumeChange={handleVolumeChange}
            onSeek={handleSeek}
            onSkip={handleSkip}
            onSpeedChange={handlePlaybackSpeed}
            onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
            onFullscreen={handleFullscreen}
          />
        )}
      </div>
    </div>
  );
}