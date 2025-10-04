import projectSvg from '../assets/project.svg';

const BusinessProjectSection = () => {
  const handleContactClick = () => {
    const section = document.getElementById('contact');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card-elevated p-8 text-center">
          <div className="mb-6">
            <img
              src={projectSvg}
              alt="Business Project Illustration"
              className="mx-auto rounded-lg shadow-lg w-64 h-40 object-contain"
            />
          </div>
          <div className="mb-8">
            <p className="text-white text-lg mb-6 font-medium">Website & App for your business – delivered ready-to-use!</p>
          </div>

          {/* Crime Scene Tape Banner */}
          <div className="relative mb-6 overflow-hidden">
            <div className="h-12 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 relative flex items-center justify-center border-2 border-yellow-600 overflow-hidden">
              {/* Diagonal stripes for crime scene tape effect */}
              <div className="absolute inset-0 opacity-80">
                <div className="absolute inset-0 bg-repeat" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    rgba(255, 193, 7, 0.9) 0px,
                    rgba(255, 193, 7, 0.9) 10px,
                    rgba(255, 152, 0, 0.9) 10px,
                    rgba(255, 152, 0, 0.9) 20px
                  )`
                }}></div>
              </div>
              
              {/* Scrolling headline */}
              <div className="absolute inset-0 overflow-hidden flex items-center" style={{ width: '100%' }}>
                <div className="animate-scroll-headline whitespace-nowrap text-black font-bold text-2xl inline-block" style={{ minWidth: 'max-content' }}>
                  <span className="inline-block px-4">I CAN BUILD WEBSITES & APPS FOR YOUR BUSINESS | मी तुमच्या व्यवसायासाठी वेबसाइट व अॅप् बनवू शकतो | मैं आपके व्यवसाय के लिए वेबसाइट्स और ऐप्स बना सकता हूँ |</span>
                  <span className="inline-block px-4">I CAN BUILD WEBSITES & APPS FOR YOUR BUSINESS | मी तुमच्या व्यवसायासाठी वेबसाइट व अॅप् बनवू शकतो | मैं आपके व्यवसाय के लिए वेबसाइट्स और ऐप्स बना सकता हूँ |</span>
                </div>
              </div>
            </div>
            
            <style>
              {`
                @keyframes scroll-headline {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                .animate-scroll-headline {
                  animation: scroll-headline 28s linear infinite;
                }
              `}
            </style>
          </div>

          <button
            onClick={handleContactClick}
            className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-lg"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default BusinessProjectSection;