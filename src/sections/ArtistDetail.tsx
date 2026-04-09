import { motion } from 'framer-motion';
import type { Artist, Page } from '@/types';
import {
  ArrowLeft,
  Instagram,
  Youtube,
  Lock,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useState, useRef, useCallback } from 'react';

interface ArtistDetailProps {
  artist: Artist;
  onNavigate: (page: Page, artistId?: string) => void;
}

// Custom SVG icons for platforms not in lucide
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className || 'w-5 h-5'} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className || 'w-5 h-5'} viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className || 'w-5 h-5'} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

export function ArtistDetail({ artist, onNavigate }: ArtistDetailProps) {
  const handleBack = () => onNavigate('artists');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.volume = 0.7;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime / videoRef.current.duration);
    }
  }, []);

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
  }, []);

  // Available social links - only show those that exist
  const socialLinks = [
    { icon: SpotifyIcon, label: 'Spotify', url: artist.socialLinks.spotify, ariaLabel: `Spotify di ${artist.name}` },
    { icon: AppleIcon, label: 'Apple Music', url: artist.socialLinks.appleMusic, ariaLabel: `Apple Music di ${artist.name}` },
    { icon: Youtube, label: 'YouTube', url: artist.socialLinks.youtube, ariaLabel: `YouTube di ${artist.name}` },
    { icon: Instagram, label: 'Instagram', url: artist.socialLinks.instagram, ariaLabel: `Instagram di ${artist.name}` },
    { icon: TikTokIcon, label: 'TikTok', url: artist.socialLinks.tiktok, ariaLabel: `TikTok di ${artist.name}` },
  ].filter(s => s.url);

  // Determine spoiler state
  const hasSpoiler = artist.spoiler && artist.spoiler.videoFile;
  const isLocked = artist.spoiler?.locked === true;
  const isMissing = !hasSpoiler && !isLocked;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="flex items-center gap-2 text-white/50 hover:text-white mb-8 sm:mb-10 transition-colors text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-500 outline-none rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tutti gli artisti</span>
        </motion.button>

        {/* Main content — side by side on desktop, stacked on mobile */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full md:w-64 lg:w-72 flex-shrink-0"
          >
            <div className="relative w-full max-w-xs mx-auto md:max-w-none aspect-[3/4] rounded-xl overflow-hidden bg-white/5 shadow-2xl shadow-black/50">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-white/5 animate-pulse" />
              )}
              <img
                src={artist.image}
                alt={`Foto di ${artist.name}, artista Pikete`}
                className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="flex-1 text-center md:text-left"
          >
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-3 leading-[0.9]">
              {artist.name}
            </h1>

            {/* Quote */}
            {artist.quote && (
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/50 italic mt-2 mb-5 font-medium tracking-tight">
                {artist.quote}
              </p>
            )}

            {/* Orange separator */}
            <div className="w-12 h-[2px] bg-orange-500 mt-4 mb-6 mx-auto md:mx-0" />

            {/* Bio */}
            <div className="max-w-prose">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-snug font-medium tracking-tight">
                {artist.bio}
              </p>
            </div>

            {/* Genres */}
            {artist.genres && artist.genres.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-6 sm:mt-8">
                {artist.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/5 text-white/60 rounded-full border border-white/10"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <p className="text-white/40 text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 text-center md:text-left">
                  Segui {artist.name}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.ariaLabel}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 text-xs sm:text-sm"
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{social.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Spotify Player Embed — if Spotify available */}
        {artist.socialLinks.spotify && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 sm:mb-12"
          >
            <p className="text-white/40 text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 sm:mb-6 text-center md:text-left">
              Ascolta su Spotify
            </p>
            <div className="max-w-2xl mx-auto md:mx-0 rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/artist/${artist.socialLinks.spotify.split('/artist/')[1]?.split('?')[0]}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify player di ${artist.name}`}
              ></iframe>
            </div>
          </motion.div>
        )}

        {/* Spoiler Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 sm:mb-12"
        >
          <p className="text-white/40 text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 sm:mb-6 text-center md:text-left">
            Spoiler
          </p>

          {isLocked ? (
            /* Locked state */
            <div className="w-full max-w-2xl mx-auto md:mx-0 aspect-video rounded-xl overflow-hidden bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 backdrop-blur-sm bg-white/[0.02]" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                  <Lock className="w-7 h-7 text-white/30" />
                </div>
                <p className="text-white/50 font-semibold text-lg">Coming soon...</p>
                <p className="text-white/30 text-sm mt-1">Lo spoiler sarà disponibile a breve</p>
              </div>
            </div>
          ) : isMissing ? (
            /* Missing state */
            <div className="w-full max-w-2xl mx-auto md:mx-0 aspect-video rounded-xl overflow-hidden bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center">
              <p className="text-white/40 font-medium text-lg">Spoiler in arrivo</p>
              <p className="text-white/20 text-sm mt-1">Resta aggiornato per le novità</p>
            </div>
          ) : hasSpoiler ? (
            /* Video player with custom UI */
            <div className="w-full max-w-2xl mx-auto md:mx-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex flex-col pt-0">
              <div className="relative group aspect-video bg-black overflow-hidden">
                <video
                  ref={videoRef}
                  src={artist.spoiler!.videoFile}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={handlePlayPause}
                  onEnded={handleVideoEnded}
                  onTimeUpdate={handleTimeUpdate}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  preload="metadata"
                  playsInline
                  muted={muted}
                  onContextMenu={(e) => e.preventDefault()}
                  aria-label={`Spoiler audio di ${artist.name}`}
                />

                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
                    isPlaying ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {/* Play/Pause button overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <motion.button
                    onClick={handlePlayPause}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative pointer-events-auto"
                    aria-label="Riproduci divideo"
                  >
                    <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full" />
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white hover:border-white group-button transition-all">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1 fill-white !transition-colors !duration-300 hover:!text-black hover:!fill-black" />
                    </div>
                  </motion.button>
                </div>

                {/* Progress bar overlay (visible when playing) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-[width] duration-100"
                          style={{ width: `${progress * 100}%` }}
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMuted(!muted);
                        }}
                        className="text-white/70 hover:text-white transition-colors"
                        aria-label={muted ? 'Attiva audio' : 'Disattiva audio'}
                      >
                        {muted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                </div>
              </div>
              
              {artist.spoiler?.description && (
                <div className="p-4 sm:p-5 border-t border-white/10">
                  <p className="text-sm font-medium text-white/60">
                    {artist.spoiler.description}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Fallback */
            <div className="w-full max-w-2xl mx-auto md:mx-0 aspect-video rounded-xl overflow-hidden bg-white/[0.02] border border-white/10 flex items-center justify-center">
              <p className="text-white/30 text-sm">Nessuno spoiler disponibile</p>
            </div>
          )}
        </motion.div>

        {/* Minimal decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16"
        >
          <div className="h-px w-12 sm:w-16 bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="h-px w-12 sm:w-16 bg-white/20" />
        </motion.div>

        {/* CTA — Discover other artists */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-4 tracking-tighter">
              Scopri gli altri artisti
            </h3>
            <p className="text-white/50 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base font-medium tracking-tight">
              La Pikete è una famiglia. Ascolta tutti i nostri artisti.
            </p>
            <motion.button
              onClick={handleBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors text-sm sm:text-base active:scale-95"
            >
              Vedi tutti gli artisti
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
