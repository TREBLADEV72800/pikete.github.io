import { motion } from 'framer-motion';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'svg' | 'image';
}

// Fallback SVG logo - bold and visible
const LogoSVG = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 60"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="5"
      y="48"
      fill="white"
      fontFamily="Inter, system-ui, sans-serif"
      fontSize="44"
      fontWeight="800"
      letterSpacing="-2"
    >
      Pikete
    </text>
    <path
      d="M170 25L180 15"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export function Logo({ className = '', size = 'md', variant = 'svg' }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    sm: 'w-[60px] h-auto',
    md: 'w-[90px] h-auto',
    lg: 'w-[250px] h-auto',
  };

  const imageSizes = {
    sm: 'w-[60px] h-auto',
    md: 'w-[90px] h-auto',
    lg: 'w-[250px] h-auto',
  };

  // Use image if variant is 'image' and image loaded successfully
  if (variant === 'image' && !imageError) {
    return (
      <motion.img
        src="/loghi/pikete.jpeg"
        alt="Pikete Logo"
        className={`${imageSizes[size]} ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onError={() => setImageError(true)}
        loading="eager"
      />
    );
  }

  // SVG fallback
  return (
    <motion.div
      className={sizes[size]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LogoSVG className={`w-auto h-full ${className}`} />
    </motion.div>
  );
}

export function LogoSimple({ className = '', size = 'md', variant = 'svg' }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    sm: 'w-[60px] h-auto',
    md: 'w-[90px] h-auto',
    lg: 'w-[250px] h-auto',
  };

  const imageSizes = {
    sm: 'w-[60px] h-auto',
    md: 'w-[90px] h-auto',
    lg: 'w-[250px] h-auto',
  };

  // Use image if variant is 'image' and image loaded successfully
  if (variant === 'image' && !imageError) {
    return (
      <img
        src="/loghi/pikete.jpeg"
        alt="Pikete"
        className={`${imageSizes[size]} ${className}`}
        onError={() => setImageError(true)}
        loading="eager"
      />
    );
  }

  return (
    <div className={sizes[size]}>
      <LogoSVG className={`w-auto h-full ${className}`} />
    </div>
  );
}

// Logo image-only component with fallback
export function LogoImage({ className = '', size = 'md' }: Omit<LogoProps, 'variant'>) {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    sm: 'w-[56px] h-auto',
    md: 'w-[90px] h-auto',
    lg: 'w-[230px] h-auto', // Hero logo size
  };

  if (imageError) {
    return (
      <div className={sizes[size]}>
        <LogoSVG className={`w-auto h-full ${className}`} />
      </div>
    );
  }

  return (
    <img
      src="/loghi/pikete.jpeg"
      alt="Pikete Logo"
      className={`${sizes[size]} object-contain ${className}`}
      onError={() => setImageError(true)}
      loading="eager"
    />
  );
}
