import { motion } from "framer-motion";

// --- Animated SVG Icons for each service ---

export const WrenchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.g
      animate={{ rotate: [0, -30, 30, -20, 20, 0] }}
      transition={{ repeat: Infinity, duration: 1.6, repeatDelay: 1.2, ease: "easeInOut" }}
      style={{ originX: "50%", originY: "50%" }}
    >
      <path d="M19.5 4.5a4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-1.41-.23L7.5 15 9 16.5l-5 5-2-2 5-5 1.5 1.5 6.23-6.09A4.5 4.5 0 1 1 19.5 4.5z" />
    </motion.g>
  </svg>
);

export const LightningIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M15 3L6 16h8l-1 9 9-13h-8l1-9z"
      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.12, 1] }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      style={{ originX: "50%", originY: "50%" }}
    />
    <motion.circle
      cx="14" cy="14" r={11}
      strokeOpacity={0.2}
      initial={{ r: 11 }}
      animate={{ r: [11, 13, 11], opacity: [0.2, 0, 0.2] }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeOut" }}
    />
  </svg>
);

export const OilDropIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M14 4 C14 4 7 12 7 17 a7 7 0 0 0 14 0 C21 12 14 4 14 4z"
      animate={{ y: [0, -2, 0] }}
      transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
    />
    <motion.line
      x1="10" y1="18" x2="12" y2="16"
      strokeOpacity={0.6}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ repeat: Infinity, duration: 1.4, delay: 0.3 }}
    />
  </svg>
);

export const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M14 3L5 7v7c0 5 3.9 9.7 9 11 5.1-1.3 9-6 9-11V7L14 3z"
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      style={{ originX: "50%", originY: "50%" }}
    />
    <motion.polyline
      points="10,14 13,17 18,11"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
    />
  </svg>
);

export const SpinnerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.g
      animate={{ rotate: [0, 360] }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      style={{ originX: "50%", originY: "50%" }}
    >
      <circle cx="14" cy="14" r="9" />
      <circle cx="14" cy="5" r="2.5" fill="currentColor" strokeWidth={0} />
      <circle cx="14" cy="23" r="2.5" fill="currentColor" strokeWidth={0} />
      <circle cx="5" cy="14" r="2.5" fill="currentColor" strokeWidth={0} />
      <circle cx="23" cy="14" r="2.5" fill="currentColor" strokeWidth={0} />
    </motion.g>
  </svg>
);

export const PlusExpandIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14" cy="14" r="11" />
    <motion.line
      x1="14" y1="9" x2="14" y2="19"
      animate={{ scaleY: [1, 0.5, 1] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      style={{ originX: "50%", originY: "50%" }}
    />
    <motion.line
      x1="9" y1="14" x2="19" y2="14"
      animate={{ scaleX: [1, 0.5, 1] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.4 }}
      style={{ originX: "50%", originY: "50%" }}
    />
  </svg>
);
