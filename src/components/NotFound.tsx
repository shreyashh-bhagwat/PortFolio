import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const monkeyVariants = {
    initial: { y: -20, rotate: 0 },
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="text-center relative z-10 max-w-md mx-auto">
        {/* Monkey Animation */}
        <motion.div
          variants={monkeyVariants}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <div className="text-9xl mb-4">🐒</div>
        </motion.div>

        {/* 404 Text */}
        <motion.div variants={textVariants} initial="initial" animate="animate">
          <h1 className="text-8xl font-bold text-white mb-4 font-mono">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Oops! Page Not Found</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Looks like this monkey got lost in the digital jungle! The page you're looking for doesn't exist.
          </p>
        </motion.div>

        {/* Go Back Button */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-200 text-lg"
        >
          🏠 Go Back Home
        </motion.button>
      </div>
    </div>
  );
};

export default NotFound;