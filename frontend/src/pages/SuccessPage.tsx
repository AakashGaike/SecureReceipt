import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, Download, ArrowRight, Shield, Hash, Key, QrCode, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../components/ToastProvider';
import AnimatedCard from '../components/AnimatedCard';
import FloatingIcon from '../components/FloatingIcon';
import { QRCodeCanvas } from 'qrcode.react'; // ✅ Add this

const SuccessPage: React.FC = () => {
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const receiptData = location.state;

  const verifyUrl = receiptData?.receipt_id
    ? `${window.location.origin}/verify/${receiptData.receipt_id}`
    : '';

  useEffect(() => {
    if (receiptData?.receipt_id) {
      showToast('Receipt generated and secured on blockchain!', 'success');
    }
  }, [showToast, receiptData]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("receipt-qr") as HTMLCanvasElement;
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${receiptData.receipt_id}_qr.png`;
    downloadLink.click();
  };

  if (!receiptData) {
    return (
      <div className="text-white p-8 text-center">
        <p>⚠️ No receipt data found. Please generate a receipt first.</p>
        <Link to="/generate" className="text-blue-400 underline mt-4 inline-block">
          Go to Receipt Generator
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header and Receipt Details (unchanged from your code) */}
        {/* ... */}

        {/* ✅ QR Code Section (Updated) */}
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
              <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center relative">
                <QRCodeCanvas id="receipt-qr" value={verifyUrl} size={192} />
              </div>
            </motion.div>

            {/* ✅ Download QR Button */}
            <motion.button 
              onClick={downloadQRCode}
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 border-2 border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm group"
            >
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              Download QR Code
            </motion.button>
          </motion.div>
        </AnimatedCard>

        {/* Footer Actions (unchanged from your code) */}
        {/* ... */}
      </div>
    </div>
  );
};

export default SuccessPage;

