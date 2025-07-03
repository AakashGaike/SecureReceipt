import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GenerateReceiptPage from './pages/GenerateReceiptPage';
import SuccessPage from './pages/SuccessPage';
import VerifyReceiptPage from './pages/VerifyReceiptPage';
import { ToastProvider } from './components/ToastProvider';
import Background3D from './components/Background3D';

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
          <Background3D />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generate" element={<GenerateReceiptPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/verify/:receipt_id" element={<VerifyReceiptPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;