import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { TIMELINE_CONFIG } from '../../utils/motionConfig';

/**
 * Shared Timeline component for Experience and Education sections.
 * 
 * Features:
 * - Scroll-driven progress line (accent color fills as section scrolls through viewport)
 * - Viewport-activated nodes with scale/border/glow transition
 * - Responsive single-sided layout (line on left, cards on right)
 * - Reduced motion support (static timeline when preferred)
 */
export const Timeline = ({ 
  items, 
  renderItem, 
  sectionId,
  className = ""
}) => {
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
      id={sectionId} 
      ref={sectionRef}
      className={`section-padding ${className}`}
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="container-custom">
        <div className="relative max-w-4xl mx-auto">
          {/* Base timeline track */}
          <div 
            className={`absolute top-0 bottom-0 ${TIMELINE_CONFIG.line.baseColor} rounded-full`}
            style={{ 
              left: `${TIMELINE_CONFIG.line.mobileOffset}px`,
              width: `${TIMELINE_CONFIG.line.width}px`,
            }}
            aria-hidden="true"
          />

          {/* Progress line */}
          {!prefersReducedMotion && (
            <motion.div 
              className={`absolute top-0 ${TIMELINE_CONFIG.line.progressColor} rounded-full origin-top`}
              style={{ 
                left: `${TIMELINE_CONFIG.line.mobileOffset}px`,
                width: `${TIMELINE_CONFIG.line.width}px`,
                scaleY,
              }}
              aria-hidden="true"
            />
          )}

          {/* Items */}
          <div className="relative">
            {items.map((item, index) => (
              <TimelineItem 
                key={index}
                item={item}
                index={index}
                renderItem={renderItem}
                isLast={index === items.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index, renderItem, isLast }) => {
  return (
    <div 
      className="relative flex gap-4 sm:gap-6"
      style={{ paddingBottom: isLast ? '0' : '2rem' }}
    >
      {/* Node */}
      <div className="flex-shrink-0 relative" style={{ width: `${TIMELINE_CONFIG.line.mobileOffset * 2}px` }}>
        <motion.div
          initial={{ scale: 1, boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" }}
          whileInView={{ 
            scale: TIMELINE_CONFIG.node.scale, 
            boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.2)" 
          }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={`absolute top-6 ${TIMELINE_CONFIG.node.size} rounded-full ${TIMELINE_CONFIG.node.baseStyle}`}
          style={{ left: `${TIMELINE_CONFIG.line.mobileOffset - 6}px` }}
          aria-hidden="true"
        />
      </div>

      {/* Card */}
      <div className="flex-grow min-w-0 pl-2">
        {renderItem(item, index)}
      </div>
    </div>
  );
};

export default Timeline;