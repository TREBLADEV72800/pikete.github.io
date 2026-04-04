import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/data/artists';
import type { Page } from '@/types';
import { LogoImage } from './Logo';
import { useState, useEffect, useCallback } from 'react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((href: string) => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      // Small delay so close animation is visible before navigating
      setTimeout(() => {
        onNavigate(href as Page);
      }, 150);
    } else {
      onNavigate(href as Page);
    }
  }, [isMobileMenuOpen, onNavigate]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black ${
          isScrolled ? 'border-b border-white/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[59px] sm:h-[67px]">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex-shrink-0 flex items-center focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black outline-none rounded-lg"
              aria-label="Torna alla Home"
            >
              <LogoImage size="sm" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-1.5 py-1.5 text-[11.5px] sm:text-[12.5px] font-bold tracking-widest uppercase transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded ${
                    currentPage === item.href || (item.href === 'home' && currentPage === 'home')
                      ? 'text-orange-500'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                  {/* Active indicator underline */}
                  {(currentPage === item.href || (currentPage === 'artist-detail' && item.href === 'artists')) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Hamburger Menu Button */}
            <button
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-orange-500 outline-none rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`block h-[2px] w-full bg-white rounded transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                  }`}
                />
                <span
                  className={`block h-[2px] w-full bg-white rounded transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 scale-0' : ''
                  }`}
                />
                <span
                  className={`block h-[2px] w-full bg-white rounded transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black lg:hidden flex flex-col items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
            }}
          >
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`text-4xl sm:text-5xl font-black tracking-tighter uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg px-6 py-3 ${
                    currentPage === item.href || (currentPage === 'artist-detail' && item.href === 'artists')
                      ? 'text-orange-500'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
