export interface QRCodeOptions {
  size: 'small' | 'medium' | 'large';
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
}

export interface QRCodeRequest {
  input: string;
  options: QRCodeOptions;
}

export interface QRCodeResponse {
  success: boolean;
  data: {
    id: string;
    input: string;
    options: QRCodeOptions;
    qrCodeData: string;
    shareableLink: string;
    createdAt: string;
  };
  timestamp: string;
}

export interface QRCodeData {
  id: string;
  input: string;
  options: QRCodeOptions;
  qrCodeData: string;
  shareableLink?: string;
  createdAt: string;
}

export interface ApiError {
  success: false;
  error: string;
  details?: any[];
  timestamp: string;
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}

export interface QRCodeContextType {
  qrCode: QRCodeData | null;
  loading: boolean;
  error: string | null;
  generateQRCode: (request: QRCodeRequest) => Promise<void>;
  downloadQRCode: (id: string, format?: 'png' | 'jpeg' | 'svg') => Promise<void>;
  clearError: () => void;
}
