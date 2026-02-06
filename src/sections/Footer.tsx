import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          {/* Logo Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-20 md:h-24"
          >
            <img
              src="/loghi/pikete.jpg"
              alt="Pikete Logo"
              className="w-[140px] h-auto object-contain"
            />
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-white/30 text-sm"
          >
            © {currentYear} Pikete. Tutti i diritti riservati.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
