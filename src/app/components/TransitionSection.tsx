import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface TransitionSectionProps {
  onTransition: () => void;
}

export function TransitionSection({ onTransition }: TransitionSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        background: 'linear-gradient(180deg, #FFE4E8 0%, #FFC0CB 50%, #FFB6C1 100%)',
      }}
    >
      {/* Sparkle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
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
            ✨
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.button
          className="group relative px-12 py-6 text-2xl md:text-3xl text-white rounded-full overflow-hidden"
          style={{
            fontFamily: 'Georgia, serif',
            background: 'linear-gradient(135deg, #FF69B4, #FFB6C1, #FFC0CB)',
            boxShadow: '0 10px 40px rgba(255, 105, 180, 0.4)',
          }}
          onClick={onTransition}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 10px 40px rgba(255, 105, 180, 0.4)',
              '0 15px 50px rgba(255, 105, 180, 0.6)',
              '0 10px 40px rgba(255, 105, 180, 0.4)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Button background animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ opacity: 0.3 }}
          />
          
          {/* Button content */}
          <span className="relative flex items-center gap-3">
            Tap for something more special
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-7 h-7" />
            </motion.span>
          </span>
        </motion.button>

        {/* Decorative text */}
        <motion.p
          className="mt-8 text-xl text-white/90"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Tum ready ho? 💖
        </motion.p>
      </motion.div>
    </section>
  );
}
