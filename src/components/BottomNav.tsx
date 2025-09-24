import { useState, useEffect } from 'react';

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  // Internal CSS styles
  const styles = {
    container: {
      position: 'fixed' as const,
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '92%',
      maxWidth: '26.25rem',
      zIndex: 110,
    },
    navbar: {
      background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
      backdropFilter: 'blur(24px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '1.5rem',
      padding: '0.25rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    button: {
      position: 'relative' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.5rem 1rem',
      borderRadius: '1rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
    },
    activeButton: {
      backgroundColor: '#ffffff',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    inactiveButton: {
      backgroundColor: 'transparent',
    },
    hoverButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    icon: {
      width: '1.25rem',
      height: '1.25rem',
      transition: 'color 0.3s ease',
    },
    activeIcon: {
      color: '#000000',
    },
    inactiveIcon: {
      color: '#ffffff',
    },
    text: {
      fontSize: '0.75rem',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      letterSpacing: '0.025em',
    },
    activeText: {
      color: '#000000',
      fontWeight: 600,
    },
    inactiveText: {
      color: '#ffffff',
    },
    borderHighlight: {
      position: 'absolute' as const,
      inset: 0,
      borderRadius: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      pointerEvents: 'none' as const,
    },
  };

  // Track active section based on scroll position
  useEffect(() => {
    const tabIds = ['home', 'projects', 'contact'];
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Special case: if near top, activate home
      if (scrollY < 200) {
        setActiveTab('home');
        return;
      }
      
      const sections = tabIds.map(id => document.getElementById(id));
      const scrollPosition = scrollY + window.innerHeight / 2; // Use viewport center

      let currentActiveTab = 'home'; // Default to home

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          // Check if the middle of the viewport is within this section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentActiveTab = tabIds[i];
            break;
          }
          
          // If we're past this section but not in the next one, this is the active section
          if (scrollPosition >= sectionBottom && i === sections.length - 1) {
            currentActiveTab = tabIds[i];
          }
        }
      }

      setActiveTab(currentActiveTab);
    };

    // Use setTimeout to ensure DOM is fully loaded
    const initializeScrollDetection = () => {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position after DOM is ready
    };

    // Wait for next tick to ensure all sections are rendered
    setTimeout(initializeScrollDetection, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (id: string, isActive: boolean) => {
    const iconStyle = {
      ...styles.icon,
      ...(isActive ? styles.activeIcon : styles.inactiveIcon),
    };
    
    switch (id) {
      case 'home':
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'projects':
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'contact':
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    
    // Enhanced scroll behavior for better navigation
    setTimeout(() => {
      const section = document.getElementById(tabId);
      if (section) {
        // Get the navbar element to calculate its actual height
        const navbar = document.querySelector('.bottom-nav-container') as HTMLElement;
        const navbarHeight = navbar ? navbar.offsetHeight + 20 : 140; // Default with padding
        
        // Calculate the target scroll position using getBoundingClientRect for accuracy
        const rect = section.getBoundingClientRect();
        const absoluteTop = window.pageYOffset + rect.top;
        const targetScrollTop = Math.max(0, absoluteTop - navbarHeight);
        
        // Use smooth scrolling with better easing
        window.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
        
        // Update URL hash for better navigation
        if (window.history.replaceState) {
          window.history.replaceState(null, '', `#${tabId}`);
        }
      }
    }, 100); // Small delay to ensure state update
  };

  return (
    <div style={styles.container} className="bottom-nav-container">
      {/* Mobile app-style navbar with frosted glass background */}
      <div style={styles.navbar}>
        <div style={styles.tabContainer}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  ...styles.button,
                  ...(isActive ? styles.activeButton : styles.inactiveButton),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    Object.assign(e.currentTarget.style, styles.hoverButton);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    Object.assign(e.currentTarget.style, styles.inactiveButton);
                  }
                }}
                aria-label={`Navigate to ${tab.label}`}
              >
                {/* Clean icon without background */}
                <div style={{ transition: 'transform 0.3s ease' }}>
                  {getIcon(tab.id, isActive)}
                </div>
                
                {/* Text with conditional color */}
                <span style={{
                  ...styles.text,
                  ...(isActive ? styles.activeText : styles.inactiveText),
                }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Enhanced border highlight */}
        <div style={styles.borderHighlight}></div>
      </div>
    </div>
  );
};

export default BottomNav;