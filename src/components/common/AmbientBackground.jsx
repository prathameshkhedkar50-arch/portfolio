import { motion, useTransform } from 'framer-motion';
import { useGlobalPointerPosition } from '../../hooks/useGlobalPointerPosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { AMBIENT_CONFIG } from '../../utils/motionConfig';

/**
 * Premium Ambient Background System.
 * Creates depth through a technical grid, drifting gradient blobs,
 * subtle depth nodes, and a desktop-only cursor-responsive environmental light.
 * 
 * All layers are purely decorative, non-interactive, and respect accessibility preferences.
 */
export const AmbientBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useMediaQuery('(pointer: coarse)');
  const shouldDisableMotion = prefersReducedMotion || isTouch;

  // Reuse existing global pointer system (no new listeners)
  const { normalizedX, normalizedY } = useGlobalPointerPosition();
  
  // Map normalized coordinates (-1 to 1) to percentage (0% to 100%) for CSS variables
  const cursorXPercent = useTransform(normalizedX, [-1, 1], ["0%", "100%"]);
  const cursorYPercent = useTransform(normalizedY, [-1, 1], ["0%", "100%"]);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden" 
      aria-hidden="true"
    >
      {/* Layer 1: Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
      <div className="absolute inset-0 hidden sm:block bg-[linear-gradient(to_right,#80808004_1px,transparent_1px),linear-gradient(to_bottom,#80808004_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)]" />

      {/* Layer 2: Ambient Gradient Blobs */}
      {AMBIENT_CONFIG.blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={`absolute rounded-full blur-3xl ${blob.color} ${blob.size} ${blob.top} ${blob.left} ${blob.right} ${blob.bottom}`}
          animate={shouldDisableMotion ? {} : { x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ 
            duration: blob.duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      ))}

      {/* Layer 3: Depth Nodes */}
      {AMBIENT_CONFIG.nodes.map((node) => (
        <motion.div
          key={node.id}
          className={`absolute rounded-full bg-primary/20 dark:bg-primary/30 ${node.size}`}
          style={{ left: node.x, top: node.y }}
          animate={shouldDisableMotion ? {} : { y: [0, -6, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ 
            duration: 4 + node.delay, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: node.delay 
          }}
        />
      ))}

      {/* Layer 4: Cursor-Responsive Environmental Light (Desktop Only) */}
      {!shouldDisableMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(${AMBIENT_CONFIG.cursorLight.radius} circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(59, 130, 246, ${AMBIENT_CONFIG.cursorLight.opacity}), transparent 50%)`,
            '--cursor-x': cursorXPercent,
            '--cursor-y': cursorYPercent,
          }}
        />
      )}
    </div>
  );
};