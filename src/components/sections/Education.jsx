import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiCalendar, FiMapPin, FiAward, FiBookOpen } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { TIMELINE_CONFIG } from '../../utils/motionConfig';

/**
 * Education Section
 * 
 * Premium vertical timeline with:
 * - Scroll-driven progress line (shared visual language with Experience)
 * - Viewport-activated nodes
 * - Calmer interaction than Experience (translateY only, no tilt)
 * - MCA emphasis (first/master's entry gets stronger styling)
 * - Mobile-compact layout
 */
export default function Education() {
  const { education } = portfolioData;
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${TIMELINE_CONFIG.scrollProgress.offsetStart}`, `end ${TIMELINE_CONFIG.scrollProgress.offsetEnd}`],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="section-padding" 
      aria-labelledby="education-heading"
    >
      <div className="container-custom">
        <SectionHeading 
          id="education-heading"
          title="Education" 
          subtitle="My academic background" 
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline track */}
          <div className="absolute top-0 bottom-0 pointer-events-none" aria-hidden="true">
            <div 
              className={`absolute top-0 bottom-0 ${TIMELINE_CONFIG.line.baseColor} rounded-full`}
              style={{ 
                left: `${TIMELINE_CONFIG.line.mobileOffset}px`,
                width: `${TIMELINE_CONFIG.line.width}px`,
              }}
            />
            {!prefersReducedMotion && (
              <motion.div 
                className={`absolute top-0 ${TIMELINE_CONFIG.line.progressColor} rounded-full origin-top`}
                style={{ 
                  left: `${TIMELINE_CONFIG.line.mobileOffset}px`,
                  width: `${TIMELINE_CONFIG.line.width}px`,
                  scaleY,
                }}
              />
            )}
          </div>

          {/* Education items */}
          <div className="relative">
            {education.map((item, index) => (
              <EducationItem 
                key={index} 
                item={item} 
                index={index} 
                isLast={index === education.length - 1}
                isPrimary={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Single education timeline item.
 * Calmer than Experience: no tilt, just translateY hover.
 */
const EducationItem = ({ item, index, isLast, isPrimary }) => {
  const isMasters = item.degree && item.degree.toLowerCase().includes('master');
  const emphasize = isPrimary || isMasters;

  return (
    <div 
      className="relative flex gap-4 sm:gap-6 group"
      style={{ paddingBottom: isLast ? '0' : '2rem' }}
    >
      {/* Timeline node */}
      <div className="flex-shrink-0 relative" style={{ width: `${TIMELINE_CONFIG.line.mobileOffset * 2}px` }}>
        <motion.div
          initial={{ scale: 1 }}
          whileInView={{ scale: TIMELINE_CONFIG.node.scale }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={`absolute top-6 ${TIMELINE_CONFIG.node.size} rounded-full border-2 transition-all duration-300 ${
            emphasize
              ? 'bg-primary border-primary shadow-lg shadow-primary/30' 
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
          }`}
          style={{ left: `${TIMELINE_CONFIG.line.mobileOffset - 6}px` }}
          aria-hidden="true"
        />
      </div>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: TIMELINE_CONFIG.entrance.duration, 
          delay: index * TIMELINE_CONFIG.entrance.stagger 
        }}
        whileHover={{ y: TIMELINE_CONFIG.card.education.hoverLift }}
        className={`flex-grow min-w-0 pl-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border shadow-sm transition-shadow duration-300 ${
          emphasize
            ? 'border-primary/40 dark:border-primary/40 hover:shadow-lg'
            : 'border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md'
        }`}
      >
        <div className="p-4 sm:p-6">
          {/* Duration */}
          <div className="flex items-center gap-2 text-primary font-mono text-sm font-medium mb-3">
            <FiCalendar size={14} aria-hidden="true" />
            <span>{item.duration}</span>
          </div>

          {/* Degree */}
          <h3 className="text-lg sm:text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
            {item.degree}
          </h3>

          {/* Institution */}
          <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2">
            {isMasters ? (
              <FiAward size={14} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            ) : (
              <FiBookOpen size={14} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            )}
            <span>{item.institution}</span>
          </div>

          {/* Location + Grade row */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            {item.location && (
              <div className="flex items-center gap-1.5">
                <FiMapPin size={13} aria-hidden="true" />
                <span>{item.location}</span>
              </div>
            )}
            {item.grade && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 text-xs font-semibold">
                <FiAward size={11} aria-hidden="true" />
                <span>{item.grade}</span>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
};