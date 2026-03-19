import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TypewriterText } from './TypewriterText';
import { CrescentMoon } from './CrescentMoon';

interface OpeningExperienceProps {
  onComplete: () => void;
}

export function OpeningExperience({ onComplete }: OpeningExperienceProps) {
  const [step, setStep] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    // Step 0: Black screen
    const timer1 = setTimeout(() => setStep(1), 500);
    return () => clearTimeout(timer1);
  }, []);

  const handleFirstTextComplete = () => {
    setTimeout(() => setStep(2), 800);
  };

  const handleSecondTextComplete = () => {
    setTimeout(() => setStep(3), 800);
  };

  const handleSubtextComplete = () => {
    setTimeout(() => setShowContinue(true), 500);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 1 }}
      >
        {/* Background transition */}
        <motion.div
          className="absolute inset-0"
          initial={{ background: '#000000' }}
          animate={
            step >= 1
              ? {
                  background: 'linear-gradient(135deg, #FFDDEE 0%, #FFC0CB 50%, #FFB6C1 100%)',
                }
              : {}
          }
          transition={{ duration: 2 }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Step 1: "For Someone Very Special..." */}
          {step >= 1 && step < 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <p
                className="text-3xl md:text-5xl text-white mb-6"
                style={{
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 0 30px rgba(255,255,255,0.5)',
                }}
              >
                {step === 1 && (
                  <TypewriterText
                    text="For Someone Who Means Everything To Me… 💖 | From your Rayyan"
                    speed={80}
                    delay={1000}
                    onComplete={handleFirstTextComplete}
                  />
                )}
              </p>
            </motion.div>
          )}

          {/* Step 2: "Meri Jan... Aqsa" */}
          {step >= 2 && step < 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p
                className="text-4xl md:text-6xl text-white"
                style={{
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 0 40px rgba(255,192,203,0.8)',
                }}
              >
                <TypewriterText
                  text="Meri Jan… Aqsa 🌙 | Always from your Rayyan"
                  speed={100}
                  delay={0}
                  onComplete={handleSecondTextComplete}
                />
              </p>
            </motion.div>
          )}

          {/* Step 3: Chand Mubarak Screen */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              {/* Crescent Moon */}
              <div className="mb-12">
                <CrescentMoon />
              </div>

              {/* Main heading */}
              <motion.h1
                className="text-5xl md:text-7xl mb-8 text-white"
                style={{
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,192,203,0.3)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Chand Mubarak Meri Jan Aqsa 🌙✨ | From your Rayyan
              </motion.h1>

              {/* Subtext with typewriter */}
              <motion.div
                className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12"
                style={{
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <TypewriterText
                  text="Aaj ki raat sirf chand ki nahi… meri har soch, har ehsaas, har dua sirf tum tak aa rahi hai 💫 kyun ke tum meri har khushi ka sab se khoobsurat hissa ho | From your Rayyan"
                  speed={50}
                  delay={0}
                  onComplete={handleSubtextComplete}
                />
              </motion.div>

              {/* Continue button */}
              {showContinue && (
                <motion.button
                  className="px-10 py-4 text-xl text-white rounded-full"
                  style={{
                    fontFamily: 'Georgia, serif',
                    background: 'linear-gradient(135deg, #FF69B4, #FFB6C1, #FFC0CB)',
                    boxShadow: '0 10px 40px rgba(255, 105, 180, 0.4)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  onClick={onComplete}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue 💖
                </motion.button>
              )}
            </motion.div>
          )}
        </div>

        {/* Floating sparkles */}
        {step >= 1 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
