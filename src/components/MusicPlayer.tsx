import { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Soothing premium wedding piano track (Royalty-free romantic piano ambient)
  const musicUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

  useEffect(() => {
    // Lazy initialize the Audio element to prevent startup issues
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback blocked by browser autocomplete/interaction policy:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="flex items-center gap-2 bg-[#F8F3EA]/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-light-pink/50 text-xs text-text-headings font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-accent animate-pulse" />
            <span>Мелодия любви...</span>
            <div className="flex items-center gap-1 bg-secondary-bg/55 px-1.5 py-0.5 rounded-full border border-light-pink/30">
              <button
                onClick={toggleMute}
                className="hover:text-primary-accent transition-colors"
                title={isMuted ? "Включить звук" : "Выключить звук"}
              >
                {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-12 h-1 accent-primary-accent rounded-lg cursor-pointer appearance-none bg-light-pink"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="music-toggle-btn"
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border relative transition-all duration-300 ${
          isPlaying
            ? 'bg-light-pink border-primary-accent/40 text-text-headings'
            : 'bg-[#F4E8E8] border-light-pink/40 text-text-secondary'
        }`}
        title={isPlaying ? "Поставить на паузу" : "Включить музыку"}
      >
        {/* Subtle music note visualizer dots */}
        {isPlaying && (
          <>
            <span className="absolute top-1 left-2 w-1 h-1 rounded-full bg-primary-accent animate-bounce delay-100" />
            <span className="absolute top-2 right-1.5 w-1 h-1 rounded-full bg-light-pink animate-bounce delay-300" />
            <span className="absolute bottom-2 left-1.5 w-1 h-1 rounded-full bg-primary-accent animate-bounce delay-500" />
          </>
        )}

        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="flex items-center justify-center"
        >
          {isPlaying ? <Music size={20} className="text-primary-accent" /> : <Music size={20} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
