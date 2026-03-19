import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function MehendiGallery() {
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
        background: 'linear-gradient(180deg, #FFF5F8 0%, #FFDDEE 50%, #FFE4E8 100%)',
      }}
    >
      {/* Floating flowers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative max-w-4xl w-full"
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
          <h2
            className="text-4xl md:text-6xl text-pink-900"
            style={{
              fontFamily: 'Georgia, serif',
              textShadow: '0 2px 20px rgba(255, 192, 203, 0.4)',
            }}
          >
            Tumhari Mehendi 😍🌿 | From your Rayyan
          </h2>
        </motion.div>

        {/* Message card */}
        <motion.div
          className="p-8 md:p-12 rounded-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 192, 203, 0.5)',
            boxShadow: '0 8px 32px rgba(255, 192, 203, 0.4)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div
            className="space-y-6 text-lg md:text-xl text-pink-900 leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <p>
              Aur jab tumne mehendi lagayi… us moment ne is chand raat ko aur bhi zyada special bana diya 💖 kyun ke mujhe pata hai ke tum us mehendi mein bhi utni hi khoobsurat lag rahi hogi jitni tum hamesha lagti ho | From your Rayyan
            </p>
            <p>
              Sach kahun to mehendi bhi lucky hai ke usse tumhare haathon pe jagah mili… warna itni nazakat, itni khoobsurati har kisi ko naseeb nahi hoti 🥺✨ | From your Rayyan
            </p>
            <p>
              Tumhare haathon pe woh design, woh color, woh shine… sab kuch perfect hoga, lekin phir bhi sab se zyada khoobsurat tum ho, hamesha ki tarah 💕 | From your Rayyan
            </p>
          </div>

          {/* Playful note */}
          <motion.div
            className="mt-8 p-6 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 192, 203, 0.3), rgba(255, 223, 238, 0.3))',
              border: '2px solid rgba(255, 192, 203, 0.6)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xl md:text-2xl text-pink-900 mb-4">
              Aur haan… tumne pictures bhej ke dil literally khush kar diya 🤍 | From your Rayyan
            </p>
            <p className="text-lg md:text-xl text-pink-800">
              “Khoobsurat haath woh nahi jo sirf mehendi se sajte hain…”
              <br />
              “Khoobsurat woh hote hain jo pyaar, duaa aur narmi se bhare hote hain — bilkul tumhare 🤍✨”
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
