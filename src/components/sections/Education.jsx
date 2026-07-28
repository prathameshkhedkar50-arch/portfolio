import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiAward, FiBookOpen } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

const iconMap = {
  FiAward: <FiAward size={24} />,
  FiBookOpen: <FiBookOpen size={24} />
};

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="section-padding bg-gray-50/50 dark:bg-dark-surface/30">
      <div className="container-custom">
        <SectionHeading title="Education" subtitle="My academic background" />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform md:-translate-x-1/2"></div>

          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-12 md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-white dark:border-dark-bg z-10 shadow-lg"></div>

              {/* Content Card */}
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                <div className="glass-card group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary group-hover:scale-110 transition-transform duration-300">
                      {iconMap[edu.icon]}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-mono">
                      <FiCalendar /> {edu.duration}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">
                    {edu.institution}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <FiMapPin /> {edu.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <FiAward /> {edu.grade}
                    </div>
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