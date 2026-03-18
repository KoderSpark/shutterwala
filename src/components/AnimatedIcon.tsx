import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  strokeWidth?: number;
  animationType?: "pulse" | "spin" | "wiggle" | "bounce" | "hover-only";
}

export const AnimatedIcon = ({
  icon: Icon,
  className,
  size = 24,
  strokeWidth = 2,
  animationType = "hover-only",
}: AnimatedIconProps) => {
  const getLoopAnimation = () => {
    switch (animationType) {
      case "pulse":
        return {
          animate: { scale: [1, 1.18, 1] },
          transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
        };
      case "spin":
        return {
          animate: { rotate: [0, 360] },
          transition: { repeat: Infinity, duration: 3, ease: "linear" },
        };
      case "wiggle":
        return {
          animate: { rotate: [0, -14, 14, -10, 10, -6, 6, 0] },
          transition: { repeat: Infinity, duration: 1.2, repeatDelay: 1.5, ease: "easeInOut" },
        };
      case "bounce":
        return {
          animate: { y: [0, -7, 0] },
          transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
        };
      default:
        return { animate: {}, transition: {} };
    }
  };

  const loopProps = getLoopAnimation();

  return (
    <motion.div
      animate={loopProps.animate}
      transition={loopProps.transition as any}
      whileHover={{ scale: 1.2 }}
      className={`inline-flex items-center justify-center cursor-default ${className || ""}`}
    >
      <Icon size={size} strokeWidth={strokeWidth} />
    </motion.div>
  );
};
