import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { TypewriterText } from './TypewriterText';
import { RotateCcw } from 'lucide-react';

export function MessageSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
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

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
    setShowReplay(false);
  };

  const handleAllComplete = () => {
    setShowReplay(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        background: 'linear-gradient(180deg, #FFC0CB 0%, #FFDDEE 50%, #FFF5F8 100%)',
      }}
    >
      {/* Glassmorphism card */}
      <motion.div
        className="relative max-w-3xl w-full p-8 md:p-12 rounded-3xl"
        style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px rgba(255, 192, 203, 0.3)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Decorative hearts in corners */}
        <div className="absolute -top-4 -left-4 text-4xl">💕</div>
        <div className="absolute -top-4 -right-4 text-4xl">💕</div>
        <div className="absolute -bottom-4 -left-4 text-4xl">💕</div>
        <div className="absolute -bottom-4 -right-4 text-4xl">💕</div>

        <motion.div
          key={replayKey}
          className="space-y-6 text-lg md:text-xl leading-relaxed"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-pink-900">
            {isVisible && (
              <TypewriterText
                text="Meri zargey, meri qurban, meri sab se pyari cute si baby… 🥺❤️ | From your Rayyan"
                speed={40}
                delay={200}
              />
            )}
          </p>
          <p className="text-pink-800">
            {isVisible && (
              <TypewriterText
                text="Aaj chand raat hai… aur poori duniya is khoobsurat raat ko celebrate kar rahi hai, lekin meri raat tab hi mukammal hoti hai jab mujhe tum yaad aati ho, jab mera dil sirf tumhara naam leta hai | From your Rayyan"
                speed={35}
                delay={2500}
              />
            )}
          </p>
          <p className="text-pink-800">
            {isVisible && (
              <TypewriterText
                text="Sach kahun to aaj chand bhi thoda jealous hoga… kyun ke meri nazar mein sab se zyada roshan, sab se zyada khoobsurat cheez tumhari muskurahat hai 🌸 woh muskurahat jo meri har tension ko khatam kar deti hai | From your Rayyan"
                speed={35}
                delay={6500}
              />
            )}
          </p>
          <p className="text-pink-800">
            {isVisible && (
              <TypewriterText
                text="Tumhari ek choti si smile mere liye itni important hai ke uske saamne har cheez choti lagti hai… aur main bas ye chahta hoon ke tum hamesha isi tarah hansti raho, bina kisi fikar ke 🤍 | From your Rayyan"
                speed={35}
                delay={12500}
                onComplete={handleAllComplete}
              />
            )}
          </p>
        </motion.div>

        {/* Sher section */}
        <motion.div
          className="mt-10 p-6 rounded-2xl"
          style={{
            background: 'rgba(255, 192, 203, 0.2)',
            border: '1px solid rgba(255, 192, 203, 0.4)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p
            className="text-xl md:text-2xl text-pink-900 italic text-center leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Chand nikla to teri yaad bhi saath aayi,
            <br />
            Is haseen raat mein bas teri kami nazar aayi… 🌙
          </p>
        </motion.div>

        {/* Replay button */}
        {showReplay && (
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={handleReplay}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white"
              style={{
                background: 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
                boxShadow: '0 5px 20px rgba(255, 105, 180, 0.3)',
                fontFamily: 'Georgia, serif',
              }}
            >
              <RotateCcw className="w-5 h-5" />
              Replay Message
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}