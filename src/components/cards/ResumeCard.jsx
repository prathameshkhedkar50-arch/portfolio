import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiFileText, FiEye, FiDownload } from 'react-icons/fi';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { RESUME_CARD_CONFIG } from '../../utils/motionConfig';

/**
 * Premium Resume Card
 * 
 * Features:
 * - Consistent dimensions across all cards (h-full)
 * - Clear specialization title
 * - Short description (line-clamp-2 for consistency)
 * - Core skill tags (max 5)
 * - Distinct View and Download CTAs aligned at bottom
 * - Subtle depth interaction (desktop fine-pointer only)
 * - Accessible labels for screen readers
 */
export const ResumeCard = ({ resume, index }) => {
  const cardRef = useRef(null);
  const isTouch = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useReducedMotion();
  const shouldDisable3D = isTouch || prefersReducedMotion;

  // Local pointer tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-1, 1], [RESUME_CARD_CONFIG.tilt.max, -RESUME_CARD_CONFIG.tilt.max]);
  const rotateY = useTransform(mouseX, [-1, 1], [-RESUME_CARD_CONFIG.tilt.max, RESUME_CARD_CONFIG.tilt.max]);
  const smoothRotateX = useSpring(rotateX, RESUME_CARD_CONFIG.tilt.spring);
  const smoothRotateY = useSpring(rotateY, RESUME_CARD_CONFIG.tilt.spring);

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

  // Ensure file path starts with /
  const filePath = resume.file.startsWith('/') ? resume.file : `/${resume.file}`;
  const displayTags = resume.tags ? resume.tags.slice(0, 5) : [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: RESUME_CARD_CONFIG.entrance.duration, delay: index * RESUME_CARD_CONFIG.entrance.stagger }}
      className="group relative h-full"
      style={{ perspective: `${RESUME_CARD_CONFIG.tilt.perspective}px` }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={shouldDisable3D ? { y: RESUME_CARD_CONFIG.hoverLift } : {}}
        className="relative h-full rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-shadow duration-300 flex flex-col"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: shouldDisable3D ? 0 : smoothRotateX,
          rotateY: shouldDisable3D ? 0 : smoothRotateY,
        }}
      >
        <div className="p-5 sm:p-6 flex flex-col flex-grow h-full">
          {/* Header: Icon + PDF Badge */}
          <div className="flex items-start justify-between mb-4 flex-shrink-0">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
              <FiFileText size={22} aria-hidden="true" />
            </div>
            <span className="px-2 py-1 bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-[10px] font-bold uppercase tracking-wide border border-red-500/20 flex-shrink-0">
              PDF
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2 leading-tight break-words flex-shrink-0">
            {resume.title}
          </h3>

          {/* Description - line-clamp-2 for consistent height */}
          {resume.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2 flex-shrink-0">
              {resume.description}
            </p>
          )}

          {/* Tags - limited to 5 for consistency */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6 flex-shrink-0">
              {displayTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded text-[10px] font-medium border border-gray-200 dark:border-white/10 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Spacer to push buttons to bottom */}
          <div className="flex-grow" />

          {/* CTA Buttons - always at bottom */}
          <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-white/10 flex-shrink-0">
            <a
              href={filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              aria-label={`View ${resume.title} PDF`}
            >
              <FiEye size={16} aria-hidden="true" />
              <span>View</span>
            </a>
            <a
              href={filePath}
              download
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              aria-label={`Download ${resume.title} PDF`}
            >
              <FiDownload size={16} aria-hidden="true" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};