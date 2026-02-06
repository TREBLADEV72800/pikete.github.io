import { motion } from 'framer-motion';
import type { Page } from '@/types';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <>
      {/* Apple-style Hero - full screen, massive typography, clean */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden bg-black">
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Headline - Apple style massive text - ottimizzato mobile */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[1.1] sm:leading-[1.05] mb-6 px-2"
          >
            Musica.
            <br />
            <span className="text-white/50">Attitudine.</span>
            <br />
            Stile.
          </motion.h1>

          {/* Subtitle - ottimizzato mobile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 mb-10 sm:mb-12 max-w-2xl leading-relaxed px-4"
          >
            Non siamo una band.
            <br />
            Siamo una famiglia.
          </motion.p>

          {/* CTA Buttons - Apple style - ottimizzato mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4"
          >
            <motion.button
              onClick={() => onNavigate('artists')}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-semibold rounded-full text-base sm:text-lg transition-all hover:bg-white/90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                Scopri gli artisti
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
            <motion.button
              onClick={() => onNavigate('spoiler')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 text-white font-semibold rounded-full text-base sm:text-lg border border-white/10 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ascolta gli spoiler
            </motion.button>
          </motion.div>
        </div>

      </section>

      {/* Chi Siamo Section - ottimizzato mobile */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-orange-500 font-medium tracking-wider uppercase text-xs sm:text-sm mb-4 sm:mb-6"
          >
            Chi Siamo
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-6 sm:mb-8 px-2"
          >
            Pikete non è una band.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/60 leading-relaxed max-w-2xl mx-auto px-4"
          >
            È una label. Un gruppo di amici che sanno fare musica.
            <br />
            <br />
            Quattro artisti, quattro visioni, una stessa famiglia.
          </motion.p>
        </div>
      </section>
    </>
  );
}
