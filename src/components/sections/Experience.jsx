import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <SectionHeading title="Professional Experience" subtitle="My career journey so far" />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform md:-translate-x-1/2"></div>

          {experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-12 md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-dark-bg z-10 shadow-lg"></div>

              {/* Content Card */}
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                <div className="glass-card group">
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm font-medium">
                      <FiCalendar /> {job.duration}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                      <FiMapPin /> {job.location}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-1">
                    {job.role}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                    <FiBriefcase /> {job.company}
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-3 mb-6">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        <FiCheckCircle className="text-primary mt-1 flex-shrink-0" size={16} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-white/10">
                    {job.techStack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 rounded-full text-xs font-medium hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}