import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Minus, Shield, ArrowLeft, Receipt, Store, Clock, DollarSign, Package, Hash, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import FloatingIcon from '../components/FloatingIcon';
import { API_URL } from '../config';

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

const GenerateReceiptPage: React.FC = () => {
  const [formData, setFormData] = useState({
    receipt_id: '',
    store_id: '',
    timestamp: new Date().toISOString().slice(0, 16),
    total_amount: 0 as number | string,
  });

  const [items, setItems] = useState<ReceiptItem[]>([
    { name: '', quantity: 1, price: 0 }
  ]);

  const navigate = useNavigate();

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof ReceiptItem, value: string | number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const calculatedTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    if (Math.round(calculatedTotal * 100) / 100 !== Math.round(Number(formData.total_amount) * 100) / 100) {
      alert('⚠️ Total amount does not match sum of item prices. Please check again.');
      return;
    }

    const receiptPayload = {
      receipt_id: formData.receipt_id,
      store_id: formData.store_id,
      timestamp: formData.timestamp,
      total_amount: formData.total_amount,
      items: items
    };

    try {
      const res = await axios.post(`${API_URL}/generate`, receiptPayload);
      console.log('✅ Receipt generated:', res.data);
      navigate('/success', {
        state: {
          receipt_id: formData.receipt_id,
          store_id: formData.store_id,
          timestamp: formData.timestamp,
          total_amount: formData.total_amount,
          hash: res.data.hash,
          signature: res.data.signature,
          showToast: true
        }
      });
    } catch (err: any) {
      console.error('❌ Error generating receipt:', err);
      alert(err.response?.data?.error || 'Server error.');
    }
  };

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

          <div className="flex items-center gap-6">
            <FloatingIcon className="w-16 h-16">
              <Shield className="w-8 h-8" />
            </FloatingIcon>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2 flex items-center gap-4">
                Generate Receipt
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Hash className="w-8 h-8 text-blue-400" />
                </motion.div>
              </h1>
              <p className="text-xl text-gray-300 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Create a new blockchain-secured digital receipt
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Receipt Details Card */}
          <AnimatedCard className="p-8" delay={0.2}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
                Receipt Details
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Receipt className="w-6 h-6 text-blue-400" />
                </motion.div>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: 'Receipt ID', name: 'receipt_id', type: 'text', placeholder: 'Enter receipt ID', icon: Receipt },
                  { label: 'Store ID', name: 'store_id', type: 'text', placeholder: 'Enter store ID', icon: Store },
                  { label: 'Timestamp', name: 'timestamp', type: 'datetime-local', placeholder: '', icon: Clock },
                  { label: 'Total Amount', name: 'total_amount', type: 'number', placeholder: '0.00', step: '0.01', icon: DollarSign }
                ].map((field, index) => {
                  const IconComponent = field.icon;
                  return (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <label className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-blue-400" />
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          name={field.name}
                          step={field.step}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({ ...formData, [field.name]: field.name === 'total_amount' ? (e.target.value === '' ? '' : parseFloat(e.target.value)) : e.target.value })
                          }

                          className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-6 py-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                          placeholder={field.placeholder}
                          required
                        />
                        <IconComponent className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatedCard>

          {/* Enhanced Items Card */}
          <AnimatedCard className="p-8" delay={0.4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full" />
                  Items
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Package className="w-6 h-6 text-purple-400" />
                  </motion.div>
                </h2>
                <motion.button
                  type="button"
                  onClick={addItem}
                  whileHover={{ scale: 1.05, rotateZ: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-3 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 group"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.div>
                    Add Item
                  </div>
                </motion.button>
              </div>

              <div className="space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400" />

                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
                          <Package className="w-4 h-4 text-purple-400" />
                          Item Name
                        </label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateItem(index, 'name', e.target.value)}
                          className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter item name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
                          <Hash className="w-4 h-4 text-cyan-400" />
                          Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                          className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            Price
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                            className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            placeholder="0.00"
                            required
                          />
                        </div>

                        {items.length > 1 && (
                          <motion.button
                            type="button"
                            onClick={() => removeItem(index)}
                            whileHover={{ scale: 1.1, rotateZ: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-red-500/20 text-red-400 p-3 rounded-xl hover:bg-red-500/30 transition-all duration-300 mt-8 border border-red-500/30 group"
                          >
                            <Minus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatedCard>

          {/* Enhanced Submit Button */}
          <motion.div
            className="flex justify-center pt-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-16 py-6 rounded-2xl font-bold text-xl text-white overflow-hidden transition-all duration-300 group"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.4)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-6 h-6" />
                </motion.div>
                Generate Receipt
                <Shield className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default GenerateReceiptPage;
