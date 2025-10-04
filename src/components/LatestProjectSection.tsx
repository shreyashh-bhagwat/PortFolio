import { motion } from 'framer-motion';
import { latestProject } from '../data/projects';

const LatestProjectSection = () => {
  return (
    <>
      <style>
        {`
          @keyframes shimmer-latest {
            0% {
              transform: translateX(-100%) skewX(-20deg);
            }
            100% {
              transform: translateX(120%) skewX(-20deg);
            }
          }
          .shine-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            /* polished warm-gold highlight with a narrow bright-white core */
            background: linear-gradient(110deg,
              rgba(255,255,255,0) 8%,
              rgba(215, 163, 8, 0.64) 46%,
              rgba(255, 194, 25, 0.37) 54%,
              rgba(255,255,255,0) 92%
            );
            /* snappier shimmer so the highlight reads clearly */
            animation: shimmer-latest 1.2s linear infinite;
            pointer-events: none;
            border-radius: 0.5rem;
            width: 180%;
            transform: translateX(-100%) skewX(-20deg);
            /* make the shine visually brighter over the card */
            mix-blend-mode: screen;
          }
        `}
      </style>
      <section className="py-6 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-yellow-500/10 backdrop-blur-md rounded-lg py-5 px-4 shadow-xl border border-yellow-500/20 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 50%, rgba(255, 193, 7, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="shine-overlay"></div>
            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-sm font-medium text-white">
                Watchout my Latest Project
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(latestProject.deployedUrl, '_blank')}
                className="bg-white hover:bg-gray-50 text-black font-medium py-1 px-3 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl text-xs border border-gray-200 flex items-center gap-2"
              >
                <span>Open</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestProjectSection;