import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Copy, Download, ArrowRight, Shield, Hash, Key, QrCode, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../components/ToastProvider';
import AnimatedCard from '../components/AnimatedCard';
import FloatingIcon from '../components/FloatingIcon';

const SuccessPage: React.FC = () => {
  const { showToast } = useToast();

  const receiptData = {
    receipt_id: 'RCP-2024-001',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    signature: 'MEUCIQDx...',
    qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    timestamp: '2024-01-15 14:30:00',
    store_id: 'STR-001',
    total_amount: '150.75'
  };

  useEffect(() => {
    showToast('Receipt generated and secured on blockchain!', 'success');
  }, [showToast]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 200 }}
          >
            <FloatingIcon className="w-20 h-20">
              <CheckCircle className="w-10 h-10" />
            </FloatingIcon>
          </motion.div>
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            Receipt Generated Successfully!
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </h1>
          <p className="text-xl text-gray-300 flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Your receipt has been secured on the blockchain with quantum encryption
          </p>
        </motion.div>

        {/* Enhanced Receipt Details */}
        <AnimatedCard className="p-8 mb-8" delay={0.2}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-6 h-6 text-blue-400" />
            </motion.div>
            Receipt Details
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
            </motion.div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Receipt ID', value: receiptData.receipt_id, copyable: true, icon: Hash },
              { label: 'Store ID', value: receiptData.store_id, copyable: false, icon: Shield },
              { label: 'Timestamp', value: receiptData.timestamp, copyable: false, icon: Clock },
              { label: 'Total Amount', value: `$${receiptData.total_amount}`, copyable: false, highlight: true, icon: CheckCircle }
            ].map((field, index) => {
              const IconComponent = field.icon;
              return (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <label className="block text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-blue-400" />
                    {field.label}
                  </label>
                  <div className="bg-white/10 border-2 border-white/20 rounded-xl px-6 py-4 text-white flex items-center justify-between backdrop-blur-sm relative overflow-hidden">
                    {field.highlight && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400" />
                    )}
                    <span className={`font-mono ${field.highlight ? 'text-green-400 text-xl font-bold' : ''}`}>
                      {field.value}
                    </span>
                    {field.copyable && (
                      <motion.button
                        onClick={() => copyToClipboard(field.value)}
                        whileHover={{ scale: 1.1, rotateZ: 10 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-white/10 group"
                      >
                        <Copy className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedCard>

        {/* Enhanced Blockchain Data */}
        <AnimatedCard className="p-8 mb-8" delay={0.4}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-lg" />
            Blockchain Data
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Hash className="w-5 h-5 text-purple-400" />
            </motion.div>
          </h2>
          
          <div className="space-y-6">
            {[
              { label: 'Hash', value: receiptData.hash, icon: Hash },
              { label: 'Digital Signature', value: receiptData.signature, icon: Key }
            ].map((field, index) => {
              const IconComponent = field.icon;
              return (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <label className="block text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-purple-400" />
                    {field.label}
                  </label>
                  <div className="bg-white/10 border-2 border-white/20 rounded-xl px-6 py-4 text-white flex items-center justify-between backdrop-blur-sm">
                    <span className="font-mono text-sm break-all pr-4">{field.value}</span>
                    <motion.button
                      onClick={() => copyToClipboard(field.value)}
                      whileHover={{ scale: 1.1, rotateZ: -10 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-white/10 flex-shrink-0 group"
                    >
                      <Copy className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedCard>

        {/* Enhanced QR Code */}
        <AnimatedCard className="p-8 mb-8" delay={0.6}>
          <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <QrCode className="w-6 h-6 text-cyan-400" />
            </motion.div>
            QR Code
          </h2>
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-2xl mb-6 shadow-2xl relative overflow-hidden"
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl" />
              <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center relative">
                <span className="text-gray-600 font-semibold">QR Code</span>
                <motion.div
                  className="absolute inset-0 border-2 border-blue-400/30 rounded-xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 border-2 border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm group"
            >
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              Download QR Code
            </motion.button>
          </motion.div>
        </AnimatedCard>

        {/* Enhanced Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { to: `/verify/${receiptData.receipt_id}`, text: 'Verify Receipt', primary: true, icon: ArrowRight },
            { to: '/generate', text: 'Generate Another', primary: false, icon: Shield },
            { to: '/', text: 'Back to Home', primary: false, icon: CheckCircle }
          ].map((button, index) => {
            const IconComponent = button.icon;
            return (
              <motion.div
                key={button.text}
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <Link
                  to={button.to}
                  className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 group ${
                    button.primary
                      ? 'text-white'
                      : 'bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20'
                  }`}
                  style={button.primary ? {
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                    boxShadow: '0 20px 40px -12px rgba(59, 130, 246, 0.4)'
                  } : undefined}
                >
                  <span>{button.text}</span>
                  <IconComponent className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;