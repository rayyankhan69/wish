import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Repeat, Music } from 'lucide-react';

import voice1 from '../../assets/voices/WhatsApp Audio 2026-03-20 at 01.49.46.opus';
import voice2 from '../../assets/voices/WhatsApp Audio 2026-03-20 at 02.56.47.opus';

interface AudioPlayerProps {
  src: string;
  label: string;
  index: number;
  isVisible: boolean;
  onRequestPlay?: () => void;
  onPlayingChange?: (playerId: string, isPlaying: boolean) => void;
}

function AudioPlayer({ src, label, index, isVisible, onRequestPlay, onPlayingChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      onRequestPlay?.();
      void audio.play();
    }
  }, [isPlaying, onRequestPlay]);

  const toggleLoop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = !isLooping;
    setIsLooping(!isLooping);
  }, [isLooping]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      if (!audio.loop) setIsPlaying(false);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  useEffect(() => {
    onPlayingChange?.(src, isPlaying);
  }, [isPlaying, onPlayingChange, src]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
  };

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate waveform bar heights
  const bars = Array.from({ length: 32 }, (_, i) => {
    const base = Math.sin(i * 0.4) * 0.5 + 0.5;
    return 20 + base * 60;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.4 + index * 0.3, ease: 'easeOut' }}
      className="relative w-full max-w-md mx-auto"
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,228,235,0.35) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255,182,193,0.5)',
          boxShadow: isPlaying
            ? '0 8px 40px rgba(255,105,180,0.35), 0 0 60px rgba(255,182,193,0.2)'
            : '0 8px 32px rgba(255,105,180,0.15)',
          transition: 'box-shadow 0.5s ease',
        }}
        className="rounded-2xl p-6 space-y-4"
      >
        {/* Label */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={isPlaying ? { rotate: [0, 360] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FF69B4, #FF1493)',
              boxShadow: '0 4px 15px rgba(255,105,180,0.4)',
            }}
          >
            <Music className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <p className="text-pink-900 font-semibold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              {label}
            </p>
            <p className="text-pink-600 text-xs opacity-80">Voice Message 💌</p>
          </div>
        </div>

        {/* Waveform visualization */}
        <div className="flex items-end justify-center gap-[2px] h-16 px-2">
          {bars.map((height, i) => {
            const barProgress = (i / bars.length) * 100;
            const isPast = barProgress <= progress;
            return (
              <motion.div
                key={i}
                className="w-[3px] rounded-full"
                style={{
                  height: `${height}%`,
                  background: isPast
                    ? 'linear-gradient(180deg, #FF69B4, #FF1493)'
                    : 'rgba(255,182,193,0.4)',
                  transition: 'background 0.3s ease',
                }}
                animate={
                  isPlaying
                    ? {
                        scaleY: [1, 0.4 + Math.random() * 0.8, 1],
                      }
                    : { scaleY: 1 }
                }
                transition={{
                  duration: 0.4 + Math.random() * 0.3,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.02,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-1.5 bg-pink-200/50 rounded-full cursor-pointer overflow-hidden"
          onClick={handleSeek}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #FF69B4, #FF1493)',
            }}
            layout
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <span className="text-pink-700 text-xs font-mono">{formatTime(currentTime)}</span>

          <div className="flex items-center gap-4">
            {/* Loop toggle */}
            <motion.button
              onClick={toggleLoop}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full transition-all"
              style={{
                background: isLooping
                  ? 'linear-gradient(135deg, #FF69B4, #FF1493)'
                  : 'rgba(255,182,193,0.3)',
                boxShadow: isLooping ? '0 4px 15px rgba(255,105,180,0.4)' : 'none',
              }}
            >
              <Repeat className={`w-4 h-4 ${isLooping ? 'text-white' : 'text-pink-600'}`} />
            </motion.button>

            {/* Play/Pause */}
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-4 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #FF69B4, #FF1493)',
                boxShadow: '0 6px 25px rgba(255,105,180,0.5)',
              }}
            >
              {/* Pulse ring when playing */}
              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: '2px solid rgba(255,105,180,0.6)' }}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white relative z-10" />
              ) : (
                <Play className="w-5 h-5 text-white relative z-10 ml-0.5" />
              )}
            </motion.button>
          </div>

          <span className="text-pink-700 text-xs font-mono">
            {duration ? formatTime(duration) : '--:--'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface VoiceMessageSectionProps {
  onAnyVoicePlayingChange?: (isPlaying: boolean) => void;
  onVoicePlayRequest?: () => void;
  onVoiceStop?: () => void;
}

export function VoiceMessageSection({
  onAnyVoicePlayingChange,
  onVoicePlayRequest,
  onVoiceStop,
}: VoiceMessageSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const playingIdsRef = useRef<Set<string>>(new Set());
  const wasAnyPlayingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePlayingChange = useCallback(
    (playerId: string, playing: boolean) => {
      const set = playingIdsRef.current;

      if (playing) set.add(playerId);
      else set.delete(playerId);

      const anyPlaying = set.size > 0;
      onAnyVoicePlayingChange?.(anyPlaying);

      if (wasAnyPlayingRef.current && !anyPlaying) {
        onVoiceStop?.();
      }

      wasAnyPlayingRef.current = anyPlaying;
    },
    [onAnyVoicePlayingChange, onVoiceStop]
  );

  // Floating musical notes
  const floatingNotes = ['🎵', '🎶', '💕', '🎧', '🎤', '💖', '✨', '🎵', '🎶', '💗'];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFC0CB 0%, #FFB6C1 30%, #FFF0F5 60%, #FFDEE9 100%)',
      }}
    >
      {/* Floating music notes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingNotes.map((note, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-4xl"
            style={{
              left: `${8 + (i * 9) % 85}%`,
              top: `${110}%`,
            }}
            animate={{
              y: [0, -(window.innerHeight + 200)],
              x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 80],
              rotate: [0, 360],
              scale: [0.7, 1.1, 0.8],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'linear',
            }}
          >
            {note}
          </motion.div>
        ))}
      </div>

      {/* Animated glow circles */}
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #FF69B4 0%, transparent 70%)',
          top: '10%',
          left: '5%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #FFB6C1 0%, transparent 70%)',
          bottom: '5%',
          right: '0%',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Heading */}
      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          className="text-5xl md:text-6xl mb-4"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎧
        </motion.div>

        <h2
          className="text-3xl md:text-5xl font-bold mb-3"
          style={{
            fontFamily: 'Georgia, serif',
            background: 'linear-gradient(135deg, #831843, #FF1493, #FF69B4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Wanna hear something special? 🎧 | From your Rayyan
        </h2>

        <motion.p
          className="text-pink-700 text-lg md:text-xl opacity-80"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.8 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Press play… aur sirf suno nahi, feel karo 💖 kyun ke har lafz dil se hai
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mx-auto mt-6 h-0.5 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #FF69B4, transparent)',
            width: 0,
          }}
          animate={isVisible ? { width: 200 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
        />
      </motion.div>

      {/* Audio Players */}
      <div className="relative z-10 w-full flex flex-col items-center gap-8 max-w-lg">
        <AudioPlayer
          src={voice1}
          label="From your Rayyan 🎀"
          index={0}
          isVisible={isVisible}
          onRequestPlay={onVoicePlayRequest}
          onPlayingChange={handlePlayingChange}
        />
        <AudioPlayer
          src={voice2}
          label="From your Rayyan 💫"
          index={1}
          isVisible={isVisible}
          onRequestPlay={onVoicePlayRequest}
          onPlayingChange={handlePlayingChange}
        />
      </div>

      {/* Bottom decorative text */}
      <motion.p
        className="relative z-10 mt-14 text-pink-800 text-lg md:text-xl text-center"
        style={{ fontFamily: 'Georgia, serif' }}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 0.7, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        Kuch awaazein aisi hoti hain jo kabhi bore nahi karti… aur shayad yeh un mein se ek ho 🥹✨
      </motion.p>
    </section>
  );
}
