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

const PASSWORD_SHA256_HEX = '9e878ea4233fab85f27eefe4791cd66f77729c2d2de966637428e635756b9782';

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);

  const [showMainContent, setShowMainContent] = useState(false);
  const [showEidSection, setShowEidSection] = useState(false);
  const [showSurprisePopup, setShowSurprisePopup] = useState(false);
  const [isAnyVoicePlaying, setIsAnyVoicePlaying] = useState(false);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  const eidSectionRef = useRef<HTMLDivElement>(null);
  const messageSectionRef = useRef<HTMLDivElement>(null);

  const tryPlayBgMusic = useCallback(async () => {
    if (!isUnlocked) return;
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
    if (!isUnlocked) return;
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
  }, [isUnlocked, tryPlayBgMusic]);

  // Start (or resume) bg music when possible.
  useEffect(() => {
    if (!isUnlocked) return;
    if (isAnyVoicePlaying) {
      bgAudioRef.current?.pause();
      return;
    }
    void tryPlayBgMusic();
  }, [isUnlocked, isAnyVoicePlaying, tryPlayBgMusic]);

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

  const handleUnlock = useCallback(async () => {
    setPasswordError(null);
    setIsCheckingPassword(true);
    try {
      const hash = await sha256Hex(passwordInput);
      if (hash !== PASSWORD_SHA256_HEX) {
        setPasswordError('Wrong password');
        return;
      }

      setIsUnlocked(true);
      setPasswordInput('');
      setPasswordError(null);

      // Start music directly from this user gesture (more reliable on mobile browsers).
      const audio = bgAudioRef.current;
      if (audio && !isAnyVoicePlaying) {
        audio.volume = 0.25;
        audio.loop = true;
        audio.play().catch(() => {
          // If blocked, the existing gesture retry effect will handle it after unlock.
        });
      }
    } finally {
      setIsCheckingPassword(false);
    }
  }, [isAnyVoicePlaying, passwordInput]);

  return (
    <div className="relative w-full overflow-x-hidden">
      <audio ref={bgAudioRef} src={bgMusicSrc} preload="auto" playsInline />

      {!isUnlocked && (
        <div
          className="min-h-screen w-full flex items-center justify-center px-6 py-20"
          style={{ background: 'linear-gradient(135deg, #FFDDEE 0%, #FFC0CB 50%, #FFB6C1 100%)' }}
        >
          <div
            className="w-full max-w-md rounded-3xl p-8 md:p-10"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 10px 40px rgba(255, 105, 180, 0.25)',
            }}
          >
            <h1
              className="text-3xl md:text-4xl text-pink-900 text-center mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Enter Password
            </h1>

            <div className="space-y-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void handleUnlock();
                }}
                placeholder="Password"
                className="w-full px-5 py-4 rounded-2xl text-pink-900 placeholder:text-pink-700/60 outline-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.55)',
                  border: '2px solid rgba(255, 182, 193, 0.6)',
                  fontFamily: 'Georgia, serif',
                }}
              />

              {passwordError && (
                <p className="text-center text-pink-900" style={{ fontFamily: 'Georgia, serif' }}>
                  {passwordError}
                </p>
              )}

              <button
                type="button"
                onClick={() => void handleUnlock()}
                disabled={isCheckingPassword || !passwordInput}
                className="w-full px-6 py-4 rounded-2xl text-white text-lg disabled:opacity-60"
                style={{
                  fontFamily: 'Georgia, serif',
                  background: 'linear-gradient(135deg, #FF69B4, #FFB6C1, #FFC0CB)',
                  boxShadow: '0 10px 40px rgba(255, 105, 180, 0.35)',
                }}
              >
                {isCheckingPassword ? 'Checking…' : 'Unlock 💖'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Opening experience */}
      {isUnlocked && !showMainContent && <OpeningExperience onComplete={handleOpeningComplete} />}

      {/* Main content */}
      {isUnlocked && showMainContent && (
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
