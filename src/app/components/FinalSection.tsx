import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function FinalSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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
        background: 'linear-gradient(180deg, #FFF5F8 0%, #FFDDEE 50%, #FFC0CB 100%)',
      }}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-5xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Additional scattered hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative max-w-3xl w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Beating heart */}
        <motion.div
          className="text-8xl md:text-9xl mb-8"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💓
        </motion.div>

        {/* Glowing background for text */}
        <motion.div
          className="relative p-10 md:p-16 rounded-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(25px)',
            border: '3px solid rgba(255, 192, 203, 0.6)',
            boxShadow: '0 15px 60px rgba(255, 105, 180, 0.4)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Main message */}
          <motion.div
            className="space-y-6 text-xl md:text-2xl text-pink-900 leading-relaxed mb-10"
            style={{ fontFamily: 'Georgia, serif' }}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <p>
              Tum meri choti si jaan ho… aur meri har dua mein tumhara naam hota hai 🤲💫
            </p>
            <p className="text-2xl md:text-3xl">
              Khush raho, hansti raho… hamesha
            </p>
          </motion.div>

          {/* Final signature */}
          <motion.div
            className="pt-8 border-t-2 border-pink-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p
              className="text-3xl md:text-4xl text-pink-900"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              – Always yours 💖
            </p>
          </motion.div>

          {/* Decorative hearts around signature */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl">💕</div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-5xl">💕</div>
        </motion.div>

        {/* Extra sparkles */}
        <motion.div
          className="mt-12 flex justify-center gap-4 text-4xl"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.3 }}
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌙
          </motion.span>
          <motion.span
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            ✨
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
