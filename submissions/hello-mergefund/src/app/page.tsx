'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <MergeFundReveal />
    </div>
  );
}

function MergeFundReveal() {
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealStage, setRevealStage] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [currentText, setCurrentText] = useState('');

  // Generate floating particles
  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3000
      });
    }
    setParticles(newParticles);
  };

  // Animated reveal sequence
  const startReveal = async () => {
    setIsRevealing(true);
    setRevealStage(0);
    generateParticles();

    // Stage 1: Loading animation
    setRevealStage(1);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Stage 2: Blockchain effect
    setRevealStage(2);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Stage 3: Text reveal with typewriter effect
    setRevealStage(3);
    const message = "Hello MergeFund";
    for (let i = 0; i <= message.length; i++) {
      setCurrentText(message.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    // Stage 4: Final reveal
    setRevealStage(4);
    setShowMessage(true);
    setIsRevealing(false);
  };

  // Reset function
  const reset = () => {
    setRevealStage(0);
    setShowMessage(false);
    setCurrentText('');
    setParticles([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}ms`,
            animationDuration: '3s'
          }}
        />
      ))}

      <div className="text-center px-8 max-w-4xl mx-auto relative z-10">
        {/* Initial State */}
        {revealStage === 0 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light text-slate-700 tracking-wide">
                MergeFund
              </h1>
              <p className="text-xl text-slate-500 font-light">
                Discover how developers earn real rewards
              </p>
            </div>
            <button
              onClick={startReveal}
              disabled={isRevealing}
              className="group px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-slate-700 font-medium hover:bg-white hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              <span className="flex items-center gap-3">
                {isRevealing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    Revealing...
                  </>
                ) : (
                  <>
                    ✨ Begin Discovery
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </>
                )}
              </span>
            </button>
          </div>
        )}

        {/* Loading Stage */}
        {revealStage === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
              <h2 className="text-3xl font-light text-slate-600">
                Initializing blockchain...
              </h2>
            </div>
          </div>
        )}

        {/* Blockchain Effect */}
        {revealStage === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-3xl font-light text-slate-600">
                Mining block...
              </h2>
              <div className="max-w-2xl mx-auto space-y-3">
                {Array.from({length: 6}).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg flex items-center px-4 animate-pulse"
                    style={{animationDelay: `${i * 200}ms`}}
                  >
                    <div className="font-mono text-sm text-slate-500">
                      {`Block #${i + 1}: 0x${Math.random().toString(16).substr(2, 8)}...`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Text Reveal Stage */}
        {revealStage === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-slate-600">
                Block mined successfully! Decrypting message...
              </h2>
              <div className="text-6xl md:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 tracking-wide">
                {currentText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
        )}

        {/* Final Reveal */}
        {revealStage === 4 && showMessage && (
          <div className="space-y-12 animate-fade-in">
            <div className="space-y-8">
              <div className="text-8xl md:text-9xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 tracking-wide animate-pulse">
                Hello MergeFund
              </div>
              <div className="space-y-4">
                <div className="text-2xl text-slate-600 font-light">
                  🎉 Empowering developers to earn real rewards! 🚀
                </div>
                <div className="text-lg text-slate-500">
                  Connect with projects, showcase your skills, and get rewarded for your contributions
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-slate-700 font-medium hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                ↻ Experience Again
              </button>
              <a
                href="https://mergefund.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg transition-all duration-300"
              >
                Visit MergeFund →
              </a>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({length: 20}).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                >
                  <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-40" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(99 102 241) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    </div>
  );
}
