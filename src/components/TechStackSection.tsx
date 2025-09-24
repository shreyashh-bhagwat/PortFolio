import { motion } from 'framer-motion';

const TechStackSection = () => {
  const techStack = [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'JavaScript', icon: '�', color: '#F7DF1E' },
    { name: 'Node.js', icon: '�', color: '#339933' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'Express', icon: '⚡', color: '#000000' },
    { name: 'Figma', icon: '🎨', color: '#F24E1E' },
    { name: 'React Native', icon: '📱', color: '#61DAFB' },
    { name: 'Photoshop', icon: '🖼️', color: '#31A8FF' },
    { name: 'HTML/CSS', icon: '🌐', color: '#E34F26' },
    { name: 'Hostinger', icon: '🏗️', color: '#FF6600' }
  ];

  return (
    <motion.section 
      className="py-12 px-4 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            🚀 Tech Stack
          </h2>
          <p className="text-gray-300 text-lg">Technologies I use to build amazing projects</p>
        </motion.div>

        {/* Hexagonal Grid Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Row 1 - 3 items */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-6">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={techStack[index].name}
                  className="tech-hex-card"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 15,
                    z: 50
                  }}
                  viewport={{ once: true }}
                >
                  <div className="tech-hex-content">
                    <div 
                      className="text-3xl mb-2"
                      style={{ color: techStack[index].color }}
                    >
                      {techStack[index].icon}
                    </div>
                    <div className="text-white text-xs font-semibold text-center">
                      {techStack[index].name}
                    </div>
                  </div>
                  <div 
                    className="tech-hex-glow"
                    style={{ 
                      background: `radial-gradient(circle, ${techStack[index].color}20, transparent)`
                    }}
                  ></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 2 - 4 items */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-6">
              {[3, 4, 5, 6].map((index, i) => (
                <motion.div
                  key={techStack[index].name}
                  className="tech-hex-card"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: (i + 3) * 0.1,
                    duration: 0.6,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 15,
                    z: 50
                  }}
                  viewport={{ once: true }}
                >
                  <div className="tech-hex-content">
                    <div 
                      className="text-3xl mb-2"
                      style={{ color: techStack[index].color }}
                    >
                      {techStack[index].icon}
                    </div>
                    <div className="text-white text-xs font-semibold text-center">
                      {techStack[index].name}
                    </div>
                  </div>
                  <div 
                    className="tech-hex-glow"
                    style={{ 
                      background: `radial-gradient(circle, ${techStack[index].color}20, transparent)`
                    }}
                  ></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 3 - 3 items */}
          <div className="flex justify-center">
            <div className="flex space-x-6">
              {[7, 8, 9].map((index, i) => (
                <motion.div
                  key={techStack[index].name}
                  className="tech-hex-card"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: (i + 7) * 0.1,
                    duration: 0.6,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 15,
                    z: 50
                  }}
                  viewport={{ once: true }}
                >
                  <div className="tech-hex-content">
                    <div 
                      className="text-3xl mb-2"
                      style={{ color: techStack[index].color }}
                    >
                      {techStack[index].icon}
                    </div>
                    <div className="text-white text-xs font-semibold text-center">
                      {techStack[index].name}
                    </div>
                  </div>
                  <div 
                    className="tech-hex-glow"
                    style={{ 
                      background: `radial-gradient(circle, ${techStack[index].color}20, transparent)`
                    }}
                  ></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TechStackSection;