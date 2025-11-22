import React, { useState } from 'react';
import axios from 'axios';
import jsQR from 'jsqr';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, QrCode } from 'lucide-react';
import { useToast } from '../components/ToastProvider';
import AnimatedCard from '../components/AnimatedCard';
import { API_URL } from '../config';

const VerifyReceiptPage: React.FC = () => {
  const [receiptId, setReceiptId] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleVerify = async () => {
    if (!receiptId) return;
    setLoading(true);
    setVerificationResult(null);
    try {
      const res = await axios.get(`${API_URL}/verify/${receiptId}`);
      setVerificationResult(res.data);
      showToast(res.data.message, res.data.is_valid ? 'success' : 'error');
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Verification failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQRUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            let scannedId = code.data;
            // Extract ID if it's a full URL
            if (scannedId.includes('/verify/')) {
              const parts = scannedId.split('/verify/');
              if (parts.length > 1) {
                scannedId = parts[1];
              }
            }
            setReceiptId(scannedId);
            showToast('QR code scanned successfully!', 'success');
          } else {
            showToast('No QR code detected', 'error');
          }
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-3xl mx-auto">
        <AnimatedCard className="p-8">
          <h1 className="text-4xl font-bold mb-6 flex items-center gap-4">
            <QrCode className="text-cyan-400" /> Verify Receipt
          </h1>

          <input
            type="text"
            placeholder="Enter Receipt ID"
            value={receiptId}
            onChange={(e) => setReceiptId(e.target.value)}
            className="w-full px-6 py-4 text-white bg-white/10 border border-white/20 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-xl font-semibold text-white mb-6 hover:opacity-90"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>

          <label className="block mb-2 text-sm text-gray-300">Or upload QR code</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleQRUpload}
            className="file:bg-purple-600 file:text-white file:rounded-lg file:border-0 file:px-4 file:py-2 file:mr-4 file:cursor-pointer text-white"
          />
        </AnimatedCard>

        {verificationResult && (
          <AnimatedCard className="p-8 mt-8">
            <h2 className="text-2xl font-bold mb-4">Verification Result</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {verificationResult.is_valid ? (
                  <CheckCircle className="text-green-400" />
                ) : (
                  <AlertCircle className="text-red-400" />
                )}
                <span className="text-lg">
                  {verificationResult.message}
                </span>
              </div>
              <pre className="bg-white/10 p-4 rounded-xl overflow-x-auto text-sm">
                {JSON.stringify(verificationResult.receipt, null, 2)}
              </pre>
            </div>
          </AnimatedCard>
        )}
      </div>
    </div>
  );
};

export default VerifyReceiptPage;

