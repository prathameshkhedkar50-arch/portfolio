import { motion, useTransform } from 'framer-motion';
import { FiCode, FiLayers, FiDatabase } from 'react-icons/fi';
import { useTilt } from '../../hooks/useTilt';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { HERO_ORB_CONFIG } from '../../utils/motionConfig';
import { TechnologyEcosystem } from './TechnologyEcosystem';

/**
 * Premium 3D Developer Orb for the Hero section.
 */
export const DeveloperOrb = () => {
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useMediaQuery('(pointer: coarse)');
  const shouldDisable = prefersReducedMotion || isTouch;

  const {
    ref,
    smoothRotateX,
    smoothRotateY,
    x,
    y,
    handleMouseMove,
    handleMouseLeave,
  } = useTilt(HERO_ORB_CONFIG.tilt.max, !shouldDisable);

  // Parallax transforms for internal orb layers
  const glowX = useTransform(x, [-1, 1], [HERO_ORB_CONFIG.parallax.glow, -HERO_ORB_CONFIG.parallax.glow]);
  const glowY = useTransform(y, [-1, 1], [HERO_ORB_CONFIG.parallax.glow, -HERO_ORB_CONFIG.parallax.glow]);

  const sphereX = useTransform(x, [-1, 1], [-HERO_ORB_CONFIG.parallax.sphere, HERO_ORB_CONFIG.parallax.sphere]);
  const sphereY = useTransform(y, [-1, 1], [-HERO_ORB_CONFIG.parallax.sphere, HERO_ORB_CONFIG.parallax.sphere]);

  const codeIconX = useTransform(x, [-1, 1], [-HERO_ORB_CONFIG.parallax.codeIcon, HERO_ORB_CONFIG.parallax.codeIcon]);
  const codeIconY = useTransform(y, [-1, 1], [-HERO_ORB_CONFIG.parallax.codeIcon, HERO_ORB_CONFIG.parallax.codeIcon]);

  const badgesX = useTransform(x, [-1, 1], [-HERO_ORB_CONFIG.parallax.badges, HERO_ORB_CONFIG.parallax.badges]);
  const badgesY = useTransform(y, [-1, 1], [-HERO_ORB_CONFIG.parallax.badges, HERO_ORB_CONFIG.parallax.badges]);

  const orbitNodes = [
    { deg: 0, pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
    { deg: 90, pos: 'top-1/2 right-0 -translate-y-1/2 translate-x-1/2' },
    { deg: 180, pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
    { deg: 270, pos: 'top-1/2 left-0 -translate-y-1/2 -translate-x-1/2' },
  ];

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full"
        style={{
          perspective: `${HERO_ORB_CONFIG.tilt.perspective}px`,
          transformStyle: 'preserve-3d',
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
        }}
      >
        {/* NEW: Technology Ecosystem Layer */}
        <TechnologyEcosystem x={x} y={y} shouldDisable={shouldDisable} />

        {/* Layer 1: Ambient Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 blur-3xl pointer-events-none"
          style={{ x: glowX, y: glowY }}
          aria-hidden="true"
        />

        {/* Layer 2: Outer Orbit with Nodes */}
        <motion.div
          className="absolute -inset-4 rounded-full border border-primary/20 pointer-events-none"
          animate={shouldDisable ? { rotate: 0 } : { rotate: 360 }}
          transition={{
            duration: HERO_ORB_CONFIG.orbit.primaryDuration,
            repeat: shouldDisable ? 0 : Infinity,
            ease: 'linear',
          }}
          aria-hidden="true"
        >
          {orbitNodes.map((node) => (
            <div
              key={node.deg}
              className={`absolute w-2.5 h-2.5 bg-primary/70 rounded-full shadow-lg shadow-primary/30 ${node.pos}`}
            />
          ))}
        </motion.div>

        {/* Layer 3: Secondary Tilted Orbit */}
        <div
          className="absolute -inset-2 pointer-events-none"
          style={{
            transform: `rotateX(${HERO_ORB_CONFIG.orbit.secondaryTiltDeg}deg)`,
            transformStyle: 'preserve-3d',
          }}
          aria-hidden="true"
        >
          <motion.div
            className="w-full h-full rounded-full border border-dashed border-secondary/30"
            animate={shouldDisable ? { rotate: 0 } : { rotate: -360 }}
            transition={{
              duration: HERO_ORB_CONFIG.orbit.secondaryDuration,
              repeat: shouldDisable ? 0 : Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Layer 4: Main Sphere */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-white/90 via-primary/5 to-secondary/5 dark:from-gray-800/90 dark:via-primary/15 dark:to-secondary/15 border border-white/50 dark:border-white/10 shadow-2xl overflow-hidden pointer-events-none"
          style={{ x: sphereX, y: sphereY }}
        >
          {/* Inner highlight for glass effect */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 to-transparent dark:from-white/10"
            aria-hidden="true"
          />
        </motion.div>

        {/* Layer 5: Code Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-primary pointer-events-none"
          style={{ x: codeIconX, y: codeIconY }}
          animate={shouldDisable ? {} : { scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiCode size={80} aria-hidden="true" />
        </motion.div>

        {/* Layer 6: Full Stack Badge */}
        <motion.div
          className="absolute -top-4 -right-4 glass px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg"
          style={{ x: badgesX, y: badgesY }}
          animate={
            shouldDisable
              ? {}
              : { y: [0, -HERO_ORB_CONFIG.badges.floatDistance, 0] }
          }
          transition={{
            duration: HERO_ORB_CONFIG.badges.floatDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <FiLayers className="text-primary" size={16} aria-hidden="true" />
          <span className="font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">
            Full Stack
          </span>
        </motion.div>

        {/* Layer 7: Backend Badge */}
        <motion.div
          className="absolute -bottom-4 -left-4 glass px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg"
          style={{ x: badgesX, y: badgesY }}
          animate={
            shouldDisable
              ? {}
              : { y: [0, HERO_ORB_CONFIG.badges.floatDistance, 0] }
          }
          transition={{
            duration: HERO_ORB_CONFIG.badges.floatDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <FiDatabase className="text-secondary" size={16} aria-hidden="true" />
          <span className="font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">
            Backend
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};