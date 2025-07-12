import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false 
}) => {
  const baseClasses = `
    bg-gray-900/20 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6
    ${glow ? 'shadow-neon animate-glow' : 'shadow-glass'}
    ${className}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={baseClasses}
    >
      {children}
    </motion.div>
  );
};

export default Card;
