import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Cpu, Lock, Zap, Database, Globe, Fingerprint, Eye, CheckCircle2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import FloatingIcon from '../components/FloatingIcon';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 left-10 text-blue-400/30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Database className="w-8 h-8" />
        </motion.div>
        
        <motion.div
          className="absolute top-40 right-20 text-purple-400/40"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -90, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Globe className="w-6 h-6" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-1/4 text-cyan-400/35"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 270, 360],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Fingerprint className="w-10 h-10" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 right-10 text-yellow-400/30"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Eye className="w-7 h-7" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-1/3 text-green-400/40"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 90, 180],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <CheckCircle2 className="w-9 h-9" />
        </motion.div>

        {/* Animated dots */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full opacity-80"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-400 rounded-full opacity-40"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      <div className="max-w-6xl w-full">
        {/* Main Content */}
        <div className="text-center mb-16">
          {/* Logo */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 200 }}
          >
            <FloatingIcon className="w-24 h-24" delay={0.2}>
              <Shield className="w-12 h-12" />
            </FloatingIcon>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
              Secure
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                Receipt
              </span>
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p 
            className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the future of digital receipts with our 
            <span className="text-blue-400 font-semibold"> blockchain-powered </span>
            generation and verification system
          </motion.p>

          {/* Enhanced Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <AnimatedCard delay={0.8} className="p-8 group">
              <motion.div
                whileHover={{ rotateY: 10, scale: 1.02 }}
                className="transform-gpu"
              >
                <FloatingIcon className="w-16 h-16 mx-auto mb-6" delay={1}>
                  <Cpu className="w-8 h-8" />
                </FloatingIcon>
                <h3 className="text-white font-bold text-xl mb-4 flex items-center justify-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  Quantum Secured
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Advanced blockchain technology ensures your receipts are immutable and tamper-proof with military-grade encryption
                </p>
              </motion.div>
            </AnimatedCard>
            
            <AnimatedCard delay={1} className="p-8 group">
              <motion.div
                whileHover={{ rotateY: -10, scale: 1.02 }}
                className="transform-gpu"
              >
                <FloatingIcon className="w-16 h-16 mx-auto mb-6" delay={1.2}>
                  <Lock className="w-8 h-8" />
                </FloatingIcon>
                <h3 className="text-white font-bold text-xl mb-4 flex items-center justify-center gap-2">
                  <Fingerprint className="w-5 h-5 text-purple-400" />
                  Cryptographic Signatures
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Digital signatures with biometric verification for ultimate authenticity and non-repudiation
                </p>
              </motion.div>
            </AnimatedCard>
            
            <AnimatedCard delay={1.2} className="p-8 group">
              <motion.div
                whileHover={{ rotateY: 10, scale: 1.02 }}
                className="transform-gpu"
              >
                <FloatingIcon className="w-16 h-16 mx-auto mb-6" delay={1.4}>
                  <Zap className="w-8 h-8" />
                </FloatingIcon>
                <h3 className="text-white font-bold text-xl mb-4 flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  Lightning Verification
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Instant verification with real-time blockchain validation and AI-powered fraud detection
                </p>
              </motion.div>
            </AnimatedCard>
          </div>

          {/* Additional Features Row */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            <AnimatedCard delay={1.4} className="p-6 group">
              <motion.div
                whileHover={{ scale: 1.02, rotateX: 5 }}
                className="transform-gpu flex items-center gap-4"
              >
                <FloatingIcon className="w-12 h-12" delay={1.6}>
                  <Database className="w-6 h-6" />
                </FloatingIcon>
                <div className="text-left">
                  <h4 className="text-white font-bold text-lg mb-2">Distributed Ledger</h4>
                  <p className="text-gray-300 text-sm">Decentralized storage across multiple nodes</p>
                </div>
              </motion.div>
            </AnimatedCard>
            
            <AnimatedCard delay={1.6} className="p-6 group">
              <motion.div
                whileHover={{ scale: 1.02, rotateX: -5 }}
                className="transform-gpu flex items-center gap-4"
              >
                <FloatingIcon className="w-12 h-12" delay={1.8}>
                  <Globe className="w-6 h-6" />
                </FloatingIcon>
                <div className="text-left">
                  <h4 className="text-white font-bold text-lg mb-2">Global Network</h4>
                  <p className="text-gray-300 text-sm">Worldwide accessibility and verification</p>
                </div>
              </motion.div>
            </AnimatedCard>
          </div>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/generate"
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 rounded-2xl font-bold text-xl text-white overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                  boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.4)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Shield className="w-6 h-6 group-hover:rotate-12 transition-transform relative z-10" />
                <span className="relative z-10">Generate Receipt</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, rotateX: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/verify/demo"
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 rounded-2xl font-bold text-xl text-white border-2 border-white/30 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-white/10"
              >
                <Eye className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Verify Receipt</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;