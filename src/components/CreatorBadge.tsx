import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

export function CreatorBadge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating cursor button — bottom right */}
      <motion.button
        id="creator-badge-btn"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chi ha creato questo sito"
        className="group fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer outline-none shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-black/50 hover:border-white/30 hover:shadow-[0_12px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300"
      >
        {/* Triple staggered pulse rings */}
        <motion.span
          className="absolute inset-0 rounded-full bg-white/5"
          animate={{ scale: [1, 1.2], opacity: [0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-white/5"
          animate={{ scale: [1, 1.2], opacity: [0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1], delay: 0.5 }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-white/5"
          animate={{ scale: [1, 1.2], opacity: [0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1], delay: 1 }}
        />

        {/* Cursor icon */}
        <MousePointer2 className="relative z-10 w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>

      {/* Popup overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="creator-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Card */}
            <motion.div
              key="creator-card"
              className="relative z-10 rounded-3xl border border-white/[0.08] max-w-sm w-full text-center overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(40px)',
                boxShadow: '0 0 80px -20px rgba(255,255,255,0.03), 0 25px 50px -12px rgba(0,0,0,0.5)',
              }}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top glow line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              {/* Inner subtle radial glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)' }}
              />

              {/* Content */}
              <div className="relative z-10 px-10 pt-10 pb-8">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-white/40 text-xs font-semibold tracking-[0.2em] uppercase mb-5"
                >
                  Sviluppato da
                </motion.p>

                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="text-white text-2xl font-bold tracking-tight mb-6"
                >
                  Trebla
                </motion.h3>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="w-12 h-px bg-white/10 mx-auto mb-6"
                />

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-white/30 text-sm font-medium tracking-wide mb-5"
                >
                  Per un sito come questo, contattami su
                </motion.p>

                <motion.a
                  href="https://wa.me/393518924471"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wide hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </motion.a>
              </div>

              {/* Close button */}
              <div className="relative z-10 border-t border-white/[0.05]">
                <motion.button
                  id="creator-badge-close"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 text-white/30 text-sm font-medium tracking-wider uppercase hover:text-white/60 transition-colors cursor-pointer"
                >
                  Chiudi
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
