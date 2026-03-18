import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
  className?: string;
}

export const AnimatedCounter = ({ target, prefix = "", suffix = "", inView, className = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0); // Reset when out of view so it animates again when scrolling back
      return;
    }
    
    let start = 0;
    const duration = 2000; // 2 seconds
    const intervalTime = 16; // ~60fps
    const step = target / (duration / intervalTime);
    
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);
    
    return () => clearInterval(timer);
  }, [inView, target]);

  const formatted = target >= 1000 ? count.toLocaleString("en-IN") : count;

  return (
    <span className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
};
