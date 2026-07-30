import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { PROJECT_CARD_CONFIG } from '../../utils/motionConfig';

/**
 * Premium Interactive 3D Project Card
 * 
 * Features:
 * - Subtle pointer-responsive tilt (desktop only)
 * - Environmental spotlight following cursor
 * - Layered visual depth
 * - Polished technology chips
 * - Refined CTA buttons
 * - Graceful mobile fallback
 * - Reduced motion support
 */
export const ProjectCard = ({ project, index }) => {
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef(null);
  
  const isTouch = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useReducedMotion();
  const shouldDisable3D = isTouch || prefersReducedMotion;

  // Local pointer tracking (no global listeners)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tilt calculation
  const rotateX = useTransform(mouseY, [-1, 1], [PROJECT_CARD_CONFIG.tilt.max, -PROJECT_CARD_CONFIG.tilt.max]);
  const rotateY = useTransform(mouseX, [-1, 1], [-PROJECT_CARD_CONFIG.tilt.max, PROJECT_CARD_CONFIG.tilt.max]);

  // Smooth spring for reset
  const smoothRotateX = useSpring(rotateX, PROJECT_CARD_CONFIG.tilt.spring);
  const smoothRotateY = useSpring(rotateY, PROJECT_CARD_CONFIG.tilt.spring);

  // Spotlight position (percentage)
  const spotlightX = useTransform(mouseX, [-1, 1], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [-1, 1], ['0%', '100%']);

  // Preview image subtle shift
  const previewX = useTransform(mouseX, [-1, 1], [-PROJECT_CARD_CONFIG.preview.hoverShift, PROJECT_CARD_CONFIG.preview.hoverShift]);
  const previewY = useTransform(mouseY, [-1, 1], [-PROJECT_CARD_CONFIG.preview.hoverShift, PROJECT_CARD_CONFIG.preview.hoverShift]);

  const handleMouseMove = (e) => {
    if (shouldDisable3D || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Normalize to -1 to 1
    mouseX.set((x - centerX) / centerX);
    mouseY.set((y - centerY) / centerY);
  };

  const handleMouseLeave = () => {
    if (shouldDisable3D) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ 
        duration: PROJECT_CARD_CONFIG.entrance.duration, 
        delay: index * PROJECT_CARD_CONFIG.entrance.stagger 
      }}
      className="group relative"
      style={{ perspective: `${PROJECT_CARD_CONFIG.tilt.perspective}px` }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full rounded-2xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow duration-300"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: shouldDisable3D ? 0 : smoothRotateX,
          rotateY: shouldDisable3D ? 0 : smoothRotateY,
        }}
      >
        {/* Spotlight Overlay */}
        {!shouldDisable3D && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle ${PROJECT_CARD_CONFIG.spotlight.radius}px at var(--spotlight-x) var(--spotlight-y), rgba(59, 130, 246, ${PROJECT_CARD_CONFIG.spotlight.lightModeOpacity}), transparent 70%)`,
              '--spotlight-x': spotlightX,
              '--spotlight-y': spotlightY,
            }}
            aria-hidden="true"
          />
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full shadow-lg">
            Featured
          </div>
        )}

        {/* Preview Image Area */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
          {!imgError ? (
            <motion.img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover"
              style={{ x: shouldDisable3D ? 0 : previewX, y: shouldDisable3D ? 0 : previewY }}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 text-primary">
              <FiCode size={48} className="mb-2 opacity-80" />
              <span className="text-xs font-mono opacity-60">Preview Unavailable</span>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full text-gray-900 hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <FiGithub size={20} />
            </a>
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full text-gray-900 hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                aria-label={`View live demo of ${project.title}`}
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Metadata Row */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
              {project.category} • {project.year}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technology Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md border border-gray-200 dark:border-white/10 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex gap-3 mt-auto pt-4 border-t border-gray-200 dark:border-white/10 ${!project.live || project.live === '#' ? 'justify-center' : ''}`}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            >
              <FiGithub /> Code
            </a>
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
              >
                <FiExternalLink /> Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};