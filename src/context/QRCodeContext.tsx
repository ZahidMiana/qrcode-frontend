import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { QRCodeContextType, QRCodeData, QRCodeRequest } from '../types';
import { qrCodeApi } from '../services/api';
import toast from 'react-hot-toast';

const QRCodeContext = createContext<QRCodeContextType | undefined>(undefined);

interface QRCodeProviderProps {
  children: ReactNode;
}

export const QRCodeProvider: React.FC<QRCodeProviderProps> = ({ children }) => {
  const [qrCode, setQrCode] = useState<QRCodeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateQRCode = useCallback(async (request: QRCodeRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await qrCodeApi.generateQRCode(request);
      setQrCode(response.data);
      toast.success('🎉 QR Code generated successfully!');
    } catch (err: any) {
      const errorMessage = err.error || 'Failed to generate QR code';
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadQRCode = useCallback(async (id: string, format: 'png' | 'jpeg' | 'svg' = 'png') => {
    setLoading(true);
    
    try {
      const blob = await qrCodeApi.downloadQRCode(id, format);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qrcode-${id}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success(`📥 QR Code downloaded as ${format.toUpperCase()}`);
    } catch (err: any) {
      const errorMessage = err.error || 'Failed to download QR code';
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: QRCodeContextType = useMemo(() => ({
    qrCode,
    loading,
    error,
    generateQRCode,
    downloadQRCode,
    clearError,
  }), [qrCode, loading, error, generateQRCode, downloadQRCode, clearError]);

  return (
    <QRCodeContext.Provider value={value}>
      {children}
    </QRCodeContext.Provider>
  );
};

export const useQRCode = (): QRCodeContextType => {
  const context = useContext(QRCodeContext);
  if (context === undefined) {
    throw new Error('useQRCode must be used within a QRCodeProvider');
  }
  return context;
};
