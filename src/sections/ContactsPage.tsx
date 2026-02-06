import { motion } from 'framer-motion';
import { Mail, Youtube, Instagram } from 'lucide-react';
import { piketeData } from '@/data/artists';
import { LogoImage } from '@/components/Logo';

const TikTokIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

export function ContactsPage() {
  const socialLinks = [
    {
      icon: Youtube,
      label: 'YouTube',
      href: piketeData.socialLinks.youtube,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: piketeData.socialLinks.instagram,
    },
    {
      icon: TikTokIcon,
      label: 'TikTok',
      href: piketeData.socialLinks.tiktok,
    },
  ];

  return (
    <section className="min-h-screen py-16 sm:py-20 md:py-32 lg:py-48 px-4 sm:px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Logo - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <LogoImage size="md" />
        </motion.div>

        {/* Header - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="text-white/50 text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
            Contatti
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-4 sm:mb-6 px-2">
            Resta in contatto
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mx-auto px-4">
            {piketeData.description}
          </p>
        </motion.div>

        {/* Email Card - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <div className="bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>
            <a
              href={`mailto:${piketeData.email}`}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white hover:text-white/70 transition-colors px-2"
            >
              {piketeData.email}
            </a>
            <p className="text-white/40 text-xs sm:text-sm mt-3 sm:mt-4">
              Per collaborazioni e info
            </p>
          </div>
        </motion.div>

        {/* Social Links - ottimizzato mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-white/50 text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 sm:mb-6 text-center">
            Social
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex flex-col items-center gap-2 sm:gap-3"
                >
                  <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  <span className="text-white/70 text-xs sm:text-sm">{social.label}</span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
