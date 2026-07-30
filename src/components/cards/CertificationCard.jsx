import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiAward, FiExternalLink, FiCalendar, FiHash } from 'react-icons/fi';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CERTIFICATION_CARD_CONFIG } from '../../utils/motionConfig';

/**
 * Premium Certification Card
 * 
 * Features:
 * - Subtle ±2° tilt (desktop fine-pointer only)
 * - Optional pointer-responsive lighting
 * - Credential link with secure external link attributes
 * - Graceful handling of missing fields (credential ID, skills, etc.)
 * - Reduced motion support
 */
export const CertificationCard = ({ certification, index }) => {
  const cardRef = useRef(null);
  const isTouch = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useReducedMotion();
  const shouldDisable3D = isTouch || prefersReducedMotion;

  // Local pointer tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-1, 1], [CERTIFICATION_CARD_CONFIG.tilt.max, -CERTIFICATION_CARD_CONFIG.tilt.max]);
  const rotateY = useTransform(mouseX, [-1, 1], [-CERTIFICATION_CARD_CONFIG.tilt.max, CERTIFICATION_CARD_CONFIG.tilt.max]);
  const smoothRotateX = useSpring(rotateX, CERTIFICATION_CARD_CONFIG.tilt.spring);
  const smoothRotateY = useSpring(rotateY, CERTIFICATION_CARD_CONFIG.tilt.spring);

  const spotlightX = useTransform(mouseX, [-1, 1], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [-1, 1], ['0%', '100%']);

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

  const hasCredential = certification.credentialUrl && certification.credentialUrl !== '#';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: CERTIFICATION_CARD_CONFIG.entrance.duration, delay: index * CERTIFICATION_CARD_CONFIG.entrance.stagger }}
      className="group relative"
      style={{ perspective: `${CERTIFICATION_CARD_CONFIG.tilt.perspective}px` }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={shouldDisable3D ? { y: CERTIFICATION_CARD_CONFIG.hoverLift } : {}}
        className="relative h-full rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-shadow duration-300"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: shouldDisable3D ? 0 : smoothRotateX,
          rotateY: shouldDisable3D ? 0 : smoothRotateY,
        }}
      >
        {/* Spotlight overlay */}
        {!shouldDisable3D && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
            style={{
              background: `radial-gradient(circle ${CERTIFICATION_CARD_CONFIG.spotlight.radius}px at var(--spotlight-x) var(--spotlight-y), rgba(59, 130, 246, 0.04), transparent 70%)`,
              '--spotlight-x': spotlightX,
              '--spotlight-y': spotlightY,
            }}
            aria-hidden="true"
          />
        )}

        <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-20">
          {/* Icon + Credential Link */}
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
              <FiAward size={22} aria-hidden="true" />
            </div>
            {hasCredential && (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors flex-shrink-0 ml-2"
                aria-label={`View credential for ${certification.name}`}
              >
                <FiExternalLink size={18} aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Certification Name */}
          <h3 className="text-lg sm:text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2 leading-tight break-words">
            {certification.name}
          </h3>

          {/* Issuer */}
          <p className="text-sm text-primary font-medium mb-3">
            {certification.issuer}
          </p>

          {/* Date + Credential ID */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
            {certification.date && (
              <span className="flex items-center gap-1.5">
                <FiCalendar size={13} aria-hidden="true" />
                <span>{certification.date}</span>
              </span>
            )}
            {certification.credentialId && (
              <span className="flex items-center gap-1.5">
                <FiHash size={13} aria-hidden="true" />
                <span className="font-mono">{certification.credentialId}</span>
              </span>
            )}
          </div>

          {/* Skills/Tags */}
          {certification.skills && certification.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {certification.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 rounded text-[10px] font-medium uppercase tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
};