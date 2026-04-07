import { motion } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';
import { piketeData } from '@/data/artists';
import { useState, useCallback } from 'react';

export function ContactsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(piketeData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = piketeData.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);


  return (
    <section className="flex flex-col justify-center pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 bg-black">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <p className="text-white/50 text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
            Contatti
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-3 leading-none">
            Resta in contatto.
          </h1>
          <p className="text-base sm:text-lg text-white/50 font-medium tracking-tight max-w-xl mx-auto px-4">
            {piketeData.description}
          </p>
        </motion.div>

        {/* Email Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10 text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>
            <a
              href={`mailto:${piketeData.email}`}
              className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tighter hover:text-orange-500 transition-colors px-2"
            >
              {piketeData.email}
            </a>
            <p className="text-white/40 text-xs sm:text-sm mt-3 sm:mt-4 mb-4 sm:mb-6">
              Per collaborazioni e info
            </p>

            {/* Copy email button */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 text-sm font-medium active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Copiato!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copia email</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
