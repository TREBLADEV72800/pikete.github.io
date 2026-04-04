import { motion } from 'framer-motion';
import { artists } from '@/data/artists';
import type { Page } from '@/types';
import { useState } from 'react';

interface ArtistsListProps {
  onNavigate: (page: Page, artistId?: string) => void;
}

export function ArtistsList({ onNavigate }: ArtistsListProps) {
  const handleArtistClick = (artistId: string) => {
    onNavigate('artist-detail', artistId);
  };

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-6 md:mb-10"
        >
          <p className="text-white/50 text-sm sm:text-base font-medium tracking-wider uppercase mb-2 sm:mb-3">
            La Famiglia
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">
            Gli Artisti.
          </h2>
        </motion.div>

        {/* Artists Grid — 2 cols mobile, 4 cols desktop */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-6 px-3 md:px-0"
        >
          {artists.map((artist) => (
            <ArtistCard
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

// Artist card with overlay
interface ArtistCardProps {
  artist: (typeof artists)[0];
  onClick: () => void;
}

function ArtistCard({ artist, onClick }: ArtistCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white/5">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}

        {/* Image */}
        <img
          src={artist.image}
          alt={`Foto di ${artist.name}, artista Pikete`}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tighter">
            {artist.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
