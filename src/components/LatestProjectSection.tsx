import { motion } from 'framer-motion';
import { latestProject } from '../data/projects';

const LatestProjectSection = () => {
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              background: linear-gradient(90deg, transparent 0%, rgba(255, 193, 7, 0.3) 30%, rgba(255, 152, 0, 0.5) 50%, rgba(255, 193, 7, 0.3) 70%, transparent 100%);
              background-size: 200% 100%;
              background-position: -200% 0;
            }
            100% {
              background: linear-gradient(90deg, transparent 0%, rgba(255, 193, 7, 0.3) 30%, rgba(255, 152, 0, 0.5) 50%, rgba(255, 193, 7, 0.3) 70%, transparent 100%);
              background-size: 200% 100%;
              background-position: 200% 0;
            }
          }
          .shine-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            animation: shimmer 3s ease-in-out infinite;
            pointer-events: none;
            border-radius: 0.5rem;
          }
        `}
      </style>
      <section className="py-6 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-yellow-500/10 backdrop-blur-md rounded-lg py-5 px-4 shadow-xl border border-yellow-500/20 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 50%, rgba(255, 193, 7, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px 0 rgba(255, 193, 7, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="shine-overlay"></div>
            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-base font-bold text-white">
                Watchout my Latest Project
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(latestProject.deployedUrl, '_blank')}
                className="bg-white hover:bg-gray-50 text-black font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl text-sm border border-gray-200 flex items-center gap-2"
              >
                <span>Open</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LatestProjectSection;