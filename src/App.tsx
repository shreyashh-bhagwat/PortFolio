import { useState } from 'react';
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

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <Routes>
      <Route path="/" element={
        <div>
          {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
          {!isLoading && (
            <div className="pb-32">
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
                  {/* Mobile Layout */}
                  <div className="lg:hidden flex items-start justify-center">
                    <HeroChatCard />
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
                    <div className="flex justify-center">
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
              <div className="lg:hidden relative z-30">
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

              {/* Row 4: Hire Me (left) + Contact Form (right) */}
              <div className="relative z-50 px-4">
                <div className="max-w-7xl mx-auto">
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="relative z-60">
                      <HireMeSection />
                    </div>
                    <div className="relative z-50">
                      <ContactSection />
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
                    <div className="relative z-60">
                      <HireMeSection />
                    </div>
                    <div className="relative z-50">
                      <ContactSection />
                    </div>
                  </div>
                </div>
              </div>

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
