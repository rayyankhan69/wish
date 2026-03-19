import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function EidSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        background: 'linear-gradient(180deg, #FFB6C1 0%, #FFDDEE 50%, #FFF5F8 100%)',
      }}
    >
      {/* Floating lanterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          >
            <svg width="40" height="60" viewBox="0 0 40 60">
              <defs>
                <linearGradient id={`lanternGradient${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
              </defs>
              {/* Lantern body */}
              <rect
                x="8"
                y="10"
                width="24"
                height="35"
                rx="3"
                fill={`url(#lanternGradient${i})`}
                opacity="0.8"
              />
              {/* Lantern top */}
              <rect x="5" y="5" width="30" height="5" rx="2" fill="#FFD700" />
              {/* Lantern bottom decoration */}
              <circle cx="20" cy="48" r="3" fill="#FFA500" opacity="0.6" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Golden sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Main heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2
            className="text-5xl md:text-7xl mb-4"
            style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #FF69B4, #FFB6C1, #FFC0CB, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
            }}
          >
            Eid Mubarak
          </h2>
          <motion.h3
            className="text-4xl md:text-5xl text-pink-900"
            style={{
              fontFamily: 'Georgia, serif',
              textShadow: '0 2px 20px rgba(255, 192, 203, 0.4)',
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Meri Pyari Aqsa 🤍🌙
          </motion.h3>
        </motion.div>

        {/* Message card */}
        <motion.div
          className="p-8 md:p-12 rounded-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 10px 50px rgba(255, 192, 203, 0.4), 0 0 50px rgba(255, 215, 0, 0.2)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div
            className="space-y-6 text-lg md:text-xl text-pink-900 leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              Aaj ka din sirf Eid ka nahi… meri taraf se tumhare liye ek special dua ka din hai.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 }}
            >
              Meri dua hai ke tum hamesha khush raho, tumhari life mein kabhi udaasi na aaye, aur tumhari har wish poori ho.
            </motion.p>
            
            <motion.p
              className="text-xl md:text-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.2 }}
            >
              Tum sirf ek insan nahi ho… tum meri zindagi ka sab se khoobsurat ehsaas ho 💖
            </motion.p>
          </div>

          {/* Special highlight */}
          <motion.div
            className="mt-8 p-6 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(255, 215, 0, 0.2))',
              border: '2px solid rgba(255, 192, 203, 0.5)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xl md:text-2xl text-pink-900">
              Aur haan… apni smile kabhi lose mat karna, kyun ke woh meri sab se favorite cheez hai ✨
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
