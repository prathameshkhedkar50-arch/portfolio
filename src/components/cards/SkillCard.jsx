import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  FiCode, FiServer, FiGlobe, FiDatabase, FiSmartphone,
  FiLayers, FiBookOpen, FiCloud, FiTerminal, FiBox,
  FiGitBranch, FiMonitor, FiTool
} from 'react-icons/fi';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SKILL_CARD_CONFIG, PROFICIENCY_STYLES } from '../../utils/motionConfig';

/**
 * Icon mapping for skill categories and individual skills.
 * Uses react-icons/fi (already installed) — no external CDN.
 */
const categoryIconMap = {
  FiCode: <FiCode size={22} />,
  FiServer: <FiServer size={22} />,
  FiGlobe: <FiGlobe size={22} />,
  FiDatabase: <FiDatabase size={22} />,
  FiSmartphone: <FiSmartphone size={22} />,
  FiLayers: <FiLayers size={22} />,
  FiBookOpen: <FiBookOpen size={22} />,
  FiCloud: <FiCloud size={22} />,
  FiTerminal: <FiTerminal size={22} />,
  FiBox: <FiBox size={22} />,
  FiGitBranch: <FiGitBranch size={22} />,
  FiMonitor: <FiMonitor size={22} />,
  FiTool: <FiTool size={22} />,
};

const skillIconMap = {
  FiCode: <FiCode size={14} />,
  FiServer: <FiServer size={14} />,
  FiGlobe: <FiGlobe size={14} />,
  FiDatabase: <FiDatabase size={14} />,
  FiSmartphone: <FiSmartphone size={14} />,
  FiLayers: <FiLayers size={14} />,
  FiBookOpen: <FiBookOpen size={14} />,
  FiCloud: <FiCloud size={14} />,
  FiTerminal: <FiTerminal size={14} />,
  FiBox: <FiBox size={14} />,
  FiGitBranch: <FiGitBranch size={14} />,
  FiMonitor: <FiMonitor size={14} />,
  FiTool: <FiTool size={14} />,
  FiLock: <FiCode size={14} />, // fallback for auth-related skills
};

/**
 * Premium Interactive Skill Category Card
 * 
 * Features:
 * - Subtle pointer-responsive tilt (±2°, calmer than Project Cards)
 * - Environmental spotlight following cursor
 * - Gradient category icon badge
 * - Proficiency level badge
 * - Polished technology chips with hover lift
 * - Graceful mobile fallback (static, no tilt)
 * - Reduced motion support
 */
export const SkillCard = ({ category, index }) => {
  const cardRef = useRef(null);

  const isTouch = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useReducedMotion();
  const shouldDisable3D = isTouch || prefersReducedMotion;

  // Local pointer tracking (no global listeners)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tilt calculation (±2° max — calmer than projects)
  const rotateX = useTransform(mouseY, [-1, 1], [SKILL_CARD_CONFIG.tilt.max, -SKILL_CARD_CONFIG.tilt.max]);
  const rotateY = useTransform(mouseX, [-1, 1], [-SKILL_CARD_CONFIG.tilt.max, SKILL_CARD_CONFIG.tilt.max]);

  // Smooth spring for reset
  const smoothRotateX = useSpring(rotateX, SKILL_CARD_CONFIG.tilt.spring);
  const smoothRotateY = useSpring(rotateY, SKILL_CARD_CONFIG.tilt.spring);

  // Spotlight position (percentage)
  const spotlightX = useTransform(mouseX, [-1, 1], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [-1, 1], ['0%', '100%']);

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

  const CategoryIcon = categoryIconMap[category.icon] || <FiCode size={22} />;
  const proficiencyStyle = PROFICIENCY_STYLES[category.proficiency] || PROFICIENCY_STYLES.Intermediate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: SKILL_CARD_CONFIG.entrance.duration,
        delay: index * SKILL_CARD_CONFIG.entrance.stagger,
      }}
      className="group relative"
      style={{ perspective: `${SKILL_CARD_CONFIG.tilt.perspective}px` }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full rounded-2xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-shadow duration-300"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: shouldDisable3D ? 0 : smoothRotateX,
          rotateY: shouldDisable3D ? 0 : smoothRotateY,
        }}
      >
        {/* Spotlight Overlay — subtle environmental lighting */}
        {!shouldDisable3D && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle ${SKILL_CARD_CONFIG.spotlight.radius}px at var(--spotlight-x) var(--spotlight-y), rgba(59, 130, 246, var(--spotlight-opacity, 0.04)), transparent 70%)`,
              '--spotlight-x': spotlightX,
              '--spotlight-y': spotlightY,
            }}
            aria-hidden="true"
          />
        )}

        {/* Top accent bar — subtle category identity */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

        {/* Category Header */}
        <div className="p-6 pb-3">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
              {CategoryIcon}
            </div>
            <span className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border ${proficiencyStyle}`}>
              {category.proficiency}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-poppins text-gray-900 dark:text-white mb-1.5">
            {category.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Skill Chips */}
        <div className="px-6 pb-6 flex flex-wrap gap-1.5 sm:gap-2">
          {category.skills.map((skill, skillIndex) => {
            const SkillIcon = skillIconMap[skill.icon] || <FiCode size={14} />;
            return (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * SKILL_CARD_CONFIG.entrance.stagger + skillIndex * 0.02,
                  duration: 0.2,
                }}
                className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg border border-gray-200 dark:border-white/10 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-200 cursor-default flex items-center gap-1.5"
                role="listitem"
                aria-label={`${skill.name} — ${skill.level}`}
              >
                <span className="text-primary flex-shrink-0" aria-hidden="true">
                  {SkillIcon}
                </span>
                <span className="whitespace-nowrap">{skill.name}</span>
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};