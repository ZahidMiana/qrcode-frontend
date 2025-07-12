import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeOptions, QRCodeRequest } from '../types';
import { useQRCode } from '../context/QRCodeContext';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import { LinkIcon, TypeIcon, SettingsIcon } from './ui/Icons';

const QRCodeForm: React.FC = () => {
  const { generateQRCode, loading } = useQRCode();
  const [input, setInput] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [options, setOptions] = useState<QRCodeOptions>({
    size: 'medium',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    errorCorrectionLevel: 'M',
    margin: 4,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInput = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!input.trim()) {
      newErrors.input = 'Please enter some text or URL';
    } else if (input.length > 2000) {
      newErrors.input = 'Input must not exceed 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInput()) {
      return;
    }

    const request: QRCodeRequest = {
      input: input.trim(),
      options,
    };

    await generateQRCode(request);
  };

  const handleOptionChange = <K extends keyof QRCodeOptions>(
    key: K,
    value: QRCodeOptions[K]
  ) => {
    setOptions((prev: QRCodeOptions) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg">
            <TypeIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Generate QR Code</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Text or URL"
            placeholder="Enter text or URL to generate QR code..."
            value={input}
            onChange={setInput}
            type="text"
            error={errors.input}
            rows={3}
          />

          <motion.div
            initial={false}
            animate={{ height: showAdvanced ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-4 border-t border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Size
                  </label>
                  <select
                    value={options.size}
                    onChange={(e) => handleOptionChange('size', e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  >
                    <option value="small">Small (200px)</option>
                    <option value="medium">Medium (400px)</option>
                    <option value="large">Large (800px)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Error Correction
                  </label>
                  <select
                    value={options.errorCorrectionLevel}
                    onChange={(e) => handleOptionChange('errorCorrectionLevel', e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Foreground Color
                  </label>
                  <input
                    type="color"
                    value={options.foregroundColor}
                    onChange={(e) => handleOptionChange('foregroundColor', e.target.value)}
                    className="w-full h-10 bg-gray-900/50 border border-gray-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={options.backgroundColor}
                    onChange={(e) => handleOptionChange('backgroundColor', e.target.value)}
                    className="w-full h-10 bg-gray-900/50 border border-gray-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Margin: {options.margin}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={options.margin}
                    onChange={(e) => handleOptionChange('margin', parseInt(e.target.value))}
                    className="w-full h-10 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-center space-x-2"
            >
              <SettingsIcon className="w-4 h-4" />
              <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Options</span>
            </Button>

            <Button
              type="submit"
              loading={loading}
              disabled={!input.trim()}
              className="flex items-center justify-center space-x-2 flex-1"
            >
              <LinkIcon className="w-4 h-4" />
              <span>Generate QR Code</span>
            </Button>
          </div>
        </form>
      </motion.div>
    </Card>
  );
};

export default QRCodeForm;
