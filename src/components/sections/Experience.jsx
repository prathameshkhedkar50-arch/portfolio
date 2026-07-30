import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle, FiStar 
} from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { TIMELINE_CONFIG } from '../../utils/motionConfig';

/**
 * Professional Experience Section
 * 
 * Premium vertical career timeline with:
 * - Scroll-driven progress line
 * - Viewport-activated nodes
 * - Subtle ±2° card tilt (desktop fine-pointer only)
 * - Staggered responsibility entrance
 * - Current role emphasis
 * - Technology chips
 * - Mobile-compact single-sided layout
 */
export default function Experience() {
  const { experience } = portfolioData;
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-driven progress line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${TIMELINE_CONFIG.scrollProgress.offsetStart}`, `end ${TIMELINE_CONFIG.scrollProgress.offsetEnd}`],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="section-padding" 
      aria-labelledby="experience-heading"
    >
      <div className="container-custom">
        <SectionHeading 
          id="experience-heading"
          title="Professional Experience" 
          subtitle="My career journey so far" 
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

          {/* Experience items */}
          <div className="relative">
            {experience.map((item, index) => (
              <ExperienceItem 
                key={index} 
                item={item} 
                index={index} 
                isLast={index === experience.length - 1} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Single experience timeline item with node and interactive card.
 */
const ExperienceItem = ({ item, index, isLast }) => {
  const cardRef = useRef(null);
  const isTouch = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useReducedMotion();
  const shouldDisable3D = isTouch || prefersReducedMotion;
  const isCurrent = item.duration && item.duration.toLowerCase().includes('present');

  // Local pointer tracking for subtle tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-1, 1], [TIMELINE_CONFIG.card.experience.tiltMax, -TIMELINE_CONFIG.card.experience.tiltMax]);
  const rotateY = useTransform(mouseX, [-1, 1], [-TIMELINE_CONFIG.card.experience.tiltMax, TIMELINE_CONFIG.card.experience.tiltMax]);
  const smoothRotateX = useSpring(rotateX, TIMELINE_CONFIG.card.experience.spring);
  const smoothRotateY = useSpring(rotateY, TIMELINE_CONFIG.card.experience.spring);

  const handleMouseMove = (e) => {
    if (shouldDisable3D || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    if (shouldDisable3D) return;
    mouseX.set(0);
    mouseY.set(0);
  };

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
            isCurrent 
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
        className="flex-grow min-w-0 pl-2"
        style={{ perspective: `${TIMELINE_CONFIG.card.experience.perspective}px` }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={shouldDisable3D ? { y: TIMELINE_CONFIG.card.experience.hoverLift } : {}}
          className={`relative rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border shadow-sm transition-shadow duration-300 ${
            isCurrent 
              ? 'border-primary/50 dark:border-primary/50' 
              : 'border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30'
          } hover:shadow-lg`}
          style={{
            transformStyle: 'preserve-3d',
            rotateX: shouldDisable3D ? 0 : smoothRotateX,
            rotateY: shouldDisable3D ? 0 : smoothRotateY,
          }}
        >
          <div className="p-4 sm:p-6">
            {/* Date + Current badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex items-center gap-2 text-primary font-mono text-sm font-medium">
                <FiCalendar size={14} aria-hidden="true" />
                <span>{item.duration}</span>
              </div>
              {isCurrent && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-xs font-semibold">
                  <FiStar size={10} aria-hidden="true" />
                  Current
                </span>
              )}
            </div>

            {/* Role */}
            <h3 className="text-lg sm:text-xl font-bold font-poppins text-gray-900 dark:text-white mb-1">
              {item.role}
            </h3>

            {/* Company */}
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2">
              <FiBriefcase size={14} className="text-primary flex-shrink-0" aria-hidden="true" />
              <span>{item.company}</span>
            </div>

            {/* Location */}
            {item.location && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <FiMapPin size={14} aria-hidden="true" />
                <span>{item.location}</span>
              </div>
            )}

            {/* Responsibilities */}
            {item.responsibilities && item.responsibilities.length > 0 && (
              <ul className="space-y-2 mb-4" role="list">
                {item.responsibilities.map((resp, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: TIMELINE_CONFIG.responsibility.xShift }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: TIMELINE_CONFIG.responsibility.duration,
                      delay: index * TIMELINE_CONFIG.entrance.stagger + i * TIMELINE_CONFIG.responsibility.stagger
                    }}
                    className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    <FiCheckCircle size={14} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>{resp}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            {/* Technology tags */}
            {item.techStack && item.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-200 dark:border-white/10">
                {item.techStack.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-2.5 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 rounded-full text-xs font-medium hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
};