import { motion } from 'framer-motion';
import resumePdf from '../assets/Shreyash_Fullstack.pdf';

const HireMeSection = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Shreyash_Bhagwat_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.section
      className="py-16 px-4 lg:px-0 lg:py-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center lg:text-left lg:max-w-none">
        <motion.h2
          className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Hire Me
        </motion.h2>

        <motion.p
          className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to bring your ideas to life? Let's work together to create something amazing.
        </motion.p>

        <motion.button
          onClick={handleDownloadResume}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📄 Download Resume
        </motion.button>
      </div>
    </motion.section>
  );
};

export default HireMeSection;