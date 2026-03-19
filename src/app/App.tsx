import { useRef, useState, useEffect, useCallback } from 'react';
import { FloatingParticles } from './components/FloatingParticles';
import { OpeningExperience } from './components/OpeningExperience';
import { MessageSection } from './components/MessageSection';
import { MehendiGallery } from './components/MehendiGallery';
import { TransitionSection } from './components/TransitionSection';
import { EidSection } from './components/EidSection';
import { OutfitCheckSection } from './components/OutfitCheckSection';
import { FinalSection } from './components/FinalSection';
import { VoiceMessageSection } from './components/VoiceMessageSection';
import { SurprisePopup } from './components/SurprisePopup';

import bgMusicSrc from '../assets/voices/Perfect-(Mr-Jat.in).mp3';

export default function App() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [showEidSection, setShowEidSection] = useState(false);
  const [showSurprisePopup, setShowSurprisePopup] = useState(false);
  const [isAnyVoicePlaying, setIsAnyVoicePlaying] = useState(false);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  const eidSectionRef = useRef<HTMLDivElement>(null);
  const messageSectionRef = useRef<HTMLDivElement>(null);

  const tryPlayBgMusic = useCallback(async () => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    if (isAnyVoicePlaying) return;

    audio.volume = 0.25;
    audio.loop = true;

    try {
      await audio.play();
    } catch {
      // Autoplay may be blocked; we'll retry on first user interaction.
    }
  }, [isAnyVoicePlaying]);

  useEffect(() => {
    const onFirstUserGesture = () => {
      void tryPlayBgMusic();
      window.removeEventListener('pointerdown', onFirstUserGesture);
      window.removeEventListener('keydown', onFirstUserGesture);
      window.removeEventListener('touchstart', onFirstUserGesture);
    };

    window.addEventListener('pointerdown', onFirstUserGesture, { once: true });
    window.addEventListener('keydown', onFirstUserGesture, { once: true });
    window.addEventListener('touchstart', onFirstUserGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', onFirstUserGesture);
      window.removeEventListener('keydown', onFirstUserGesture);
      window.removeEventListener('touchstart', onFirstUserGesture);
    };
  }, [tryPlayBgMusic]);

  // Start (or resume) bg music when possible.
  useEffect(() => {
    if (isAnyVoicePlaying) {
      bgAudioRef.current?.pause();
      return;
    }
    void tryPlayBgMusic();
  }, [isAnyVoicePlaying, tryPlayBgMusic]);

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
      <audio ref={bgAudioRef} src={bgMusicSrc} preload="auto" playsInline />

      {/* Opening experience */}
      {!showMainContent && <OpeningExperience onComplete={handleOpeningComplete} />}

      {/* Main content */}
      {showMainContent && (
        <>
          {/* Floating particles overlay */}
          <FloatingParticles />

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
              <VoiceMessageSection
                onAnyVoicePlayingChange={(isPlaying) => setIsAnyVoicePlaying(isPlaying)}
                onVoicePlayRequest={() => {
                  // Stop bg music immediately when user taps play.
                  bgAudioRef.current?.pause();
                }}
                onVoiceStop={() => {
                  // Resume after voice ends/pauses (if autoplay was blocked earlier,
                  // the voice click counts as a user gesture and this will succeed).
                  void tryPlayBgMusic();
                }}
              />
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
