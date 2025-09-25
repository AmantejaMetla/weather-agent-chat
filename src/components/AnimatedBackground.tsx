'use client';

import React, { useState, useEffect } from 'react';
import Aurora from './Aurora';
import { useChatTheme } from '../hooks/useChatTheme';

const AnimatedBackground: React.FC = () => {
  const { currentTheme } = useChatTheme();
  const [particles, setParticles] = useState<Array<{
    left: number;
    top: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 10,
      animationDuration: 10 + Math.random() * 20
    }));
    setParticles(generatedParticles);
  }, []); // Generate particles only once on mount

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Aurora Effect */}
      <Aurora
        colorStops={[
          "var(--primary)", 
          "var(--primary-hover)", 
          "var(--message-user-bg)",
          "var(--primary)"
        ]}
        blend={0.7}
        amplitude={1.2}
        speed={0.3}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
            }}
          />
        ))}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
    </div>
  );
};

export default AnimatedBackground;
