import { motion } from 'framer-motion';
import { artists } from '@/data/artists';
import type { Page } from '@/types';
import { useState } from 'react';

interface ArtistsPageProps {
  onNavigate: (page: Page, artistId?: string) => void;
}

export function ArtistsPage({ onNavigate }: ArtistsPageProps) {
  const handleArtistClick = (artistId: string) => {
    onNavigate('artist-detail', artistId);
  };

  return (
    <section className="min-h-screen pt-20 pb-16 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-3 leading-none">
            Artisti.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/50 font-medium tracking-tight">
            Quattro voci, un collettivo.
          </p>
        </motion.div>

        {/* Artists Grid — equal sizing */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {artists.map((artist) => (
            <ArtistGridCard
              key={artist.id}
              artist={artist}
              onClick={() => handleArtistClick(artist.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Grid card with image overlay
interface ArtistGridCardProps {
  artist: (typeof artists)[0];
  onClick: () => void;
}

function ArtistGridCard({ artist, onClick }: ArtistGridCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
      }}
      onClick={onClick}
      className="group cursor-pointer max-w-[90%] mx-auto"
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/5">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
            <span className="text-2xl font-bold text-white/20">{artist.name.charAt(0)}</span>
          </div>
        )}

        {/* Image */}
        <img
          src={artist.image}
          alt={`Foto di ${artist.name}, artista Pikete`}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-[1.03]`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg md:text-xl font-black text-white tracking-tighter mb-1">
            {artist.name}
          </h3>
          {artist.quote && (
            <p className="text-xs sm:text-sm text-white/50 italic line-clamp-2 font-medium tracking-tight">
              {artist.quote}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
