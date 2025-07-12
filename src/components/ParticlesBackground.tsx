import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ParticlesBackground: React.FC = () => {
  const { isDark } = useTheme();

  // Create floating dots animation
  const dots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute w-1 h-1 rounded-full ${
            isDark ? 'bg-neon-blue/30' : 'bg-neon-purple/30'
          }`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isDark 
          ? 'from-gray-900/90 via-gray-900/50 to-gray-800/90' 
          : 'from-white/90 via-white/50 to-gray-100/90'
      }`} />
    </div>
  );
};

export default ParticlesBackground;
