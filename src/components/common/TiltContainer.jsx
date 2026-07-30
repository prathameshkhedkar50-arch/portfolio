import { motion } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';
import { MOTION_CONFIG } from '../../utils/motionConfig';
import { cn } from '../../utils/helpers';

/**
 * Reusable wrapper component that applies smooth 3D tilt and optional spotlight coordinates.
 * Automatically disables itself on touch devices or when reduced motion is preferred.
 * 
 * @param {React.ReactNode} children - Content to be tilted.
 * @param {number} maxTilt - Maximum rotation in degrees (default: 6).
 * @param {number} perspective - CSS perspective value (default: 1000).
 * @param {boolean} disabled - Force disable the effect.
 * @param {boolean} enableSpotlight - Exposes --pointer-x and --pointer-y CSS variables.
 * @param {string} className - Additional Tailwind classes.
 * @param {object} style - Additional inline styles.
 */
export const TiltContainer = ({ 
  children, 
  maxTilt = MOTION_CONFIG.tilt.max, 
  perspective = MOTION_CONFIG.tilt.perspective,
  className = "",
  disabled = false,
  enableSpotlight = false,
  style = {}
}) => {
  const { 
    ref, 
    smoothRotateX, 
    smoothRotateY, 
    pointerX, 
    pointerY, 
    handleMouseMove, 
    handleMouseLeave, 
    isDisabled 
  } = useTilt(maxTilt, !disabled);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("transition-transform", className)}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        rotateX: isDisabled ? 0 : smoothRotateX,
        rotateY: isDisabled ? 0 : smoothRotateY,
        ...(enableSpotlight ? {
          '--pointer-x': pointerX,
          '--pointer-y': pointerY,
        } : {}),
        ...style
      }}
    >
      {children}
    </motion.div>
  );
};