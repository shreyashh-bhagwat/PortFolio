import AnimatedBackground from './components/AnimatedBackground';
import HeroChatCard from './components/HeroChatCard';
import BottomNav from './components/BottomNav';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import BusinessProjectSection from './components/BusinessProjectSection';
import SocialLinksSection from './components/SocialLinksSection';
import DinoGame from './components/DinoGame';
import TechStackSection from './components/TechStackSection';
import Footer from './components/Footer';
import HireMeSection from './components/HireMeSection';
import bgVideo from './assets/bg.mp4';

function App() {
  return (
    <div className="min-h-screen app-bg relative">
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

      {/* Hero Section */}
      <section id="home" className="flex items-start justify-center px-4 pb-0 pt-[7vh] mb-0 relative z-20">
        <HeroChatCard />
      </section>

      <div className="relative z-35">
        <SocialLinksSection />
      </div>
      <div className="relative z-30">
        <ProjectsSection />
      </div>
      <BusinessProjectSection />
      <DinoGame />
      <TechStackSection />
      <div className="relative z-40">
        <ContactSection />
      </div>

      <div className="relative z-45">
        <HireMeSection />
      </div>

      <div className="relative z-50">
        <Footer />
      </div>

      <BottomNav />
    </div>
  );
}

export default App;
