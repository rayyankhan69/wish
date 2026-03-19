import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface SurprisePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SurprisePopup({ isOpen, onClose }: SurprisePopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-lg w-full p-10 rounded-3xl pointer-events-auto"
              style={{
                background: 'linear-gradient(135deg, #FFDDEE, #FFC0CB, #FFB6C1)',
                boxShadow: '0 20px 60px rgba(255, 105, 180, 0.6)',
              }}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  className="text-7xl mb-6"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  😌💖
                </motion.div>

                <h3
                  className="text-3xl md:text-4xl text-white mb-6"
                  style={{
                    fontFamily: 'Georgia, serif',
                    textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  }}
                >
                  Hidden Surprise!
                </h3>

                <p
                  className="text-2xl md:text-3xl text-white leading-relaxed"
                  style={{
                    fontFamily: 'Georgia, serif',
                    textShadow: '0 2px 10px rgba(0,0,0,0.15)',
                  }}
                >
                  Smile karo… warna fine lagega 😌💖
                </p>

                <motion.div
                  className="mt-8 flex justify-center gap-4 text-4xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span>✨</span>
                  <span>😊</span>
                  <span>✨</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
