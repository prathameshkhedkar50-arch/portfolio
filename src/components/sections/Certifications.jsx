import SectionHeading from '../common/SectionHeading';
import { CertificationCard } from '../cards/CertificationCard';
import { portfolioData } from '../../data/portfolioData';

/**
 * Certifications Section
 * 
 * Premium interactive showcase of professional certifications.
 * Features polished cards with credential links, issuer information,
 * and subtle depth interactions.
 */
export default function Certifications() {
  const { certifications } = portfolioData;

  // Filter to only valid certifications from the items array
  const validCertifications = certifications.items ? certifications.items.filter(c => c && c.name) : [];

  if (validCertifications.length === 0) {
    return (
      <section id="certifications" className="section-padding">
        <div className="container-custom">
          <SectionHeading
            title={certifications.title || "Certifications"}
            subtitle={certifications.subtitle || "Professional Credentials"}
            description={certifications.description || "Certifications and credentials earned through professional development."}
          />
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No certifications to display at this time.
          </div>
        </div>
      </section>
    );
  }

  // Determine grid columns based on count
  const getGridClass = () => {
    const count = validCertifications.length;
    if (count === 1) return 'grid grid-cols-1 max-w-2xl mx-auto';
    if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto';
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section id="certifications" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title={certifications.title || "Certifications"}
          subtitle={certifications.subtitle || "Professional Credentials"}
          description={certifications.description || "Certifications and credentials earned through professional development."}
        />

        <div className={getGridClass()}>
          {validCertifications.map((cert, index) => (
            <CertificationCard
              key={cert.id || index}
              certification={cert}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}