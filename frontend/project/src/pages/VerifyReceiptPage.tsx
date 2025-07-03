import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Shield, ArrowLeft, AlertTriangle, Hash, Key, Clock, Receipt, Store, DollarSign, Package, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import FloatingIcon from '../components/FloatingIcon';

const VerifyReceiptPage: React.FC = () => {
  const { receipt_id } = useParams<{ receipt_id: string }>();

  const receiptData = {
    receipt_id: receipt_id || 'RCP-2024-001',
    store_id: 'STR-001',
    timestamp: '2024-01-15 14:30:00',
    total_amount: '150.75',
    items: [
      { name: 'Coffee', quantity: 2, price: 5.99 },
      { name: 'Sandwich', quantity: 1, price: 12.99 },
      { name: 'Cookie', quantity: 3, price: 2.50 }
    ],
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    signature: 'MEUCIQDx...',
    is_valid: true,
    verification_timestamp: '2024-01-15 14:35:22'
  };

  const StatusBadge = ({ isValid }: { isValid: boolean }) => (
    <motion.div 
      className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-lg font-bold backdrop-blur-sm relative overflow-hidden ${
        isValid 
          ? 'bg-green-500/20 text-green-400 border-2 border-green-500/30' 
          : 'bg-red-500/20 text-red-400 border-2 border-red-500/30'
      }`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, rotateX: 5 }}
    >
      {isValid && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400" />
      )}
      <motion.div
        animate={isValid ? { rotate: [0, 360] } : { rotate: [0, -10, 10, 0] }}
        transition={isValid ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        {isValid ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
      </motion.div>
      {isValid ? 'VERIFIED' : 'TAMPERED'}
    </motion.div>
  );

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6 text-lg font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <FloatingIcon className="w-16 h-16">
                <Shield className="w-8 h-8" />
              </FloatingIcon>
              <div>
                <h1 className="text-5xl font-bold text-white mb-2 flex items-center gap-4">
                  Receipt Verification
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Eye className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                </h1>
                <p className="text-xl text-gray-300 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Quantum blockchain verification results
                </p>
              </div>
            </div>
            <StatusBadge isValid={receiptData.is_valid} />
          </div>
        </motion.div>

        {/* Enhanced Verification Status */}
        <AnimatedCard 
          className={`p-8 mb-8 relative overflow-hidden ${
            receiptData.is_valid 
              ? 'border-green-500/30 bg-green-500/5' 
              : 'border-red-500/30 bg-red-500/5'
          }`}
          delay={0.2}
        >
          {receiptData.is_valid && (
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500" />
          )}
          
          <motion.div 
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {receiptData.is_valid ? (
              <>
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    Receipt is Valid
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Shield className="w-6 h-6 text-green-400" />
                    </motion.div>
                  </h2>
                  <p className="text-gray-300 text-lg">This receipt has been verified on the blockchain and is 100% authentic.</p>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <AlertTriangle className="w-12 h-12 text-red-400" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Receipt is Invalid</h2>
                  <p className="text-gray-300 text-lg">This receipt has been tampered with or is not authentic.</p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatedCard>

        {/* Enhanced Receipt Details */}
        <AnimatedCard className="p-8 mb-8" delay={0.4}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
            Receipt Details
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <Receipt className="w-6 h-6 text-blue-400" />
            </motion.div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { label: 'Receipt ID', value: receiptData.receipt_id, icon: Hash },
              { label: 'Store ID', value: receiptData.store_id, icon: Store },
              { label: 'Timestamp', value: receiptData.timestamp, icon: Clock },
              { label: 'Total Amount', value: `$${receiptData.total_amount}`, highlight: true, icon: DollarSign }
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
                    <IconComponent className="w-4 h-4 text-blue-400" />
                    {field.label}
                  </label>
                  <div className="bg-white/10 border-2 border-white/20 rounded-xl px-6 py-4 text-white backdrop-blur-sm relative overflow-hidden">
                    {field.highlight && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400" />
                    )}
                    <span className={`font-mono ${field.highlight ? 'text-green-400 text-xl font-bold' : ''}`}>
                      {field.value}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced Items Table */}
          <motion.div 
            className="overflow-hidden rounded-xl border-2 border-white/20 backdrop-blur-sm relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400" />
            
            <div className="bg-white/10 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                Items
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    {[
                      { name: 'Item', icon: Package },
                      { name: 'Quantity', icon: Hash },
                      { name: 'Price', icon: DollarSign },
                      { name: 'Total', icon: CheckCircle }
                    ].map((header) => (
                      <th key={header.name} className="text-left text-gray-300 font-semibold px-6 py-4 uppercase tracking-wider text-sm">
                        <div className="flex items-center gap-2">
                          <header.icon className="w-4 h-4 text-blue-400" />
                          {header.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white/5">
                  {receiptData.items.map((item, index) => (
                    <motion.tr 
                      key={index} 
                      className="border-t border-white/10 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <td className="text-white px-6 py-4 font-medium">{item.name}</td>
                      <td className="text-gray-300 px-6 py-4">{item.quantity}</td>
                      <td className="text-gray-300 px-6 py-4">${item.price.toFixed(2)}</td>
                      <td className="text-white px-6 py-4 font-semibold">${(item.quantity * item.price).toFixed(2)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatedCard>

        {/* Enhanced Blockchain Data */}
        <AnimatedCard className="p-8 mb-8" delay={0.6}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-lg" />
            Blockchain Data
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Hash className="w-5 h-5 text-purple-400" />
            </motion.div>
          </h2>
          
          <div className="space-y-6">
            {[
              { label: 'Hash', value: receiptData.hash, icon: Hash },
              { label: 'Digital Signature', value: receiptData.signature, icon: Key },
              { label: 'Verification Timestamp', value: receiptData.verification_timestamp, icon: Clock }
            ].map((field, index) => {
              const IconComponent = field.icon;
              return (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <label className="block text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-purple-400" />
                    {field.label}
                  </label>
                  <div className="bg-white/10 border-2 border-white/20 rounded-xl px-6 py-4 text-white backdrop-blur-sm">
                    <span className="font-mono text-sm break-all">{field.value}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedCard>

        {/* Enhanced Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { to: '/generate', text: 'Generate New Receipt', primary: true, icon: Shield },
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
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <Link
                  to={button.to}
                  className={`inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 group ${
                    button.primary
                      ? 'text-white'
                      : 'bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20'
                  }`}
                  style={button.primary ? {
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                    boxShadow: '0 20px 40px -12px rgba(59, 130, 246, 0.4)'
                  } : undefined}
                >
                  <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {button.text}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyReceiptPage;