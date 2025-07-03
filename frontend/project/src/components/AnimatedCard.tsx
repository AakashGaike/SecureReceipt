import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  hover = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      whileHover={hover ? { 
        scale: 1.02, 
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3 }
      } : undefined}
      className={`
        backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl
        shadow-2xl shadow-blue-500/10
        transform-gpu perspective-1000
        ${className}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;