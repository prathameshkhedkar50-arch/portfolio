import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch, FiCode } from 'react-icons/fi';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { REPO_CARD_CONFIG } from '../../utils/motionConfig';

export const RepositoryCard = ({ repo, index }) => {
  const cardRef = useRef(null);
  const isTouch = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useReducedMotion();
  const shouldDisable3D = isTouch || prefersReducedMotion;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-1, 1], [REPO_CARD_CONFIG.tilt.max, -REPO_CARD_CONFIG.tilt.max]);
  const rotateY = useTransform(mouseX, [-1, 1], [-REPO_CARD_CONFIG.tilt.max, REPO_CARD_CONFIG.tilt.max]);
  const smoothRotateX = useSpring(rotateX, REPO_CARD_CONFIG.tilt.spring);
  const smoothRotateY = useSpring(rotateY, REPO_CARD_CONFIG.tilt.spring);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const displayTopics = repo.topics ? repo.topics.slice(0, 4) : [];
  const hasMoreTopics = repo.topics && repo.topics.length > 4;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: REPO_CARD_CONFIG.entrance.duration, delay: index * REPO_CARD_CONFIG.entrance.stagger }}
      className="group relative"
      style={{ perspective: `${REPO_CARD_CONFIG.tilt.perspective}px` }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-shadow duration-300 flex flex-col"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: shouldDisable3D ? 0 : smoothRotateX,
          rotateY: shouldDisable3D ? 0 : smoothRotateY,
        }}
      >
        {!shouldDisable3D && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
            style={{
              background: `radial-gradient(circle ${REPO_CARD_CONFIG.spotlight.radius}px at var(--spotlight-x) var(--spotlight-y), rgba(59, 130, 246, 0.04), transparent 70%)`,
              '--spotlight-x': spotlightX,
              '--spotlight-y': spotlightY,
            }}
            aria-hidden="true"
          />
        )}

        <div className="p-5 flex flex-col flex-grow relative z-20">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 text-primary min-w-0">
              <FiCode size={18} className="flex-shrink-0" aria-hidden="true" />
              <h3 className="font-bold font-poppins text-gray-900 dark:text-white group-hover:text-primary transition-colors break-words">
                {repo.name}
              </h3>
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors flex-shrink-0 ml-2"
              aria-label={`View ${repo.name} on GitHub`}
            >
              <FiGithub size={18} />
            </a>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow leading-relaxed line-clamp-3">
            {repo.description || "No description available."}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {displayTopics.map((topic) => (
              <span key={topic} className="px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 rounded text-[10px] font-medium uppercase tracking-wide">
                {topic}
              </span>
            ))}
            {hasMoreTopics && (
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded text-[10px] font-medium">
                +{repo.topics.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-3">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                  <span className="truncate max-w-[80px]">{repo.language}</span>
                </span>
              )}
              <span className="flex items-center gap-1 flex-shrink-0">
                <FiStar size={14} aria-hidden="true" />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1 flex-shrink-0">
                <FiGitBranch size={14} aria-hidden="true" />
                {repo.forks}
              </span>
            </div>
            <span className="flex-shrink-0">Updated {formatDate(repo.updated_at)}</span>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};