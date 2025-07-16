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
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number, size: number, color: string}>>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced particle generation with multiple colors and sizes
  const generateParticles = () => {
    const colors = ['from-blue-400 to-indigo-400', 'from-purple-400 to-pink-400', 'from-cyan-400 to-blue-400', 'from-indigo-400 to-purple-400'];
    const newParticles = [];
    for (let i = 0; i < 80; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5000,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setParticles(newParticles);
  };

  // Enhanced animated reveal sequence with more dramatic effects
  const startReveal = async () => {
    setIsRevealing(true);
    setRevealStage(0);
    generateParticles();

    // Stage 1: Dramatic loading with pulsing glow
    setRevealStage(1);
    for (let i = 0; i <= 100; i += 5) {
      setGlowIntensity(i);
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Stage 2: Enhanced blockchain effect with staggered animations
    setRevealStage(2);
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Stage 3: Explosive text reveal with character-by-character animation
    setRevealStage(3);
    const message = "Hello MergeFund";
    for (let i = 0; i <= message.length; i++) {
      setCurrentText(message.slice(0, i));
      setGlowIntensity(Math.random() * 50 + 50); // Random glow effect
      await new Promise(resolve => setTimeout(resolve, 120));
    }

    // Stage 4: Epic final reveal with maximum glow
    setRevealStage(4);
    setShowMessage(true);
    setGlowIntensity(100);
    setIsRevealing(false);
  };

  // Enhanced reset function
  const reset = () => {
    setRevealStage(0);
    setShowMessage(false);
    setCurrentText('');
    setParticles([]);
    setGlowIntensity(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Interactive Mouse Follower */}
      <div 
        className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl transition-all duration-1000 pointer-events-none"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Enhanced Floating Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full opacity-30 animate-ping`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}ms`,
            animationDuration: `${2 + Math.random() * 3}s`,
            background: `linear-gradient(45deg, ${particle.color.replace('from-', '').replace(' to-', ', ')})`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(99, 102, 241, 0.3)`
          }}
        />
      ))}

      <div className="text-center px-8 max-w-4xl mx-auto relative z-10">
        {/* Enhanced Initial State */}
        {revealStage === 0 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light text-slate-700 tracking-wide transform hover:scale-105 transition-transform duration-500">
                MergeFund
              </h1>
              <p className="text-xl text-slate-500 font-light animate-pulse">
                Discover how developers earn real rewards
              </p>
            </div>
            <button
              onClick={startReveal}
              disabled={isRevealing}
              className="group px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-slate-700 font-medium hover:bg-white hover:shadow-2xl hover:scale-110 transition-all duration-500 disabled:opacity-50 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="flex items-center gap-3 relative z-10">
                {isRevealing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    <span className="animate-pulse">Revealing...</span>
                  </>
                ) : (
                  <>
                    <span className="animate-bounce">✨</span> Begin Discovery
                    <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                  </>
                )}
              </span>
            </button>
          </div>
        )}

        {/* Enhanced Loading Stage with Pulsing Glow */}
        {revealStage === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div 
                className="w-20 h-20 mx-auto border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin relative"
                style={{
                  boxShadow: `0 0 ${glowIntensity}px rgba(59, 130, 246, 0.6)`,
                  filter: `brightness(${1 + glowIntensity / 100})`
                }}
              >
                <div className="absolute inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse" />
              </div>
              <h2 className="text-3xl font-light text-slate-600 animate-pulse">
                Initializing quantum blockchain...
              </h2>
              <div className="text-sm text-slate-400 font-mono">
                Calibrating neural networks... {Math.floor(glowIntensity)}%
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Blockchain Effect with Matrix-style Animation */}
        {revealStage === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-3xl font-light text-slate-600 animate-pulse">
                Mining quantum blocks...
              </h2>
              <div className="max-w-3xl mx-auto space-y-2">
                {Array.from({length: 8}).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-gradient-to-r from-slate-100 via-blue-50 to-slate-200 rounded-lg flex items-center px-6 border-l-4 border-blue-400 transform hover:scale-105 transition-all duration-300"
                    style={{
                      animationDelay: `${i * 150}ms`,
                      animation: `pulse 2s ease-in-out infinite`,
                      boxShadow: `0 4px 20px rgba(59, 130, 246, 0.1)`
                    }}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
                      <div className="font-mono text-sm text-slate-600 flex-1">
                        Block #{i + 1}: 0x{Math.random().toString(16).substr(2, 12)}
                      </div>
                      <div className="text-xs text-green-600 font-semibold">✓ VERIFIED</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Network Consensus Achieved
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Text Reveal Stage with Clean Effects */}
        {revealStage === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-slate-600">
                Decryption Complete! Revealing Message...
              </h2>
              <div className="text-6xl md:text-8xl font-light text-blue-600 tracking-wide relative">
                <div className="block">
                  {currentText.split('').map((char, index) => (
                    <span
                      key={index}
                      className="inline-block animate-bounce"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationDuration: '1s'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                  <span className="animate-pulse text-blue-500">|</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Epic Final Reveal with Clean Design */}
        {revealStage === 4 && showMessage && (
          <div className="space-y-12 animate-fade-in">
            <div className="space-y-8">
              <div className="text-8xl md:text-9xl font-light text-blue-600 tracking-wide relative leading-tight">
                <div className="block">Hello</div>
                <div className="block">MergeFund</div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="text-2xl text-slate-600 font-light">
                  🎉 Empowering developers to earn real rewards! 🚀
                </div>
                <div className="text-lg text-slate-500">
                  Connect with projects, showcase your skills, and get rewarded for your contributions
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button
                onClick={reset}
                className="group px-8 py-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-slate-700 font-medium hover:bg-white hover:shadow-2xl hover:scale-110 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  <span className="group-hover:rotate-180 transition-transform duration-500">↻</span>
                  Experience Again
                </span>
              </button>
              <a
                href="https://mergefund.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-600 hover:shadow-2xl hover:scale-110 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Visit MergeFund
                  <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                </span>
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

            {/* Footer Credit */}
            <div className="pt-8 border-t border-slate-200/50">
              <p className="text-sm text-slate-400 font-light">
                Built by <span className="text-slate-600 font-medium">Tanisq</span> with ❤️ for the <span className="text-slate-600 font-medium">MergeFund</span> community
              </p>
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
