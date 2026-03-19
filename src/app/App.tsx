import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { FloatingParticles } from './components/FloatingParticles';
import { OpeningExperience } from './components/OpeningExperience';
import { MessageSection } from './components/MessageSection';
import { MehendiGallery } from './components/MehendiGallery';
import { TransitionSection } from './components/TransitionSection';
import { EidSection } from './components/EidSection';
import { OutfitCheckSection } from './components/OutfitCheckSection';
import { FinalSection } from './components/FinalSection';
import { SurprisePopup } from './components/SurprisePopup';

export default function App() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [showEidSection, setShowEidSection] = useState(false);
  const [showSurprisePopup, setShowSurprisePopup] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  
  const eidSectionRef = useRef<HTMLDivElement>(null);
  const messageSectionRef = useRef<HTMLDivElement>(null);

  // Show surprise popup after 30 seconds
  useEffect(() => {
    if (showMainContent) {
      const timer = setTimeout(() => {
        setShowSurprisePopup(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [showMainContent]);

  const handleOpeningComplete = () => {
    setShowMainContent(true);
    setTimeout(() => {
      messageSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTransition = () => {
    setShowEidSection(true);
    setTimeout(() => {
      eidSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Opening experience */}
      {!showMainContent && <OpeningExperience onComplete={handleOpeningComplete} />}

      {/* Main content */}
      {showMainContent && (
        <>
          {/* Floating particles overlay */}
          <FloatingParticles />

          {/* Music toggle button */}
          <motion.button
            className="fixed top-8 right-8 z-40 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all"
            onClick={() => setIsMusicOn(!isMusicOn)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMusicOn ? (
              <Volume2 className="w-6 h-6 text-pink-600" />
            ) : (
              <VolumeX className="w-6 h-6 text-pink-600" />
            )}
          </motion.button>

          {/* Message Section */}
          <div ref={messageSectionRef}>
            <MessageSection />
          </div>

          {/* Mehendi Gallery */}
          <MehendiGallery />

          {/* Transition Section */}
          <TransitionSection onTransition={handleTransition} />

          {/* Eid Section (revealed after transition) */}
          {showEidSection && (
            <div ref={eidSectionRef}>
              <EidSection />
              <OutfitCheckSection />
              <FinalSection />
            </div>
          )}

          {/* Surprise Popup */}
          <SurprisePopup 
            isOpen={showSurprisePopup} 
            onClose={() => setShowSurprisePopup(false)} 
          />
        </>
      )}
    </div>
  );
}
