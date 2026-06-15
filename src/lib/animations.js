// ─────────────────────────────────────────────────────────────
// DIGITAL COSMOS — Animation Presets
// Framer Motion variants & GSAP configuration
// ─────────────────────────────────────────────────────────────

// Premium easing curves
export const easings = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  premium: [0.76, 0, 0.24, 1],
  dramatic: [0.16, 1, 0.3, 1],
  bounce: [0.34, 1.56, 0.64, 1],
};

// ── Framer Motion Variants ──────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easings.premium },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easings.smooth },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: easings.smooth },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easings.dramatic },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easings.premium },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easings.premium },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

// For SVG path drawing
export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.8, ease: easings.premium },
  },
};

// Character stagger for text reveals
export const charReveal = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: easings.premium,
      delay: i * 0.03,
    },
  }),
};

// Word stagger for text reveals
export const wordReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.premium,
      delay: i * 0.08,
    },
  }),
};

// Glow pulse for star/accent elements
export const glowPulse = {
  initial: { opacity: 0.4, scale: 0.95 },
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [0.95, 1.05, 0.95],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Floating decoration animation
export const float = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Navbar entrance
export const navReveal = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easings.smooth, delay: 0.5 },
  },
};
