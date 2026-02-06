import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Lock, Music4 } from 'lucide-react';
import { useState, useRef } from 'react';
import { spoilers } from '@/data/artists';
import { LogoImage } from '@/components/Logo';

export function SpoilerPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  const handlePlayPause = (id: string, locked?: boolean) => {
    if (locked) return;

    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (key !== id && !video.paused) {
        video.pause();
      }
    });

    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play().then(() => setPlayingId(id));
        const updateProgress = () => {
          if (video && !video.paused && playingId === id) {
            setProgress(prev => ({ ...prev, [id]: video.currentTime / video.duration }));
            requestAnimationFrame(updateProgress);
          }
        };
        requestAnimationFrame(updateProgress);
      } else {
        video.pause();
        setPlayingId(null);
      }
    }
  };

  const handleLoadedMetadata = (_id: string) => {
    // Durations non needed for current functionality
  };

  const handleTimeUpdate = (id: string) => {
    if (playingId === id) {
      const video = videoRefs.current[id];
      if (video) {
        setProgress(prev => ({ ...prev, [id]: video.currentTime / video.duration }));
      }
    }
  };

  const groupedSpoilers = spoilers.reduce((acc, spoiler) => {
    if (!acc[spoiler.artist]) {
      acc[spoiler.artist] = [];
    }
    acc[spoiler.artist].push(spoiler);
    return acc;
  }, {} as Record<string, typeof spoilers>);

  // Varianti per animazioni
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 } as const,
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-white/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Logo - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <LogoImage size="md" />
        </motion.div>

        {/* Header - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6">
            <Music4 className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
            <span className="text-white/60 text-xs sm:text-sm font-medium tracking-wide uppercase">
              Anteprime Esclusive
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight mb-4 sm:mb-6 px-2">
            Spoiler
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl mx-auto px-4">
            Un assaggio di ciò che sta arrivando
          </p>
        </motion.div>

        {/* Decorative line - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-20"
        >
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-white/20" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-400" />
          <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>

        {/* Spoilers by Artist - ottimizzato mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12 sm:space-y-16 md:space-y-20"
        >
          {Object.entries(groupedSpoilers).map(([artistName, artistSpoilers], artistIndex) => (
            <motion.div
              key={artistName}
              variants={itemVariants}
              className="relative"
            >
              {/* Artist Header - ottimizzato mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: artistIndex * 0.15 }}
                className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                  <span className="text-white font-bold text-lg sm:text-xl">
                    {artistName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{artistName}</h2>
                  <p className="text-white/40 text-xs sm:text-sm">{artistSpoilers.length} {artistSpoilers.length === 1 ? 'brano' : 'brani'}</p>
                </div>
                <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </motion.div>

              {/* Spoiler Cards - ottimizzato mobile */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {artistSpoilers.map((spoiler, index) => (
                  <motion.div
                    key={spoiler.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: artistIndex * 0.1 + index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group relative"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                    <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-300">
                      {spoiler.locked ? (
                        // Locked State
                        <div className="aspect-video bg-gradient-to-br from-white/5 to-white/[0.02] flex flex-col items-center justify-center p-8">
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10"
                          >
                            <Lock className="w-7 h-7 text-white/30" />
                          </motion.div>
                          <h3 className="text-white/70 font-semibold text-lg mb-2">
                            {spoiler.title}
                          </h3>
                          <p className="text-white/30 text-sm">
                            In arrivo
                          </p>
                        </div>
                      ) : (
                        // Video Player
                        <div className="relative aspect-video bg-black">
                          <video
                            ref={(el) => {
                              if (el) videoRefs.current[spoiler.id] = el;
                            }}
                            src={spoiler.videoFile}
                            className="w-full h-full object-cover"
                            onEnded={() => {
                              setPlayingId(null);
                              setProgress(prev => ({ ...prev, [spoiler.id]: 0 }));
                            }}
                            onLoadedMetadata={() => handleLoadedMetadata(spoiler.id)}
                            onTimeUpdate={() => handleTimeUpdate(spoiler.id)}
                            playsInline
                            muted={muted}
                          />

                          {/* Gradient overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
                              playingId === spoiler.id ? 'opacity-0' : 'opacity-100'
                            }`}
                          />

                          {/* Play/Pause button */}
                          <div
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                              playingId === spoiler.id ? 'opacity-0' : 'opacity-100'
                            }`}
                          >
                            <motion.button
                              onClick={() => handlePlayPause(spoiler.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative"
                            >
                              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
                              <div className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-white group-hover:border-white transition-all">
                                {playingId === spoiler.id ? (
                                  <Pause className="w-8 h-8 text-white group-hover:text-black" />
                                ) : (
                                  <Play className="w-8 h-8 text-white ml-1 group-hover:text-black" />
                                )}
                              </div>
                            </motion.button>
                          </div>

                          {/* Progress bar */}
                          {playingId === spoiler.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute bottom-0 left-0 right-0 p-4"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-orange-400 to-orange-500"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${(progress[spoiler.id] || 0) * 100}%` }}
                                    transition={{ duration: 0.1 }}
                                  />
                                </div>
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => setMuted(!muted)}
                                  className="p-2 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                                >
                                  {muted ? (
                                    <VolumeX className="w-4 h-4" />
                                  ) : (
                                    <Volume2 className="w-4 h-4" />
                                  )}
                                </motion.button>
                              </div>
                            </motion.div>
                          )}

                          {/* Playing indicator */}
                          {playingId === spoiler.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange-500/90 backdrop-blur-sm"
                            >
                              <span className="text-white text-xs font-medium flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                </span>
                                In riproduzione
                              </span>
                            </motion.div>
                          )}
                        </div>
                      )}

                      {/* Info section */}
                      <div className="p-6">
                        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-orange-400 transition-colors">
                          {spoiler.title}
                        </h3>
                        <p className="text-white/40 text-sm">{spoiler.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 sm:mt-20 md:mt-24 text-center"
        >
          <p className="text-white/30 text-xs sm:text-sm">
            Altri spoiler in arrivo...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
