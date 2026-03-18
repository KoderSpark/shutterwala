import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "./AnimatedCounter";

const stats = [
  { value: 35000, suffix: "+", label: "Shutters Installed" },
  { value: 35, suffix: "+", label: "Years Experience" },
  { value: 2, suffix: " hrs", label: "Avg Response Time" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 relative bg-[url('/images/abstract_metal_lines.png')] bg-cover bg-center bg-fixed" ref={ref}>
      <div className="absolute inset-0 bg-secondary/80 backdrop-blur-[2px]" />
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter 
                target={stat.value} 
                suffix={stat.suffix} 
                inView={isInView} 
                className="font-display text-4xl md:text-5xl font-bold text-foreground"
              />
              <p className="font-body text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
