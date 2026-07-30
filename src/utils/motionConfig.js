/**
 * Centralized animation and interaction configuration.
 * Ensures consistent physics, limits, and timings across all 3D/interactive components.
 */
export const MOTION_CONFIG = {
  spring: {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 1,
  },
  tilt: {
    max: 6,
    perspective: 1000,
    resetDuration: 0.5,
  },
  parallax: {
    background: 10,
    midground: 20,
    foreground: 30,
  },
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
  spotlight: {
    radius: 300,
    opacity: 0.15,
  }
};

export const HERO_ORB_CONFIG = {
  tilt: {
    max: 6,
    perspective: 1200,
  },
  parallax: {
    glow: 4,
    sphere: 2,
    codeIcon: 6,
    badges: 4,
  },
  orbit: {
    primaryDuration: 30,
    secondaryDuration: 40,
    secondaryTiltDeg: 60,
  },
  badges: {
    floatDuration: 5,
    floatDistance: 4,
  },
  spotlight: {
    radius: 200,
    opacity: 0.12,
  },
};

export const AMBIENT_CONFIG = {
  blobs: [
    { id: 1, color: "bg-primary/5 dark:bg-primary/10", size: "w-[500px] h-[500px] sm:w-[600px] sm:h-[600px]", top: "top-[-10%]", left: "left-[-10%]", duration: 45 },
    { id: 2, color: "bg-secondary/5 dark:bg-secondary/10", size: "w-[600px] h-[600px] sm:w-[700px] sm:h-[700px]", top: "top-[40%]", right: "right-[-15%]", duration: 55 },
    { id: 3, color: "bg-accent/5 dark:bg-accent/10", size: "w-[400px] h-[400px] sm:w-[500px] sm:h-[500px]", bottom: "bottom-[-10%]", left: "left-[20%]", duration: 50 },
  ],
  nodes: [
    { id: 1, x: "10%", y: "20%", size: "w-1 h-1", delay: 0 },
    { id: 2, x: "80%", y: "15%", size: "w-1.5 h-1.5", delay: 1.5 },
    { id: 3, x: "25%", y: "70%", size: "w-1 h-1", delay: 0.5 },
    { id: 4, x: "70%", y: "60%", size: "w-2 h-2", delay: 2 },
    { id: 5, x: "50%", y: "30%", size: "w-1 h-1", delay: 1 },
    { id: 6, x: "90%", y: "80%", size: "w-1.5 h-1.5", delay: 0.8 },
    { id: 7, x: "15%", y: "90%", size: "w-1 h-1", delay: 1.2 },
    { id: 8, x: "60%", y: "10%", size: "w-1 h-1", delay: 0.3 },
    { id: 9, x: "35%", y: "45%", size: "w-1.5 h-1.5", delay: 1.8 },
    { id: 10, x: "85%", y: "40%", size: "w-1 h-1", delay: 0.6 },
  ],
  cursorLight: {
    radius: "800px",
    opacity: "0.04 dark:0.08",
  }
};

export const PROJECT_CARD_CONFIG = {
  tilt: {
    max: 5,
    perspective: 1000,
    spring: {
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    },
  },
  spotlight: {
    radius: 400,
    lightModeOpacity: 0.04,
    darkModeOpacity: 0.08,
  },
  preview: {
    hoverShift: 2,
  },
  entrance: {
    stagger: 0.08,
    duration: 0.4,
  },
};

export const SKILL_CARD_CONFIG = {
  tilt: {
    max: 2,
    perspective: 1200,
    spring: {
      stiffness: 180,
      damping: 22,
      mass: 0.9,
    },
  },
  spotlight: {
    radius: 300,
    lightModeOpacity: 0.04,
    darkModeOpacity: 0.07,
  },
  entrance: {
    stagger: 0.06,
    duration: 0.4,
  },
  chip: {
    hoverLift: -2,
  },
};

export const PROFICIENCY_STYLES = {
  Advanced: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  Intermediate: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Learning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

export const TIMELINE_CONFIG = {
  line: {
    width: 2,
    baseColor: "bg-gray-200 dark:bg-gray-700",
    progressColor: "bg-primary",
    mobileOffset: 20,
    desktopOffset: 32,
  },
  node: {
    size: "w-3 h-3",
    mobileSize: "w-2.5 h-2.5",
    baseStyle: "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600",
    activeStyle: "bg-primary border-primary shadow-lg shadow-primary/30",
    currentStyle: "bg-primary border-primary ring-4 ring-primary/20",
    scale: 1.2,
  },
  card: {
    experience: {
      tiltMax: 2,
      perspective: 1200,
      spring: { stiffness: 180, damping: 22, mass: 0.9 },
      hoverLift: -3,
    },
    education: {
      tiltMax: 0,
      hoverLift: -2,
    },
  },
  entrance: {
    stagger: 0.1,
    duration: 0.5,
  },
  responsibility: {
    stagger: 0.04,
    duration: 0.3,
    xShift: 8,
  },
  scrollProgress: {
    offsetStart: 0.7,
    offsetEnd: 0.3,
  },
};

export const REPO_CARD_CONFIG = {
  tilt: {
    max: 2,
    perspective: 1000,
    spring: {
      stiffness: 180,
      damping: 22,
      mass: 0.9,
    },
  },
  spotlight: {
    radius: 300,
    lightModeOpacity: 0.04,
    darkModeOpacity: 0.07,
  },
  entrance: {
    stagger: 0.08,
    duration: 0.4,
  },
};

/**
 * Certification Card interaction configuration.
 * Subtle interaction — weaker than Projects, similar to GitHub repos.
 */
export const CERTIFICATION_CARD_CONFIG = {
  tilt: {
    max: 2,
    perspective: 1200,
    spring: { stiffness: 180, damping: 22, mass: 0.9 },
  },
  spotlight: {
    radius: 300,
    lightModeOpacity: 0.03,
    darkModeOpacity: 0.06,
  },
  entrance: {
    stagger: 0.08,
    duration: 0.4,
  },
  hoverLift: -3,
};

/**
 * Resume Card interaction configuration.
 * Subtle interaction — focused on CTA clarity rather than 3D depth.
 */
export const RESUME_CARD_CONFIG = {
  tilt: {
    max: 1.5,
    perspective: 1400,
    spring: { stiffness: 180, damping: 22, mass: 0.9 },
  },
  entrance: {
    stagger: 0.08,
    duration: 0.4,
  },
  hoverLift: -3,
  cta: {
    hoverLift: -1,
  },
};