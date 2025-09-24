import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,0 Q250,100 500,0 T1000,0 L1000,1000 L0,1000 Z"
          fill="url(#gradient1)"
          animate={prefersReducedMotion ? {} : {
            d: [
              "M0,0 Q250,100 500,0 T1000,0 L1000,1000 L0,1000 Z",
              "M0,0 Q300,200 500,100 T1000,50 L1000,1000 L0,1000 Z",
              "M0,0 Q200,150 500,50 T1000,100 L1000,1000 L0,1000 Z",
              "M0,0 Q250,100 500,0 T1000,0 L1000,1000 L0,1000 Z"
            ]
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0,200 Q300,300 600,200 T1000,300 L1000,1000 L0,1000 Z"
          fill="url(#gradient2)"
          animate={prefersReducedMotion ? {} : {
            d: [
              "M0,200 Q300,300 600,200 T1000,300 L1000,1000 L0,1000 Z",
              "M0,250 Q350,400 600,300 T1000,350 L1000,1000 L0,1000 Z",
              "M0,150 Q250,250 600,150 T1000,250 L1000,1000 L0,1000 Z",
              "M0,200 Q300,300 600,200 T1000,300 L1000,1000 L0,1000 Z"
            ]
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;