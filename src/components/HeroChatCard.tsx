import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import introAudio from '../assets/audio/sample.mp3';

const HeroChatCard = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hi — I'm Shreyash. I'm a UI/UX Designer & Frontend Developer from Kopargaon, Maharashtra. With 2+ years of experience and 50+ completed projects, I design clean, user-first interfaces that convert.";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [runShimmer, setRunShimmer] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Start shimmer only after typing completes and the helper text has had a frame to render
  useEffect(() => {
    let raf1: number | null = null;
    let raf2: number | null = null;
    let timeoutId: number | null = null;
    if (isTypingComplete) {
      // The helper motion span uses transition: delay 0.3s, duration 0.5s -> total 800ms
      // Wait for that reveal animation to finish, then wait two RAFs to ensure DOM paint
      const helperRevealMs = 800;
      timeoutId = window.setTimeout(() => {
        raf1 = requestAnimationFrame(() => {
          raf2 = requestAnimationFrame(() => {
            setRunShimmer(true);
          });
        });
      }, helperRevealMs);
    } else {
      setRunShimmer(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [isTypingComplete]);

  // Internal CSS styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: '1rem',
      maxWidth: '28rem',
      transition: 'all 1s ease-in-out',
    },
    containerCentered: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
    },
    containerTop: {
      marginTop: '7%',
    },
    card: {
      background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      backdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '1rem',
      padding: '1rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative' as const,
      maxWidth: '24rem',
    },
    avatar: {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      backgroundColor: '#d1d5db',
      overflow: 'hidden' as const,
      marginBottom: '1rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      border: '2px solid rgba(255, 255, 255, 0.15)',
      transition: 'all 0.3s ease',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    text: {
      color: '#ffffff',
      fontSize: '0.875rem',
      lineHeight: 1.625,
      margin: 0,
    },
    cursor: {
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    audioButton: {
      position: 'absolute' as const,
      bottom: '0.5rem',
      right: '0.5rem',
      background: 'rgba(255, 0, 0, 0.8)', // Temporary red background for debugging
      borderRadius: '50%',
      width: '3rem',
      height: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      zIndex: 20,
    },
  };

  // Typing animation effect
  useEffect(() => {
    let i = 0;
    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeTimer);
        setIsTypingComplete(true);
      }
    }, 30); // Speed of typing (30ms per character)

    return () => clearInterval(typeTimer);
  }, [fullText]);

  // Toggle mute/unmute function
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        marginTop: '7%'
      }}
      transition={{ 
        duration: 0.8,
        marginTop: { duration: 1.2, ease: "easeInOut" }
      }}
      style={{
        ...styles.container,
        ...styles.containerTop,
      }}
    >
      {/* Chat Bubble */}
      <div style={styles.card}>
        {/* Audio Button - Shows after typing completes */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isTypingComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={toggleAudio}
          style={styles.audioButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? (
            // Temporary text icon for debugging
            <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>🔇</span>
          ) : (
            // Temporary text icon for debugging
            <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>🔊</span>
          )}
        </motion.button>        {/* Profile Picture inside bubble */}
        <div style={styles.avatar}>
          <img src={logo} alt="Shreyash Bhagwat" style={styles.avatarImage} />
        </div>
        <p style={styles.text}>
          {displayText}
          {isTypingComplete && <span style={styles.cursor}>|</span>}
          {isTypingComplete && (
            <>
              <br />
              <br />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  fontSize: '0.625rem',
                  color: '#9ca3af',
                  fontStyle: 'italic',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                {/* Solid base text */}
                <span style={{ position: 'relative', zIndex: 1, color: '#9ca3af', display: 'inline-block', padding: '0.125rem 0.5rem', whiteSpace: 'nowrap' }}>
                  Click the speaker to hear my introduction in मराठी 🎵
                </span>

                {/* Gradient text layer (absolute) clipped to glyphs so shimmer appears only inside text) */}
                <span
                    aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: 2,
                    display: 'inline-block',
                    padding: '0.125rem 0.5rem',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    boxSizing: 'content-box',
                    /* narrower, brighter core with warm-gold halo for clearer highlight */
                    background: 'linear-gradient(110deg, rgba(255,255,255,0) 45%, rgba(255,255,255,1) 49%, rgba(250, 250, 249, 1) 51%, rgba(255, 255, 255, 1) 55%)',
                    /* smaller backgroundSize makes the moving highlight narrower and easier to spot */
                    backgroundSize: '250% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    animation: runShimmer ? 'shimmer-text 4s ease-in-out forwards' : 'none'
                  }}
                >
                  Click the speaker to hear my introduction in मराठी 🎵
                </span>

                <style>
                  {`@keyframes shimmer-text {
                      0% { background-position: 150% 0; opacity: 1; }
                      60% { background-position: -20% 0; opacity: 1; }
                      100% { background-position: -150% 0; opacity: 0; }
                    }
                  `}
                </style>
              </motion.span>
            </>
          )}
        </p>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={introAudio}
          preload="none"
          onEnded={() => setIsMuted(true)}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </motion.div>
  );
};

export default HeroChatCard;