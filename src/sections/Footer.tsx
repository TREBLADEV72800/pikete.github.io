import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import { piketeData } from '@/data/artists';
import { LogoImage } from '@/components/Logo';
import type { Page } from '@/types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-6 md:py-8 px-4 sm:px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          {/* Left: Logo image + copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-3"
          >
            <button 
              onClick={() => onNavigate('home')}
              className="hover:scale-105 transition-transform"
            >
              <LogoImage size="md" className="opacity-80 hover:opacity-100 transition-opacity" />
            </button>
            <p className="text-sm font-medium text-white/40 tracking-wide">
              © {currentYear} Pikete. Tutti i diritti riservati.
            </p>
          </motion.div>

          {/* Right: Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {piketeData.socialLinks.youtube && (
              <a
                href={piketeData.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube di Pikete"
                className="text-white/30 hover:text-white/60 transition-colors duration-300"
              >
                <Youtube className="w-6 h-6" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
