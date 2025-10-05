import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
import HeroChatCard from './components/HeroChatCard';
import BottomNav from './components/BottomNav';
import ProjectsSection from './components/ProjectsSection';
import LatestProjectSection from './components/LatestProjectSection';
import ContactSection from './components/ContactSection';
import BusinessProjectSection from './components/BusinessProjectSection';
import SocialLinksSection from './components/SocialLinksSection';
import Footer from './components/Footer';
import HireMeSection from './components/HireMeSection';
import LoadingScreen from './components/LoadingScreen';
import NotFound from './components/NotFound';
import bgVideo from './assets/bg.mp4';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const applyPadding = () => {
      const contentEl = contentRef.current;
      const navbar = document.querySelector('.bottom-nav-container') as HTMLElement | null;
      if (!contentEl) return;
      if (navbar) {
        const navHeight = navbar.offsetHeight + 16; // add small gap
        contentEl.style.paddingBottom = `${navHeight + 24}px`; // ensure extra space for footer
      } else {
        contentEl.style.paddingBottom = '';
      }
    };

    applyPadding();
    window.addEventListener('resize', applyPadding);

    // Observe DOM changes in case bottom nav height changes dynamically
    const observer = new MutationObserver(() => applyPadding());
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    const t = window.setTimeout(applyPadding, 300);
    return () => {
      window.removeEventListener('resize', applyPadding);
      observer.disconnect();
      clearTimeout(t);
    };
  }, [contentRef]);

  return (
    <Routes>
      <Route path="/" element={
        <div>
          {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
          {!isLoading && (
            <div className="pb-32" ref={contentRef}>
              {/* contentRef is used to add bottom padding equal to bottom nav height so footer remains visible */}
              {/* Background Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed top-0 left-0 w-full h-full object-cover z-[-100]"
              >
                <source src={bgVideo} type="video/mp4" />
              </video>

              {/* Overlay for better text readability */}
              <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-10"></div>

              <AnimatedBackground />

              {/* Row 1: Hero Section (left) + Connect With Me (right) */}
              <section id="home" className="px-4 pb-0 pt-[7vh] mb-0 relative z-20">
                <div className="max-w-7xl mx-auto">
                  {/* Mobile Layout - Only Hero */}
                  <div className="mobile-hero-only">
                    <HeroChatCard />
                  </div>
                  
                  {/* Desktop Layout - Hero left, Connect right */}
                  <div style={{ 
                    display: 'none',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '3rem',
                    alignItems: 'start'
                  }} className="desktop-row-1">
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <HeroChatCard />
                    </div>
                    <div className="relative z-30">
                      <SocialLinksSection />
                    </div>
                  </div>
                </div>
              </section>

              {/* Latest Project Banner */}
              <div className="relative z-30">
                <LatestProjectSection />
              </div>

              {/* Mobile Connect With Me (only shown on mobile) */}
              <div className="mobile-social-only relative z-30">
                <SocialLinksSection />
              </div>

              {/* Row 2: Projects Section */}
              <div className="relative z-40">
                <ProjectsSection />
              </div>

              {/* Row 3: Business Projects Section */}
              <div className="relative z-35">
                <BusinessProjectSection />
              </div>

              {/* Row 4: Hire Me (left) + Contact Form (right) on desktop */}
              <div className="relative z-50 px-4">
                <div className="max-w-7xl mx-auto">
                  {/* Mobile Layout - keep original order */}
                  <div className="mobile-contact-hire">
                    <div className="relative z-60">
                      <HireMeSection />
                    </div>
                    <div className="relative z-50">
                      <ContactSection />
                    </div>
                  </div>
                  
                  {/* Desktop Layout - Hire Me left, Contact right */}
                  <div style={{ 
                    display: 'none',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '3rem',
                    alignItems: 'start'
                  }} className="desktop-contact-hire">
                    <div className="relative z-60">
                      <HireMeSection />
                    </div>
                    <div className="relative z-50">
                      <ContactSection />
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer to ensure footer sits below the fixed bottom nav (reduced) */}
              <div style={{ height: 64 }} className="w-full" aria-hidden="true" />
              <div className="relative z-70 mb-20">
                <Footer />
              </div>

              <BottomNav />
            </div>
          )}
        </div>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
