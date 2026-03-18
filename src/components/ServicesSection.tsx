import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WrenchIcon, LightningIcon, OilDropIcon, ShieldIcon, SpinnerIcon, PlusExpandIcon } from "./ServiceIcons";

const services = [
  { icon: <WrenchIcon />, title: "Monthly Shutter Servicing", desc: "Regular preventive maintenance to keep your shutters running smooth." },
  { icon: <LightningIcon />, title: "Emergency Repair 24/7", desc: "Round-the-clock emergency repair service with 2-hour response time." },
  { icon: <OilDropIcon />, title: "Greasing & Lubrication", desc: "Professional-grade lubrication for noise-free, effortless operation." },
  { icon: <ShieldIcon />, title: "Safety Inspection", desc: "Comprehensive safety audits to ensure compliance and prevent hazards." },
  { icon: <SpinnerIcon />, title: "Roller Replacement", desc: "Worn-out roller replacement using premium industrial-grade parts." },
  { icon: <PlusExpandIcon />, title: "New Shutter Installation", desc: "End-to-end installation of modern rolling shutters for any business." },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 md:py-32 bg-muted/40 overflow-hidden border-b border-border" ref={ref}>
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/images/industrial_texture_bg.png')] bg-cover bg-center opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      {/* Premium Animated Gear Watermark */}
      <div className="absolute -left-24 -bottom-24 w-[600px] h-[600px] dark:opacity-[0.02] opacity-5 pointer-events-none animate-gear-spin-slow text-black dark:text-white">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
           <circle cx="50" cy="50" r="40" strokeWidth="0.4" />
           <circle cx="50" cy="50" r="32" strokeWidth="0.2" />
           <circle cx="50" cy="50" r="15" strokeWidth="0.5" />
           <circle cx="50" cy="50" r="6" strokeWidth="0.2" fill="currentColor" fillOpacity="0.1" />
           
           {/* Angled Teeth */}
           {[...Array(24)].map((_, i) => (
             <path
               key={`tooth2-${i}`}
               d="M47 10 L48 6 L52 7 L52 10 Z"
               transform={`rotate(${i * 15} 50 50)`}
             />
           ))}
           
           {/* Abstract Spokes */}
           {[...Array(8)].map((_, i) => (
             <g key={`spoke2-${i}`} transform={`rotate(${i * 45} 50 50)`}>
               <line x1="50" y1="15" x2="50" y2="32" strokeWidth="0.8" />
               <circle cx="50" cy="24" r="2" strokeWidth="0.3" fill="currentColor" />
               <path d="M48 32 L52 32 L54 40 L46 40 Z" />
             </g>
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
            What We Do
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Our Services
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="premium-card rounded-2xl p-8 group cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-all duration-300 text-primary">
                {s.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {s.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
