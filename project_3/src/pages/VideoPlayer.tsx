import { useState, useRef, useEffect, useCallback } from 'react';
import { VideoOnboarding } from '../components/VideoOnboarding';
import { VideoQuiz } from '../components/VideoQuiz';
import { VideoBinaryChoice } from '../components/VideoBinaryChoice';
import { VideoControls } from '../components/VideoControls';
import type { VideoQuestion } from '../lib/types';
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
  const [activeBinaryChoice, setActiveBinaryChoice] = useState<VideoQuestion | null>(null);
  const [lastShownQuestionId, setLastShownQuestionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('videoOnboardingComplete');
  });
  const [pausedTimestamp, setPausedTimestamp] = useState<number | null>(null);

  // Player container ref for fullscreen
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Type guard functions
  const isVideoQuestion = (q: unknown): q is VideoQuestion => {
    return (
      q !== null &&
      typeof q === 'object' &&
      'id' in q &&
      'timestamp' in q &&
      'options' in q && 
      'correct_answer' in q &&
      typeof (q as VideoQuestion).id === 'string' &&
      typeof (q as VideoQuestion).timestamp === 'number'
    );
  };
  
  // Helper for safely accessing VideoQuestion properties
  const getQuestionId = (question: VideoQuestion | null): string | 'none' => {
    if (question && 'id' in question) {
      return question.id;
    }
    return 'none';
  };

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
        setQuestions(questions?.filter(isVideoQuestion) || []);
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
    if (activeQuestion || activeBinaryChoice) return;

    // Debug logs before finding a question
    console.log(`---------- QUESTION CHECK STATE ----------`);
    console.log(`Current time: ${currentTime.toFixed(2)}s`);
    console.log(`Questions count: ${questions.length}`);
    console.log(`Questions timestamps: ${questions.map(q => q.timestamp).join(', ')}`);
    console.log(`Is playing: ${isPlaying}`);
    console.log(`Active question: ${getQuestionId(activeQuestion)}`);
    console.log(`Active binary choice: ${getQuestionId(activeBinaryChoice)}`);
    console.log(`Last shown question ID: ${lastShownQuestionId}`);

    // Find a question to show
    const question = questions.find(q => {
      const timeDiff = Math.abs(q.timestamp - currentTime);
      // Log each question comparison
      console.log(`Question ${q.id}: timestamp=${q.timestamp}s, currentTime=${currentTime.toFixed(2)}s, diff=${timeDiff.toFixed(2)}s, would match=${timeDiff < 1.5}, lastShown=${q.id === lastShownQuestionId}`);
      return timeDiff < 1.5 && q.id !== lastShownQuestionId;
    });

    if (question) {
      console.log('FOUND MATCHING QUESTION:', question);
      
      if (question.type === 'paused') {
        console.log('Will call setActiveQuestion with:', question);
        setActiveQuestion(question);
        console.log('Setting active question and pausing video');
        if (videoRef.current) videoRef.current.pause();
      } else if (question.type === 'binary') {
        console.log('Will call setActiveBinaryChoice with:', question);
        setActiveBinaryChoice(question);
        console.log('Setting active binary choice without pausing video');
        // Don't pause for binary choice questions
      }
      
      setLastShownQuestionId(question.id);
    }
  }, [currentTime, questions, isPlaying, activeQuestion, activeBinaryChoice, lastShownQuestionId]);

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

  // Initial mount check
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log('[Mount Check] videoRef is not ready on initial mount');
      return;
    }

    console.log('[Mount Check] Initial video element state:', {
      src: video.src,
      readyState: video.readyState,
      currentTime: video.currentTime,
      duration: video.duration,
      networkState: video.networkState,
      error: video.error,
      paused: video.paused,
      ended: video.ended,
      seeking: video.seeking,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight
    });
  }, []); // Empty dependency array - runs only on mount

  // Monitor video element readiness and source changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log('[Video Monitor] videoRef is not ready yet');
      return;
    }

    console.log('[Video Monitor] Video element state:', {
      src: video.src,
      readyState: video.readyState,
      currentTime: video.currentTime,
      duration: video.duration,
      networkState: video.networkState,
      error: video.error,
      paused: video.paused,
      ended: video.ended,
      seeking: video.seeking,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight
    });

    // Check if video is already loaded
    if (video.readyState >= 2) { // HAVE_CURRENT_DATA
      console.log('[Video Monitor] Video already has data, triggering loadedmetadata handler');
      const event = new Event('loadedmetadata');
      video.dispatchEvent(event);
    }

    // Check if video is already playing
    if (!video.paused) {
      console.log('[Video Monitor] Video is already playing, triggering play handler');
      const event = new Event('play');
      video.dispatchEvent(event);
    }
  }, [videoData?.url]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log('[Video Init] videoRef is not ready yet');
      return;
    }

    console.log('[Video Init] Setting up event listeners for video element:', {
      src: video.src,
      readyState: video.readyState,
      currentTime: video.currentTime,
      duration: video.duration
    });

    const handleTimeUpdate = () => {
      if (video) {
        const newTime = video.currentTime;
        console.log('[Video Event] timeupdate - Time updated:', {
          currentTime: newTime,
          duration: video.duration,
          readyState: video.readyState,
          paused: video.paused
        });
        setCurrentTime(newTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (video) {
        const videoDuration = video.duration;
        console.log('[Video Event] loadedmetadata - Duration loaded:', {
          duration: videoDuration,
          readyState: video.readyState,
          videoElement: video
        });
        setDuration(videoDuration);
      }
    };

    const handleEnded = () => {
      console.log('[Video Event] ended - Video playback completed');
      setIsPlaying(false);
    };

    const handlePlay = () => {
      console.log('[Video Event] play - Video started playing:', {
        currentTime: video?.currentTime,
        duration: video?.duration,
        readyState: video?.readyState
      });
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('[Video Event] pause - Video paused:', {
        currentTime: video?.currentTime,
        duration: video?.duration,
        readyState: video?.readyState
      });
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      const videoError = (e.target as HTMLVideoElement).error;
      console.error('[Video Event] error - Video error occurred:', {
        code: videoError?.code,
        message: videoError?.message,
        videoState: {
          currentTime: video?.currentTime,
          duration: video?.duration,
          readyState: video?.readyState,
          networkState: video?.networkState
        }
      });
      setError(`Error loading video: ${videoError?.message || 'Unknown error'}`);
    };

    const handleLoadedData = () => {
      console.log('[Video Event] loadeddata - Video data is loaded, readyState:', video.readyState);
    };

    const handleWaiting = () => {
      console.log('[Video Event] waiting - Video is waiting for more data');
    };

    const handleCanPlay = () => {
      console.log('[Video Event] canplay - Video can start playing, readyState:', video.readyState);
    };

    const handleCanPlayThrough = () => {
      console.log('[Video Event] canplaythrough - Video can play through without stopping, readyState:', video.readyState);
    };

    // Add all event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);

    // Log initial video state
    console.log('[Video Init] Initial video state:', {
      currentTime: video.currentTime,
      duration: video.duration,
      readyState: video.readyState,
      paused: video.paused,
      ended: video.ended,
      networkState: video.networkState,
      src: video.src
    });

    // Cleanup function
    return () => {
      console.log('[Video Cleanup] Removing event listeners');
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [videoData?.url]); // Add videoData.url as dependency to re-attach listeners when video source changes

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
    console.log('[Control] Toggle play called:', {
      currentState: {
        isPlaying,
        currentTime: videoRef.current?.currentTime,
        duration: videoRef.current?.duration,
        readyState: videoRef.current?.readyState
      }
    });

    if (videoRef.current) {
      console.log('[Control] videoRef exists, attempting to play/pause');
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error('[Control] Error playing video:', {
            error,
            videoState: {
              currentTime: videoRef.current?.currentTime,
              duration: videoRef.current?.duration,
              readyState: videoRef.current?.readyState
            }
          });
          setIsPlaying(false);
        });
      }
    } else {
      console.error('[Control] videoRef is null!');
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
    console.log('[Control] Seek called:', {
      targetTime: time,
      currentState: {
        currentTime: videoRef.current?.currentTime,
        duration: videoRef.current?.duration,
        readyState: videoRef.current?.readyState
      }
    });

    if (isNaN(time)) {
      console.error('[Control] Invalid seek time:', time);
      return;
    }

    if (videoRef.current) {
      console.log('[Control] Setting video time to:', time);
      videoRef.current.currentTime = time;
    } else {
      console.error('[Control] videoRef is null during seek!');
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

  // Add a handler for video buffering to adjust binary choice timers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleBuffering = () => {
      // If there's a binary choice active when buffering starts, record the timestamp
      if (activeBinaryChoice) {
        setPausedTimestamp(Date.now());
        console.log('[Video Event] video buffering, recording timestamp for binary choice timer adjustment');
      }
    };
    
    const handlePlaying = () => {
      // When video resumes, adjust the timer if needed
      if (activeBinaryChoice && pausedTimestamp) {
        // We would typically use this to adjust the timer in the binary choice component
        console.log('[Video Event] video resumed playing, binary choice timer can be adjusted');
        setPausedTimestamp(null);
      }
    };
    
    video.addEventListener('waiting', handleBuffering);
    video.addEventListener('playing', handlePlaying);
    
    return () => {
      video.removeEventListener('waiting', handleBuffering);
      video.removeEventListener('playing', handlePlaying);
    };
  }, [activeBinaryChoice, pausedTimestamp]);

  const handleQuizAnswer = useCallback(async (isCorrect: boolean) => {
    if (!user) return;
    
    // Crear una variable local unificada
    const currentQuestion = activeQuestion || activeBinaryChoice;
    
    // Si no hay pregunta activa, no hacemos nada
    if (!currentQuestion || !isVideoQuestion(currentQuestion)) return;

    const questionId = currentQuestion.id;
    
    console.log(`Quiz answered: ${isCorrect ? 'correct' : 'incorrect'}`);
    try {
      // First, save the quiz result
      const { error } = await supabase
        .from('quiz_results')
        .insert({
          user_id: user.id,
          video_id: videoId,
          question_id: questionId,
          score: isCorrect ? 100 : 0,
          total_questions: 1,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      // Also save the response in the new question_responses table
      // This uses the recently added table to track more detailed response data
      const responseData = {
        user_id: user.id,
        question_id: questionId,
        video_id: parseInt(videoId),
        selected_option: isCorrect ? currentQuestion.correct_answer : -1,
        response_time: null, // Podríamos calcular el tiempo de respuesta si lo necesitamos
        is_correct: isCorrect,
        created_at: new Date().toISOString()
      };

      const { error: responseError } = await supabase
        .from('question_responses')
        .insert(responseData);

      if (responseError) {
        console.error('Error saving question response:', responseError);
      }

      // Then, get current user progress to accumulate points
      const { data: currentProgress, error: progressFetchError } = await supabase
        .from('user_progress')
        .select('total_points')
        .eq('user_id', user.id)
        .eq('video_id', videoId)
        .single();

      if (progressFetchError && progressFetchError.code !== 'PGRST116') { // PGRST116 is "not found"
        throw progressFetchError;
      }

      const currentPoints = currentProgress?.total_points || 0;
      
      // Get points from the question or use default value
      // Use nullish coalescing to handle undefined or null values
      const pointsValue = (
        currentQuestion.points ?? 
        (activeQuestion?.points ?? activeBinaryChoice?.points) ?? 
        10
      );
      
      const newPoints = currentPoints + (isCorrect ? pointsValue : 0);

      // Update user progress with accumulated points
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          video_id: videoId,
          last_question_id: questionId,
          last_question_correct: isCorrect,
          last_interaction: new Date().toISOString(),
          total_points: newPoints
        }, {
          onConflict: 'user_id,video_id'
        });

      if (progressError) throw progressError;

      console.log('Quiz result saved successfully');
    } catch (error) {
      console.error('Error saving quiz result:', error);
      // Here we could show an error message to the user if desired
    } finally {
      // Clear the active question and continue the video
      if (activeQuestion) {
        setActiveQuestion(null);
        if (videoRef.current) videoRef.current.play();
      } else if (activeBinaryChoice) {
        setActiveBinaryChoice(null);
        // Binary choice doesn't pause video, so no need to call play
      }
    }
  }, [user, videoId, activeQuestion, activeBinaryChoice]);

  // Función mejorada para verificar si una pregunta tiene pause_on_interaction
  const hasPauseOnInteraction = (question: VideoQuestion | null): boolean => {
    if (!question) return false;
    
    // Si la propiedad está explícitamente definida, usa ese valor
    if ('pause_on_interaction' in question && question.pause_on_interaction !== undefined) {
      return question.pause_on_interaction;
    }
    
    // Valor por defecto: true para preguntas paused, false para binary
    return question.type === 'paused';
  };

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
              id: activeQuestion.id,
              question: activeQuestion.question,
              options: activeQuestion.options,
              correctAnswer: activeQuestion.correct_answer,
              type: activeQuestion.type as 'paused' | 'binary',
              points: activeQuestion.points,
              time_limit: activeQuestion.time_limit,
              feedback: activeQuestion.feedback
            }}
            onAnswer={handleQuizAnswer}
            onClose={() => {
              setActiveQuestion(null);
              if (videoRef.current) videoRef.current.play();
            }}
            points={activeQuestion.points}
            timeLimit={activeQuestion.time_limit}
          />
        )}

        {/* Active Binary Choice Overlay */}
        {activeBinaryChoice && (
          <VideoBinaryChoice
            choice={{
              id: activeBinaryChoice.id,
              question: activeBinaryChoice.question,
              options: activeBinaryChoice.options,
              correctAnswer: activeBinaryChoice.correct_answer,
              time_limit: activeBinaryChoice.time_limit,
              points: activeBinaryChoice.points
            }}
            onAnswer={handleQuizAnswer}
            onClose={() => setActiveBinaryChoice(null)}
            pausedTimestamp={pausedTimestamp}
            onExpand={hasPauseOnInteraction(activeBinaryChoice) ? () => {
              if (videoRef.current) videoRef.current.pause();
            } : undefined}
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
            isFullscreen={isFullscreen}
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