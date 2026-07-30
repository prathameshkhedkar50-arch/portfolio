import { useEffect, useState } from 'react';
import { useMotionValue, useTransform } from 'framer-motion';
import { useMediaQuery } from './useMediaQuery';

/**
 * Tracks global mouse position and provides normalized coordinates (-1 to 1).
 * Uses Framer Motion values to prevent React re-renders on every mousemove.
 */
export const useGlobalPointerPosition = () => {
  const isTouch = useMediaQuery('(pointer: coarse)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener('resize', handleResize, { passive: true });
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Normalize to -1 (left/top) to 1 (right/bottom)
  const normalizedX = useTransform(x, [0, windowSize.width], [-1, 1]);
  const normalizedY = useTransform(y, [0, windowSize.height], [-1, 1]);

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch, prefersReducedMotion, x, y]);

  return { x, y, normalizedX, normalizedY };
};