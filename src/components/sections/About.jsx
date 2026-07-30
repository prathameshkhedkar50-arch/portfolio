import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiClock, FiGlobe, FiCode, FiLayers, FiDatabase, FiCheckCircle } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

/**
 * About Section – Premium 3D Polish with Grid Consistency
 * 
 * Features:
 * - Consistent card dimensions within groups (Info cards match, Expertise cards match)
 * - Internal alignment for Expertise cards (icon, heading, description)
 * - Subtle entrance animations with stagger
 * - Consistent hover lift and scale interactions
 * - Responsive layout preserved
 */
export default function About() {
  const { about } = portfolioData;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const iconMap = {
    FiMapPin: <FiMapPin size={20} />,
    FiBriefcase: <FiBriefcase size={20} />,
    FiClock: <FiClock size={20} />,
    FiGlobe: <FiGlobe size={20} />,
    FiCode: <FiCode size={24} />,
    FiLayers: <FiLayers size={24} />,
    FiDatabase: <FiDatabase size={24} />,
    FiCheckCircle: <FiCheckCircle size={24} />
  };

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title={about.title}
          subtitle={about.subtitle}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Professional Summary Card */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -4, scale: 1.005 }}
              className="glass-card p-6 sm:p-8 group w-full"
            >
              <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                Professional Summary
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {about.summary}
              </p>
            </motion.div>

            {/* Information Cards Grid - All 4 cards identical size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              {about.personalInfo.map((info, index) => {
                const Icon = iconMap[info.icon] || <FiMapPin size={20} />;
                return (
                  <motion.div
                    key={info.label}
                    custom={index + 1}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card p-5 flex items-start gap-4 group cursor-default h-full"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md flex-shrink-0">
                      {Icon}
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        {info.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white break-words">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN – Expertise Cards - All 4 cards identical size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            {about.highlights.map((highlight, index) => {
              const Icon = iconMap[highlight.icon] || <FiCode size={24} />;
              return (
                <motion.div
                  key={highlight.title}
                  custom={index + 5}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-card p-6 flex flex-col items-start gap-4 group cursor-default h-full"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 text-primary group-hover:from-primary group-hover:to-secondary group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-lg flex-shrink-0">
                    {Icon}
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h4 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors leading-tight">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}