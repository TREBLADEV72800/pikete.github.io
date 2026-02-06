import { motion } from 'framer-motion';
import { artists } from '@/data/artists';
import type { Page } from '@/types';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface ArtistsListProps {
  onNavigate: (page: Page, artistId?: string) => void;
}

export function ArtistsList({ onNavigate }: ArtistsListProps) {
  const handleArtistClick = (artistId: string) => {
    onNavigate('artist-detail', artistId);
  };

  return (
    <section className="py-32 md:py-48 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Apple style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <p className="text-white/50 text-sm font-medium tracking-wider uppercase mb-4">
            La Famiglia
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Gli Artisti
          </h2>
        </motion.div>

        {/* Artists Grid - Apple style, minimal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist, index) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              index={index}
              onClick={() => handleArtistClick(artist.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Apple-style artist card
interface ArtistCardProps {
  artist: typeof artists[0];
  index: number;
  onClick: () => void;
}

function ArtistCard({ artist, index, onClick }: ArtistCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-white/5">
        {/* Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}

        {/* Image */}
        <img
          src={artist.image}
          alt={artist.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Gradient overlay - subtle */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-1">
            {artist.name}
          </h3>
          <p className="text-white/60 text-sm">{artist.role}</p>
        </div>

        {/* Hover arrow - Apple style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ArrowRight className="w-5 h-5 text-black" />
        </motion.div>
      </div>
    </motion.div>
  );
}
