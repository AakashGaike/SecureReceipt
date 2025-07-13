import React from 'react';
import { motion } from 'framer-motion';

interface FloatingIconProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{ 
        duration: 1,
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.1, 
        rotateZ: 10,
        transition: { duration: 0.3 }
      }}
      animate={{
        y: [0, -10, 0],
        rotateZ: [0, 5, -5, 0]
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotateZ: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className={`
        relative
        bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500
        rounded-2xl p-4 shadow-2xl
        ${className}
      `}
      style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
        boxShadow: '0 20px 40px -12px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
      <div className="relative z-10 text-white">
        {children}
      </div>
    </motion.div>
  );
};

export default FloatingIcon;