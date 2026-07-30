import { motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';
import { APP_CONFIG } from '../../config';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Floating WhatsApp Button
 * 
 * Fixed position button for quick WhatsApp contact.
 * Positioned bottom-right with safe offsets.
 * Accessible with proper aria-label.
 * Phase 3D.13: Added subtle idle pulse animation.
 */
export default function WhatsAppButton() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={APP_CONFIG.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed z-40 p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95 ${
        !prefersReducedMotion ? 'whatsapp-idle-pulse' : ''
      }`}
      style={{
        bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
        right: 'max(1.5rem, env(safe-area-inset-right, 1.5rem))'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiMessageCircle size={24} aria-hidden="true" />
    </motion.a>
  );
}