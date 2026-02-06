import { motion } from 'framer-motion';
import { artists } from '@/data/artists';
import type { Page } from '@/types';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface ArtistsPageProps {
  onNavigate: (page: Page, artistId?: string) => void;
}

export function ArtistsPage({ onNavigate }: ArtistsPageProps) {
  const handleArtistClick = (artistId: string) => {
    onNavigate('artist-detail', artistId);
  };

  return (
    <section className="min-h-screen py-20 sm:py-24 md:py-32 lg:py-48 px-4 sm:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header - Apple style - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="text-white/50 text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
            Il Cuore di Pikete
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-4 sm:mb-6 px-2">
            I Nostri Artisti
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            Quattro visioni uniche. Una stessa passione.
          </p>
        </motion.div>

        {/* Artists List - ottimizzato mobile */}
        <div className="space-y-6 sm:space-y-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => handleArtistClick(artist.id)}
              className="group cursor-pointer flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-center bg-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all"
            >
              {/* Image - ottimizzato mobile */}
              <div className="relative w-full md:w-1/3 max-w-[200px] sm:max-w-[250px] md:max-w-none rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 aspect-[3/4]">
                <LazyImage
                  src={artist.image}
                  alt={artist.name}
                />
              </div>

              {/* Content - ottimizzato mobile */}
              <div className="flex-1 text-center md:text-left w-full">
                <p className="text-white/40 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 sm:mb-3">
                  {artist.role}
                </p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                  {artist.name}
                </h3>
                <p className="text-white/60 mb-4 sm:mb-6 line-clamp-3 leading-relaxed text-sm sm:text-base px-2 md:px-0">
                  {artist.bio}
                </p>

                {/* Genres - ottimizzato mobile */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4 sm:mb-6">
                  {artist.genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/5 text-white/60 rounded-full border border-white/10"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* CTA - ottimizzato mobile */}
                <div className="inline-flex items-center gap-2 sm:gap-3 text-white font-medium group/btn text-sm sm:text-base">
                  Scopri il profilo
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Lazy load image component
interface LazyImageProps {
  src: string;
  alt: string;
}

function LazyImage({ src, alt }: LazyImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-700 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } group-hover:scale-105`}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />
    </>
  );
}
