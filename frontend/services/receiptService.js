import axios from "axios";

const API_URL = "http://localhost:5000/api/generate";  // Update if deployed

// ✅ Send receipt data to backend
export const generateReceipt = async (receiptData: any) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, receiptData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

// ✅ Verify receipt by ID
export const verifyReceipt = async (receiptId: string) => {
  try {
    const response = await axios.get(`${API_URL}/verify/${receiptId}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

