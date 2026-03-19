import { motion } from 'motion/react';

export function CrescentMoon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="relative"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(255,223,238,0.8) 0%, rgba(255,192,203,0.4) 50%, transparent 70%)',
            width: '400px',
            height: '400px',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Crescent moon */}
        <div className="relative">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="filter drop-shadow-lg"
          >
            <defs>
              <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFDDEE" />
                <stop offset="50%" stopColor="#FFC0CB" />
                <stop offset="100%" stopColor="#FFB6C1" />
              </linearGradient>
            </defs>
            <path
              d="M 100 20 Q 160 100 100 180 Q 140 100 100 20 Z"
              fill="url(#moonGradient)"
              className="drop-shadow-2xl"
            />
          </svg>
          
          {/* Stars around moon */}
          <motion.div
            className="absolute -top-5 -right-5 text-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute -bottom-5 -left-5 text-2xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            ⭐
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
