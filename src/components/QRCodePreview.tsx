import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useQRCode } from '../context/QRCodeContext';
import Button from './ui/Button';
import Card from './ui/Card';
import LoadingSpinner from './ui/LoadingSpinner';
import { DownloadIcon, CopyIcon, CheckIcon } from './ui/Icons';
import toast from 'react-hot-toast';

const QRCodePreview: React.FC = () => {
  const { qrCode, loading, downloadQRCode } = useQRCode();
  const [copied, setCopied] = useState(false);

  if (loading) {
    return (
      <Card className="max-w-md mx-auto text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-300">Generating your QR code...</p>
      </Card>
    );
  }

  if (!qrCode) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto text-center p-8"
      >
        <div className="w-32 h-32 mx-auto mb-6 bg-gray-800/50 rounded-2xl flex items-center justify-center">
          <div className="w-20 h-20 bg-gray-700/50 rounded-lg flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-600/50 rounded"></div>
          </div>
        </div>
        <p className="text-gray-400">Your QR code will appear here</p>
      </motion.div>
    );
  }

  const handleCopyLink = async () => {
    if (qrCode.shareableLink) {
      try {
        await navigator.clipboard.writeText(qrCode.shareableLink);
        setCopied(true);
        toast.success('🔗 Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error('Failed to copy link');
      }
    }
  };

  const handleDownload = (format: 'png' | 'jpeg' | 'svg' = 'png') => {
    downloadQRCode(qrCode.id, format);
  };

  return (
    <motion.div
      key={qrCode.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Card className="max-w-md mx-auto text-center" glow>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="p-4 bg-white rounded-2xl inline-block shadow-lg">
              <QRCodeSVG
                value={qrCode.input}
                size={200}
                fgColor={qrCode.options.foregroundColor}
                bgColor={qrCode.options.backgroundColor}
                level={qrCode.options.errorCorrectionLevel}
                marginSize={qrCode.options.margin}
                className="block"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="text-left bg-gray-900/30 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Content:</p>
              <p className="text-sm text-gray-200 break-all">
                {qrCode.input.length > 50 
                  ? `${qrCode.input.substring(0, 50)}...` 
                  : qrCode.input
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleDownload('png')}
                className="flex items-center justify-center space-x-2"
              >
                <DownloadIcon className="w-4 h-4" />
                <span>PNG</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleDownload('svg')}
                className="flex items-center justify-center space-x-2"
              >
                <DownloadIcon className="w-4 h-4" />
                <span>SVG</span>
              </Button>
            </div>

            {qrCode.shareableLink && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center space-x-2"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4" />
                    <span>Copy Shareable Link</span>
                  </>
                )}
              </Button>
            )}

            <div className="text-xs text-gray-500">
              Created {new Date(qrCode.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        </Card>
    </motion.div>
  );
};

export default QRCodePreview;
