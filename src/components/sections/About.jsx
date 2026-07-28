import { motion } from 'framer-motion';
import { 
  FiCode, FiLayers, FiDatabase, FiCheckCircle, 
  FiMapPin, FiBriefcase, FiClock, FiGlobe 
} from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

const iconMap = {
  FiCode: <FiCode size={24} />,
  FiLayers: <FiLayers size={24} />,
  FiDatabase: <FiDatabase size={24} />,
  FiCheckCircle: <FiCheckCircle size={24} />,
  FiMapPin: <FiMapPin size={20} />,
  FiBriefcase: <FiBriefcase size={20} />,
  FiClock: <FiClock size={20} />,
  FiGlobe: <FiGlobe size={20} />
};

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="section-padding bg-gray-50/50 dark:bg-dark-surface/30">
      <div className="container-custom">
        <SectionHeading title={about.title} subtitle={about.subtitle} />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Summary & Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-card">
              <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
                Professional Summary
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {about.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {about.personalInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card flex items-center gap-4 p-4"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    {iconMap[info.icon]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {info.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {about.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card group"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[highlight.icon]}
                </div>
                <h4 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-2">
                  {highlight.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}