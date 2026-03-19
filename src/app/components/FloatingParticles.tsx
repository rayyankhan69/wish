import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'star' | 'sparkle' | 'heart';
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      type: ['star', 'sparkle', 'heart'][Math.floor(Math.random() * 3)] as 'star' | 'sparkle' | 'heart',
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        >
          {particle.type === 'star' && (
            <div
              className="text-pink-200"
              style={{ fontSize: `${particle.size}px` }}
            >
              ✨
            </div>
          )}
          {particle.type === 'sparkle' && (
            <div
              className="bg-pink-300 rounded-full blur-sm"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                boxShadow: '0 0 10px rgba(255, 192, 203, 0.8)',
              }}
            />
          )}
          {particle.type === 'heart' && (
            <div
              className="text-pink-300"
              style={{ fontSize: `${particle.size}px` }}
            >
              💕
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
