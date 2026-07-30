import { motion, useTransform } from 'framer-motion';
import { FaJava, FaReact, FaPython, FaGitAlt, FaDatabase, FaCode } from 'react-icons/fa';
import { SiSpringboot } from 'react-icons/si';

/**
 * Desktop Technology Chip Component
 * Features: 3D depth, unique parallax, subtle floating, restrained hover.
 */
const TechnologyChip = ({ tech, x, y, shouldDisable, index }) => {
  // Map normalized pointer coordinates (-1 to 1) to specific parallax movement
  const moveX = useTransform(x, [-1, 1], [-tech.parallax, tech.parallax]);
  const moveY = useTransform(y, [-1, 1], [-tech.parallax, tech.parallax]);

  return (
    <motion.div
      className={`absolute flex flex-col items-center gap-1 pointer-events-auto cursor-default ${tech.posDesktop} md:block hidden`}
      style={{ transform: `translateZ(${tech.depth}px)` }}
    >
      <motion.div
        className="glass px-3 py-2 rounded-lg flex items-center gap-2 shadow-lg border border-white/20 dark:border-white/10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        style={{ x: moveX, y: moveY }}
        animate={shouldDisable ? {} : { y: [0, -4, 0] }}
        transition={{ 
          duration: 4 + index * 0.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: index * 0.3 
        }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-xl text-primary">{tech.icon}</span>
        <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{tech.name}</span>
      </motion.div>
    </motion.div>
  );
};

/**
 * Mobile Technology Chip Component
 * Features: Simplified layout, reduced count, no pointer parallax.
 */
const MobileTechnologyChip = ({ tech, shouldDisable, index }) => {
  if (tech.posMobile === "hidden") return null;
  
  return (
    <motion.div
      className={`absolute flex flex-col items-center gap-1 pointer-events-auto cursor-default md:hidden ${tech.posMobile}`}
      style={{ transform: `translateZ(${tech.depth}px)` }}
    >
      <motion.div
        className="glass px-2 py-1.5 rounded-md flex items-center gap-1.5 shadow-md border border-white/20 dark:border-white/10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        animate={shouldDisable ? {} : { y: [0, -3, 0] }}
        transition={{ 
          duration: 4 + index * 0.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: index * 0.3 
        }}
      >
        <span className="text-base text-primary">{tech.icon}</span>
        <span className="text-[10px] font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{tech.name}</span>
      </motion.div>
    </motion.div>
  );
};

/**
 * Main Technology Ecosystem Component
 * Renders both desktop and mobile variants based on responsive data.
 */
export const TechnologyEcosystem = ({ x, y, shouldDisable }) => {
  const techData = [
    { name: "Java", icon: <FaJava />, depth: 45, parallax: 3, posDesktop: "top-0 left-1/2 -translate-x-1/2 -translate-y-12", posMobile: "top-0 left-1/2 -translate-x-1/2 -translate-y-6" },
    { name: "React", icon: <FaReact />, depth: 65, parallax: 5, posDesktop: "top-10 right-0 translate-x-10", posMobile: "bottom-20 right-0 translate-x-4" },
    { name: "Spring", icon: <SiSpringboot />, depth: 30, parallax: 2, posDesktop: "bottom-10 right-0 translate-x-10", posMobile: "hidden" },
    { name: "Python", icon: <FaPython />, depth: 55, parallax: 4, posDesktop: "bottom-0 left-1/2 -translate-x-1/2 translate-y-12", posMobile: "bottom-0 left-1/2 -translate-x-1/2 translate-y-6" },
    { name: "SQL", icon: <FaDatabase />, depth: 20, parallax: 1.5, posDesktop: "bottom-10 left-0 -translate-x-10", posMobile: "hidden" },
    { name: "Git", icon: <FaGitAlt />, depth: 40, parallax: 3, posDesktop: "top-10 left-0 -translate-x-10", posMobile: "hidden" },
    { name: "API", icon: <FaCode />, depth: 50, parallax: 3.5, posDesktop: "top-1/2 right-0 translate-x-16", posMobile: "hidden" },
  ];

  return (
    <>
      {techData.map((tech, i) => (
        <TechnologyChip key={tech.name} tech={tech} x={x} y={y} shouldDisable={shouldDisable} index={i} />
      ))}
      {techData.map((tech, i) => (
        <MobileTechnologyChip key={`mobile-${tech.name}`} tech={tech} shouldDisable={shouldDisable} index={i} />
      ))}
    </>
  );
};