import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

const ProjectsSection = () => {
  const [filter, setFilter] = useState<string>('UI/UX');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectStats, setProjectStats] = useState<Record<string, { views: number; likes: number }>>({});

  useEffect(() => {
    const stored = localStorage.getItem('projectStats');
    if (stored) {
      setProjectStats(JSON.parse(stored));
    } else {
      const initial = projects.reduce((acc, p) => {
        acc[p.id] = { views: p.views, likes: p.likes };
        return acc;
      }, {} as Record<string, { views: number; likes: number }>);
      setProjectStats(initial);
    }
  }, []);

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const handleViewMore = (project: Project) => {
    setSelectedProject(project);
    const newStats = { ...projectStats };
    newStats[project.id].views += 1;
    setProjectStats(newStats);
    localStorage.setItem('projectStats', JSON.stringify(newStats));
  };

  const handleLike = (projectId: string) => {
    const newStats = { ...projectStats };
    newStats[projectId].likes += 1;
    setProjectStats(newStats);
    localStorage.setItem('projectStats', JSON.stringify(newStats));
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="text-gray-400 text-sm">
                  {projectStats[project.id]?.views || project.views} views
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleLike(project.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    👍 {projectStats[project.id]?.likes || project.likes}
                  </button>
                  <button
                    onClick={() => handleViewMore(project)}
                    className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded transition-colors"
                  >
                    View More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="card-elevated bg-white p-6 max-w-2xl w-full max-h-80vh overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedProject.thumbnail} alt={selectedProject.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">{selectedProject.title}</h3>
            <p className="text-gray-300 mb-4">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tech.map((tech) => (
                <span key={tech} className="bg-white/20 text-white px-2 py-1 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;