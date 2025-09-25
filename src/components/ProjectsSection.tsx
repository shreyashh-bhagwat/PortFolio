import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

const ProjectsSection = () => {
  const [filter, setFilter] = useState<string>('UI/UX');
  const [showConfirmModal, setShowConfirmModal] = useState<Project | null>(null);
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const handleViewMore = (project: Project) => {
    setShowConfirmModal(project);
  };

  const handleLike = (projectId: string) => {
    const newLikedProjects = new Set(likedProjects);
    if (newLikedProjects.has(projectId)) {
      newLikedProjects.delete(projectId);
    } else {
      newLikedProjects.add(projectId);
    }
    setLikedProjects(newLikedProjects);
  };

  return (
  <section id="projects" className="mt-0 pt-0 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Projects</h2>

        {/* Filter Tabs */}
        <div className="flex justify-center space-x-4 mb-10">
          {['UI/UX', 'Web Dev', 'App'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === cat ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-elevated p-4"
            >
              <img src={project.thumbnail} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="bg-white/20 text-white px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleLike(project.id)}
                  className={`text-xl transition-all duration-200 p-2 rounded-full hover:bg-white/10 ${
                    likedProjects.has(project.id) 
                      ? 'text-white' 
                      : 'text-white/60 border border-white/40'
                  }`}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill={likedProjects.has(project.id) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-all duration-200"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleViewMore(project)}
                  className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded transition-colors"
                >
                  View More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-[120] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-black/90 backdrop-blur-xl border-2 border-white/30 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
            style={{
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="text-center">
              {/* Animated Project Illustration */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 20, stiffness: 200 }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                >
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                    className="w-6 h-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                    />
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                    />
                  </motion.svg>
                </motion.div>
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl font-bold text-white mb-3"
              >
                View Project?
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-300 text-sm mb-8 leading-relaxed px-2"
              >
                Do you really want to see <strong>{showConfirmModal.title}</strong>? This will open the project in a new tab.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex gap-3 justify-center"
              >
                <button
                  onClick={() => setShowConfirmModal(null)}
                  className="flex-1 max-w-[120px] px-6 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white rounded-xl transition-all duration-200 font-semibold text-sm shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (showConfirmModal.href) {
                      window.open(showConfirmModal.href, '_blank');
                    }
                    setShowConfirmModal(null);
                  }}
                  className="flex-1 max-w-[120px] px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 text-white rounded-xl transition-all duration-200 font-semibold text-sm shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                >
                  Open Project
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;