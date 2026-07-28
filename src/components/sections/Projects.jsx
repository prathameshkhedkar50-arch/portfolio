import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

const ProjectCard = ({ project }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="glass-card group relative overflow-hidden flex flex-col h-full"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
          Featured
        </div>
      )}

      {/* Image Area with Premium Fallback */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gray-200 dark:bg-gray-800">
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 text-primary">
            <FiCode size={48} className="mb-2 opacity-80" />
            <span className="text-xs font-mono opacity-60">Preview Unavailable</span>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-full text-gray-900 hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <FiGithub size={20} />
          </a>
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full text-gray-900 hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
              aria-label={`View live demo of ${project.title}`}
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
            {project.category} • {project.year}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
            {project.status}
          </span>
        </div>

        <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md border border-gray-200 dark:border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className={`flex gap-3 mt-auto pt-4 border-t border-gray-200 dark:border-white/10 ${!project.live || project.live === '#' ? 'justify-center' : ''}`}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm font-medium ${!project.live || project.live === '#' ? 'flex-1' : 'flex-1'}`}
          >
            <FiGithub /> Code
          </a>
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium"
            >
              <FiExternalLink /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter and sort projects (featured first)
  const filteredProjects = useMemo(() => {
    let filtered = activeFilter === 'All'
      ? projects.items
      : projects.items.filter(p => 
          p.category === activeFilter || 
          p.tech.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );
    
    // Sort featured projects to the top
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [activeFilter, projects.items]);

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title={projects.title}
          subtitle={projects.subtitle}
          description={projects.description}
        />

        {/* Project Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {projects.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card text-center p-4"
            >
              <div className="text-2xl sm:text-3xl font-bold text-primary font-poppins mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {projects.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No projects found for this filter.
          </div>
        )}
      </div>
    </section>
  );
}