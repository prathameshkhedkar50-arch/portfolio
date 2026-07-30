import { useRef } from 'react';
import { useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { useMediaQuery } from './useMediaQuery';
import { MOTION_CONFIG } from '../utils/motionConfig';

/**
 * Calculates element-relative pointer position and smooth 3D tilt values.
 * @param {number} maxTilt - Maximum rotation in degrees.
 * @param {boolean} isActive - Whether the tilt effect should be active.
 * @returns {object} Ref, motion values, and event handlers.
 */
export const useTilt = (maxTilt = MOTION_CONFIG.tilt.max, isActive = true) => {
  const ref = useRef(null);
  const isTouch = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useReducedMotion();

  const shouldDisable = !isActive || isTouch || prefersReducedMotion;

  // Initialize motion values with 0
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map normalized coordinates to rotation degrees
  const rotateX = useTransform(y, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-1, 1], [-maxTilt, maxTilt]);

  const springConfig = { ...MOTION_CONFIG.spring };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (shouldDisable || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to -1 to 1
    const xPct = (mouseX / width) * 2 - 1;
    const yPct = (mouseY / height) * 2 - 1;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (shouldDisable) return;
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    smoothRotateX,
    smoothRotateY,
    x,
    y,
    handleMouseMove,
    handleMouseLeave,
    isDisabled: shouldDisable,
  };
};