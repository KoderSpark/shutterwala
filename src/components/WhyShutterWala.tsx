import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Trophy, AlertTriangle } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { AnimatedIcon } from "./AnimatedIcon";

const cards = [
  {
    icon: Target,
    animationType: "pulse",
    title: "Our Mission",
    description:
      "To provide reliable, subscription-based rolling shutter maintenance across India — ensuring zero downtime for every business we serve.",
  },
  {
    icon: Eye,
    animationType: "pulse",
    title: "Our Vision",
    description:
      "To become India's most trusted rolling shutter servicing brand, setting the standard for preventive maintenance and customer care.",
  },
  {
    icon: Trophy,
    animationType: "bounce",
    title: "Our Goal",
    description:
      "To provide quality service to every shutter in India, making professional maintenance accessible and affordable for all.",
  },
] as const;

const WhyShutterWala = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative bg-[url('/images/shutter_warehouse_bg.png')] bg-cover bg-center bg-fixed overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-background/85" />
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-[url('/images/industrial_texture_bg.png')] bg-cover bg-center opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Giant Rotating Gear Watermark */}
      <div className="absolute -left-24 -top-24 w-[600px] h-[600px] opacity-[0.02] pointer-events-none animate-gear-spin text-foreground">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
           <circle cx="50" cy="50" r="32" />
           <circle cx="50" cy="50" r="10" />
           {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
             <path
               key={angle}
               d="M44 14 L56 14 L58 24 L42 24 Z"
               transform={`rotate(${angle} 50 50)`}
             />
           ))}
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Why ShutterWala?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="premium-card rounded-2xl p-8 md:p-10 glass-card group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <AnimatedIcon icon={card.icon} animationType={card.animationType} size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {card.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Refined Maintenance Split Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 md:mt-32 overflow-hidden border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Text Side */}
            <div className="w-full md:w-1/2 py-12 md:py-20 pr-0 md:pr-12">
              <div className="flex items-center gap-2 text-primary mb-6">
                <AlertTriangle size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Maintenance Alert</span>
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-black text-foreground mb-8 leading-[1.1]">
                Rolling shutters protect your business <span className="text-primary italic">every day.</span>
              </h3>
              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10">
                Without proper maintenance, they can fail unexpectedly — causing costly downtime, safety risks, and expensive emergency repairs.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Reliability', 'Safety', 'Performance'].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border text-foreground/70 text-[10px] font-bold uppercase tracking-widest">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image Side - Clean Fit Original Aspect Ratio */}
            <div className="w-full md:w-1/2 flex items-center justify-center py-6 md:py-0">
               <img 
                 src={theme === 'dark' ? "/images/darkthemedshutter.png" : "/images/lightthemedshutter.png"} 
                 alt="Rolling Shutter Maintenance" 
                 className="w-full h-auto max-h-[500px] object-contain"
               />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyShutterWala;
