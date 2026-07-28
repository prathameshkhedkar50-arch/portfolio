import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiExternalLink, FiCheckCircle, FiBookOpen } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

const iconMap = {
  FiAward: <FiAward size={24} />,
  FiBookOpen: <FiBookOpen size={24} />
};

export default function Certifications() {
  const { certifications } = portfolioData;

  return (
    <section id="certifications" className="section-padding bg-gray-50/50 dark:bg-dark-surface/30">
      <div className="container-custom">
        <SectionHeading
          title={certifications.title}
          subtitle={certifications.subtitle}
          description={certifications.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.items.map((cert, index) => {
            const CertIcon = iconMap[cert.icon] || <FiAward />;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card group relative overflow-hidden"
              >
                {/* Featured Badge */}
                {cert.featured && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Featured
                  </div>
                )}

                {/* Icon */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg w-fit mb-5 group-hover:scale-110 transition-transform duration-300">
                  {CertIcon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-primary font-medium mb-3">
                  <FiCheckCircle size={14} />
                  {cert.provider}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <FiCalendar size={14} />
                  Completed {cert.completionDate}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {cert.description}
                </p>

                {/* Verification Button */}
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  aria-label={`Verify ${cert.title} certificate`}
                >
                  Verify Certificate <FiExternalLink size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>

        {certifications.items.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No certifications yet. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
}