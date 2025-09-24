import projectSvg from '../assets/project.svg';

const BusinessProjectSection = () => {
  const handleContactClick = () => {
    const section = document.getElementById('contact');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-spacing px-4">
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
            <p className="text-white text-lg mb-4 font-medium">तुमच्या व्यवसायासाठी वेबसाईट आणि ॲप – तयार करून मिळेल!</p>
            <p className="text-white text-lg mb-4 font-medium">आपके व्यवसाय के लिए वेबसाइट और ऐप – तैयार करके मिलेगा!</p>
            <p className="text-white text-lg mb-6 font-medium">Website & App for your business – delivered ready-to-use!</p>
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