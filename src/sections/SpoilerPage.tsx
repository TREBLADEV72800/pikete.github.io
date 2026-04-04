import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Lock, Music4 } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { spoilers } from '@/data/artists';

export function SpoilerPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({});
  const rafRef = useRef<number | null>(null);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const stopAllVideos = useCallback((exceptId?: string) => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (key !== exceptId && !video.paused) {
        video.pause();
      }
    });
  }, []);

  const handlePlayPause = useCallback((id: string, locked?: boolean) => {
    if (locked) return;

    // Pause all other videos
    stopAllVideos(id);

    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) {
      video.volume = 0.7;
      video.play().then(() => {
        setPlayingId(id);
      }).catch(() => {
        // Play was prevented (autoplay policy etc.)
      });
    } else {
      video.pause();
      setPlayingId(null);
    }
  }, [stopAllVideos]);

  const handleTimeUpdate = useCallback((id: string) => {
    const video = videoRefs.current[id];
    if (video && !video.paused) {
      setProgress(prev => ({ ...prev, [id]: video.currentTime / video.duration }));
    }
  }, []);

  const handleVideoEnded = useCallback((id: string) => {
    setPlayingId(null);
    setProgress(prev => ({ ...prev, [id]: 0 }));
  }, []);





  return (
    <section className="min-h-screen pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-5xl mx-auto">
        
        {/* Header - Aligned with ArtistsPage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <Music4 className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-white/60 text-xs font-bold tracking-widest uppercase">
              Anteprime
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-3 leading-none">
            Spoiler.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/50 font-medium tracking-tight">
            Un assaggio di ciò che sta arrivando.
          </p>
        </motion.div>

        {/* Spoilers List */}
        <div className="flex flex-col gap-8 sm:gap-12">
          {spoilers.map((spoiler) => (
            <motion.div 
              key={spoiler.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 group"
            >
              
              {/* Artist and Info (Left) */}
              <div className="w-full md:w-5/12 flex flex-col justify-center text-center md:text-left order-1 md:order-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-3 sm:mb-4">
                  {spoiler.artist}
                </h2>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 transition-colors">
                    {spoiler.title}
                  </h3>

                  {!spoiler.locked && playingId === spoiler.id && (
                    <button
                      onClick={() => setMuted(!muted)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 outline-none"
                      aria-label={muted ? 'Attiva audio' : 'Disattiva audio'}
                    >
                      {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">{muted ? 'Audio Off' : 'Audio On'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Player (Right) */}
              <div className="w-full md:w-7/12 order-2 md:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/5 group-hover:border-orange-500/30 transition-all duration-500 shadow-xl group-hover:shadow-orange-500/10">
                    
                    {spoiler.locked ? (
                      <div className="aspect-video bg-black/50 flex flex-col items-center justify-center p-6">
                        <Lock className="w-6 h-6 text-white/30 mb-3" />
                        <h3 className="text-white/50 font-bold text-base tracking-tight">
                          In arrivo
                        </h3>
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => handlePlayPause(spoiler.id)}>
                        <video
                          ref={(el) => { if (el) videoRefs.current[spoiler.id] = el; }}
                          src={spoiler.videoFile}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                          onEnded={() => handleVideoEnded(spoiler.id)}
                          onTimeUpdate={() => handleTimeUpdate(spoiler.id)}
                          onPause={() => { if (playingId === spoiler.id) setPlayingId(null); }}
                          playsInline
                          muted={muted}
                          preload="metadata"
                        />
                        
                        {/* Inner Shadow / Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${playingId === spoiler.id ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`} />

                        {/* Play/Pause Button Overlay */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playingId === spoiler.id ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-500 outline-none group-hover:scale-110">
                            {playingId === spoiler.id ? (
                              <Pause className="w-8 h-8 fill-current" />
                            ) : (
                              <Play className="w-8 h-8 ml-1 fill-current" />
                            )}
                          </div>
                        </div>

                        {/* Progress Line */}
                        {playingId === spoiler.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                            <motion.div
                              className="h-full bg-orange-500"
                              style={{ width: `${(progress[spoiler.id] || 0) * 100}%` }}
                            />
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        {playingId === spoiler.id && (
                          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Playing</span>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                </motion.div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-16 sm:mt-20 text-center pb-6">
          <p className="text-white/30 text-xs sm:text-sm font-bold uppercase tracking-widest">
            Altre produzioni in corso...
          </p>
        </div>
      </div>
    </section>
  );
}
