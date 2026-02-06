import { motion } from 'framer-motion';
import type { Artist, Page } from '@/types';
import {
  ArrowLeft,
  Instagram,
  Youtube
} from 'lucide-react';

interface ArtistDetailProps {
  artist: Artist;
  onNavigate: (page: Page, artistId?: string) => void;
}

const SpotifyIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

export function ArtistDetail({ artist, onNavigate }: ArtistDetailProps) {
  const handleBack = () => onNavigate('artists');

  // Available social links
  const socialLinks = [
    { icon: SpotifyIcon, label: 'Spotify', url: artist.socialLinks.spotify },
    { icon: AppleIcon, label: 'Apple Music', url: artist.socialLinks.appleMusic },
    { icon: Youtube, label: 'YouTube', url: artist.socialLinks.youtube },
    { icon: Instagram, label: 'Instagram', url: artist.socialLinks.instagram },
    { icon: TikTokIcon, label: 'TikTok', url: artist.socialLinks.tiktok },
  ].filter(s => s.url); // Only show available links

  return (
    <section className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Back Button - Apple style - ottimizzato mobile */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 sm:mb-8 transition-colors text-xs sm:text-sm font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Torna agli artisti</span>
        </motion.button>

        {/* Image - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 sm:mb-12"
        >
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/5">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Minimal decoration - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16"
        >
          <div className="h-px w-12 sm:w-16 bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="h-px w-12 sm:w-16 bg-white/20" />
        </motion.div>

        {/* Bio - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-white/60 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-center px-2">
            {artist.bio}
          </p>

          {/* Genres - ottimizzato mobile */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 sm:mt-8">
            {artist.genres.map((genre) => (
              <span
                key={genre}
                className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/5 text-white/60 rounded-full border border-white/10"
              >
                {genre}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Social Links - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-white/40 text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 sm:mb-6 text-center">
            Segui {artist.name}
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span className="text-white/70 text-xs sm:text-sm">{social.label}</span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* CTA - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <div className="bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
              Scopri gli altri artisti
            </h3>
            <p className="text-white/50 mb-4 sm:mb-6 text-sm sm:text-base">
              La Pikete è una famiglia. Ascolta tutti i nostri artisti.
            </p>
            <motion.button
              onClick={handleBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors text-sm sm:text-base"
            >
              Vedi tutti gli artisti
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
