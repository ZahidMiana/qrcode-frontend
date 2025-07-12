import axios from 'axios';
import { QRCodeRequest, QRCodeResponse, ApiError } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://qrcode-backend-lac.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(new Error(error.message || 'API Request failed'));
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error);
    
    const errorMessage = error.response?.data?.error || 
                        error.message || 
                        'An unexpected error occurred';
    
    const apiError: ApiError = {
      success: false,
      error: errorMessage,
      details: error.response?.data?.details,
      timestamp: new Date().toISOString(),
    };
    
    return Promise.reject(new Error(JSON.stringify(apiError)));
  }
);

export const qrCodeApi = {
  generateQRCode: async (request: QRCodeRequest): Promise<QRCodeResponse> => {
    const response = await api.post<QRCodeResponse>('/qrcode/generate', request);
    return response.data;
  },

  getQRCode: async (id: string): Promise<QRCodeResponse> => {
    const response = await api.get<QRCodeResponse>(`/qrcode/${id}`);
    return response.data;
  },

  downloadQRCode: async (id: string, format: 'png' | 'jpeg' | 'svg' = 'png'): Promise<Blob> => {
    const response = await api.get(`/qrcode/${id}/download`, {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },

  getRecentQRCodes: async (limit: number = 10, page: number = 1) => {
    const response = await api.get('/qrcode', {
      params: { limit, page },
    });
    return response.data;
  },
};

export default api;
