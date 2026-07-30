import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { ProjectCard } from '../cards/ProjectCard';
import { portfolioData } from '../../data/portfolioData';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function Projects() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects = useMemo(() => {
    let filtered = activeFilter === 'All' 
      ? projects.items 
      : projects.items.filter(p => 
          p.category === activeFilter || 
          p.tech.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );
    
    // Featured projects first
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [activeFilter, projects.items]);

  const displayProjects = isMobile && !showAllProjects 
    ? filteredProjects.slice(0, 3) 
    : filteredProjects;

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title={projects.title}
          subtitle={projects.subtitle}
          description={projects.description}
        />

        {/* Statistics */}
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
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} index={0} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mobile View More */}
        {isMobile && filteredProjects.length > 3 && (
          <div className="mt-8 text-center lg:hidden">
            <button 
              onClick={() => setShowAllProjects(!showAllProjects)} 
              className="btn-secondary inline-flex items-center gap-2"
            >
              {showAllProjects ? (
                <>Show Less Projects <FiChevronUp /></>
              ) : (
                <>View More Projects <FiChevronDown /></>
              )}
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No projects found for this filter.
          </div>
        )}
      </div>
    </section>
  );
}