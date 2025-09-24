import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const HeroChatCard = () => {
  const [displayText, setDisplayText] = useState('');
  const [showTyping, setShowTyping] = useState(true);
  const fullText = "Hi — I'm Shreyash. I'm a UI/UX Designer & Frontend Developer from Kopargaon, Maharashtra. With 2+ years of experience and 50+ completed projects, I design clean, user-first interfaces that convert.";
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Add CSS animations to head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce {
        0%, 100% {
          transform: translateY(-25%);
          animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
          transform: translateY(0);
          animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
      }
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
      overflow: 'hidden' as const,
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
    typingContainer: {
      display: 'flex',
      gap: '0.25rem',
    },
    typingDot: {
      width: '0.5rem',
      height: '0.5rem',
      backgroundColor: '#9ca3af',
      borderRadius: '50%',
      animation: 'bounce 1s infinite',
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
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowTyping(false);
      setDisplayText(fullText);
      return;
    }
    const timer = setTimeout(() => {
      setShowTyping(false);
      let i = 0;
      const typeTimer = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeTimer);
        }
      }, 50);
      return () => clearInterval(typeTimer);
    }, 800);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        marginTop: showTyping ? '0' : '7%'
      }}
      transition={{ 
        duration: 0.8,
        marginTop: { duration: 1.2, ease: "easeInOut" }
      }}
      style={{
        ...styles.container,
        ...(showTyping ? styles.containerCentered : styles.containerTop),
      }}
    >
      {/* Chat Bubble */}
      <div style={styles.card}>
        {/* Profile Picture inside bubble */}
        <div style={styles.avatar}>
          <img src={logo} alt="Shreyash Bhagwat" style={styles.avatarImage} />
        </div>
        {showTyping ? (
          <div style={styles.typingContainer}>
            <div style={{ ...styles.typingDot, animationDelay: '0s' }}></div>
            <div style={{ ...styles.typingDot, animationDelay: '0.1s' }}></div>
            <div style={{ ...styles.typingDot, animationDelay: '0.2s' }}></div>
          </div>
        ) : (
          <p style={styles.text}>
            {displayText}
            <span style={styles.cursor}>|</span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default HeroChatCard;