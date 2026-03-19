import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

export function OutfitCheckSection() {
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
        background: 'linear-gradient(180deg, #FFE4E8 0%, #FFC0CB 50%, #FFDDEE 100%)',
      }}
    >
      {/* Sparkle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
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
            {Math.random() > 0.5 ? '✨' : '👗'}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative max-w-3xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Camera className="w-12 h-12 text-pink-900" />
            </motion.div>
            <h2
              className="text-4xl md:text-6xl text-pink-900"
              style={{
                fontFamily: 'Georgia, serif',
                textShadow: '0 2px 20px rgba(255, 192, 203, 0.4)',
              }}
            >
              Eid Look Check 👀✨ | From your Rayyan
            </h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 text-pink-900" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div
          className="p-8 md:p-12 rounded-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 192, 203, 0.5)',
            boxShadow: '0 10px 50px rgba(255, 192, 203, 0.4)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div
            className="space-y-6 text-xl md:text-2xl text-pink-900 leading-relaxed text-center"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              Aur ab sab se important baat… dhyaan se suno 😌 | From your Rayyan
            </motion.p>
            
            <motion.p
              className="text-2xl md:text-3xl"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              Kal Eid hai… aur mujhe tumhara full outfit dekhna hai 💖 sirf imagine nahi, proper dekhna hai | From your Rayyan
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              Sirf mehendi pe kaam nahi chalega… mujhe complete look chahiye, from head to toe 👗✨ | From your Rayyan
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              Tumhara dress, tumhari styling, tumhari vibe… sab kuch dekhna hai kyun ke mujhe pata hai tum sab se zyada khoobsurat lagogi 💕 | From your Rayyan
            </motion.p>
          </div>

          {/* Playful demand card */}
          <motion.div
            className="mt-8 p-8 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 105, 180, 0.25), rgba(255, 215, 0, 0.15))',
              border: '2px solid rgba(255, 105, 180, 0.5)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xl md:text-2xl text-pink-900 text-center mb-4">
              Proper pics bhejni hain… full outfit, full style, full queen vibe 😌💕 koi compromise nahi
            </p>
            <motion.p
              className="text-lg md:text-xl text-pink-800 text-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Main wait karunga… aur is baar ignore bilkul allow nahi hai 😏 warna fine lagega
            </motion.p>
          </motion.div>

          {/* Emoji decoration */}
          <motion.div
            className="mt-8 flex justify-center gap-6 text-5xl"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👗
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              💄
            </motion.span>
            <motion.span
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              👑
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
