import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Button from './ui/Button';
import { SunIcon, MoonIcon, GithubIcon } from './ui/Icons';

const Header: React.FC = () => {
  const { isDark, toggle } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-6 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-pink rounded-xl flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-white rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/qrcode.png" 
                alt="QR Code Generator Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
              QR Code Generator
            </h1>
            <p className="text-sm text-gray-400">Create Beautiful QR Codes</p>
          </div>
        </motion.div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            className="p-2"
          >
            {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open('https://github.com', '_blank')}
            className="p-2"
          >
            <GithubIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
