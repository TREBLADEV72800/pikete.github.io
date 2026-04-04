import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Page } from '@/types';
import { Navbar } from '@/components/Navbar';
import { LogoImage } from '@/components/Logo';
import { CreatorBadge } from '@/components/CreatorBadge';

// Lazy load sections for better performance
const Hero = lazy(() => import('@/sections/Hero').then(m => ({ default: m.Hero })));
const ArtistsList = lazy(() => import('@/sections/ArtistsList').then(m => ({ default: m.ArtistsList })));
const ArtistsPage = lazy(() => import('@/sections/ArtistsPage').then(m => ({ default: m.ArtistsPage })));
const ArtistDetail = lazy(() => import('@/sections/ArtistDetail').then(m => ({ default: m.ArtistDetail })));
const SpoilerPage = lazy(() => import('@/sections/SpoilerPage').then(m => ({ default: m.SpoilerPage })));
const ContactsPage = lazy(() => import('@/sections/ContactsPage').then(m => ({ default: m.ContactsPage })));
const Footer = lazy(() => import('@/sections/Footer').then(m => ({ default: m.Footer })));

import { getArtistById } from '@/data/artists';

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full"
      />
    </div>
  );
}

// Initial loading screen
function InitialLoader() {
  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-6"
        />
        <LogoImage size="lg" className="mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-sm"
        >
          Caricamento...
        </motion.p>
      </motion.div>
    </div>
  );
}

// Page transition variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Page title map
const pageTitles: Record<string, string> = {
  home: 'Pikete — Collettivo Musicale',
  artists: 'Artisti — Pikete',
  'artist-detail': 'Pikete',
  spoiler: 'Spoiler — Pikete',
  contacts: 'Contatti — Pikete',
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Update document title on page change
  useEffect(() => {
    if (currentPage === 'artist-detail' && selectedArtistId) {
      const artist = getArtistById(selectedArtistId);
      document.title = artist ? `${artist.name} — Pikete` : 'Pikete';
    } else {
      document.title = pageTitles[currentPage] || 'Pikete';
    }
  }, [currentPage, selectedArtistId]);

  const handleNavigate = (page: Page, artistId?: string) => {
    if (page === currentPage && !artistId) return;

    setCurrentPage(page);
    if (artistId) {
      setSelectedArtistId(artistId);
    }
    // Scroll to top immediately on navigation
    window.scrollTo(0, 0);
  };

  const selectedArtist = useMemo(() => {
    return selectedArtistId ? getArtistById(selectedArtistId) : null;
  }, [selectedArtistId]);

  if (isLoading) {
    return <InitialLoader />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="relative">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<PageLoader />}>
                <Hero onNavigate={handleNavigate} />
                <ArtistsList onNavigate={handleNavigate} />
                <Footer onNavigate={handleNavigate} />
              </Suspense>
            </motion.div>
          )}

          {currentPage === 'artists' && (
            <motion.div
              key="artists"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="pt-18">
                <Suspense fallback={<PageLoader />}>
                  <ArtistsPage onNavigate={handleNavigate} />
                  <Footer onNavigate={handleNavigate} />
                </Suspense>
              </div>
            </motion.div>
          )}

          {currentPage === 'artist-detail' && selectedArtist && (
            <motion.div
              key="artist-detail"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="pt-18">
                <Suspense fallback={<PageLoader />}>
                  <ArtistDetail artist={selectedArtist} onNavigate={handleNavigate} />
                  <Footer onNavigate={handleNavigate} />
                </Suspense>
              </div>
            </motion.div>
          )}

          {currentPage === 'spoiler' && (
            <motion.div
              key="spoiler"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="pt-18">
                <Suspense fallback={<PageLoader />}>
                  <SpoilerPage />
                  <Footer onNavigate={handleNavigate} />
                </Suspense>
              </div>
            </motion.div>
          )}

          {currentPage === 'contacts' && (
            <motion.div
              key="contacts"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="pt-18">
                <Suspense fallback={<PageLoader />}>
                  <ContactsPage />
                  <Footer onNavigate={handleNavigate} />
                </Suspense>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <CreatorBadge />
    </div>
  );
}

export default App;
