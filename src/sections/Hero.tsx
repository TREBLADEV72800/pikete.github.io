import { motion, useScroll, useTransform } from 'framer-motion';
import type { Page } from '@/types';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { LogoImage } from '@/components/Logo';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <>
      {/* Hero Section — Full viewport */}
      <section className="relative h-[100dvh] min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden bg-black">
        {/* Subtle radial gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.03) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="mb-10 flex justify-center w-full"
          >
            <LogoImage size="lg" className="mx-auto" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-normal leading-[0.95] mb-4 px-2"
          >
            Musica
            <br />
            <span className="text-white/50 tracking-normal">Attitudine</span>
            <br />
            Stile
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base sm:text-lg md:text-xl text-white/60 font-medium tracking-tight mb-6 max-w-2xl leading-snug px-4"
          >
            Non siamo una band.
            <br />
            Siamo un collettivo.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4"
          >
            <motion.button
              onClick={() => onNavigate('artists')}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-semibold rounded-full text-base sm:text-lg transition-all hover:bg-white/90 active:scale-95"
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
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 text-white font-semibold rounded-full text-base sm:text-lg border border-white/10 hover:bg-white/10 transition-all active:scale-95"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ascolta gli spoiler
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/30 animate-bounce" />
        </motion.div>
      </section>

      {/* Chi Siamo Section */}
      <section className="py-6 md:py-8 px-4 sm:px-6 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-orange-500 font-medium tracking-wider uppercase text-xs sm:text-sm mb-4 sm:mb-6"
          >
            Chi Siamo
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-2xl md:text-3xl font-black text-white mb-4 sm:mb-6 tracking-tighter"
          >
            Pikete non è una band.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg lg:text-xl text-white/50 leading-relaxed font-medium tracking-tight max-w-2xl mx-auto px-4"
          >
            È una label, un gruppo di amici che fanno musica. Quattro artisti con la stessa visione ma percorsi personali distinti. Stili diversi, stessa fame.
          </motion.p>
        </div>
      </section>
    </>
  );
}
