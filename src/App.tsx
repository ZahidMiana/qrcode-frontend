import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { QRCodeProvider } from './context/QRCodeContext';
import Header from './components/Header';
import QRCodeForm from './components/QRCodeForm';
import QRCodePreview from './components/QRCodePreview';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  return (
    <ThemeProvider>
      <QRCodeProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
          <ParticlesBackground />
          
          <div className="relative z-10">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent glow-text">
                      QR Code Generator
                    </span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Create beautiful, customizable QR codes with Web 3.0 aesthetics. 
                    Generate, customize, and download your QR codes instantly.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-8">
                    <QRCodeForm />
                  </div>
                  
                  <div className="lg:sticky lg:top-8">
                    <QRCodePreview />
                  </div>
                </div>
              </div>
            </main>

            <footer className="text-center py-8 text-gray-400">
              <p>Built with ❤️ using React, TypeScript, and Tailwind CSS</p>
            </footer>
          </div>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(31, 41, 55, 0.9)',
                color: 'white',
                border: '1px solid rgba(75, 85, 99, 0.5)',
                backdropFilter: 'blur(10px)',
              },
              success: {
                iconTheme: {
                  primary: '#00f0ff',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: 'white',
                },
              },
            }}
          />
        </div>
      </QRCodeProvider>
    </ThemeProvider>
  );
}

export default App;
