import { motion } from "framer-motion";
import heroImg from "@/assets/hero-shutter.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-start md:items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Industrial rolling shutter"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Premium Animated Gear Watermarks */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[800px] h-[800px] dark:opacity-[0.03] opacity-5 pointer-events-none animate-gear-spin text-black dark:text-foreground">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <circle cx="50" cy="50" r="42" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="38" strokeWidth="0.2" strokeDasharray="1 1" />
          <circle cx="50" cy="50" r="28" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="26" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="12" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="8" strokeWidth="0.3" fill="currentColor" fillOpacity="0.05" />

          {/* Detailed Teeth */}
          {[...Array(36)].map((_, i) => (
            <path
              key={`tooth-${i}`}
              d="M48 8 L48.5 4 L51.5 4 L52 8 Z"
              transform={`rotate(${i * 10} 50 50)`}
            />
          ))}

          {/* Precision Inner Notches */}
          {[...Array(18)].map((_, i) => (
            <path
              key={`notch-${i}`}
              d="M49 26 L49 28 L51 28 L51 26 Z"
              transform={`rotate(${i * 20} 50 50)`}
              fill="currentColor"
            />
          ))}

          {/* Complex Spokes */}
          {[...Array(6)].map((_, i) => (
            <g key={`spoke-${i}`} transform={`rotate(${i * 60} 50 50)`}>
              <path d="M47 12 L53 12 L51 28 L49 28 Z" strokeWidth="0.3" fill="currentColor" fillOpacity="0.02" />
              <path d="M49 12 L49 28" strokeWidth="0.5" />
              <path d="M51 12 L51 28" strokeWidth="0.5" />
              <circle cx="50" cy="20" r="1.5" strokeWidth="0.2" fill="currentColor" />
            </g>
          ))}
        </svg>
      </div>

      <div className="absolute -left-24 top-0 w-[600px] h-[600px] dark:opacity-[0.02] opacity-5 pointer-events-none animate-gear-spin-slow text-black dark:text-foreground">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
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

      <div className="container mx-auto px-4 md:px-8 relative z-10 pt-28 md:pt-24 pb-32 md:pb-0">
        <div className="max-w-2xl">
          {/* Logo Image - Mobile Only */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:hidden flex justify-center items-center mt-12 mb-16 w-full"
          >
            <img src="/logo.png" alt="ShutterWala" className="hidden dark:block h-20 sm:h-24 w-auto object-contain" />
            <img src="/lightthemelogo.png" alt="ShutterWala" className="block dark:hidden h-20 sm:h-24 w-auto object-contain" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group relative inline-flex items-center gap-4 mb-10 px-6 py-3 rounded-2xl glass-card border-white/10 shadow-2xl cursor-default overflow-hidden"
          >
            {/* Animated Shine Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />
            
            {/* Pulse Indicator */}
            <div className="relative flex items-center justify-center">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
              <div className="absolute inset-0 w-3 h-3 bg-primary rounded-full animate-ping opacity-30" />
            </div>

            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-display font-black text-foreground tracking-tight leading-none">
                India's <span className="gradient-text uppercase">First</span>
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] md:text-xs font-body font-bold text-muted-foreground uppercase tracking-[0.25em]">
                  Rolling Shutter Service
                </span>
                <div className="h-[1px] w-6 bg-primary/40 rounded-full" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] text-foreground mb-6"
          >
            We Maintain <span className="gradient-text">Rolling Shutters.</span>{" "}
            You Operate <span className="gradient-text">Your Business.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl"
          >
            Rolling shutters protect your business every day. Without proper maintenance
            they can fail unexpectedly — causing downtime, safety risks and expensive repairs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#book"
              className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              Inspection
            </a>
            <a
              href="#plans"
              className="px-8 py-3.5 rounded-full border border-border text-foreground font-body font-semibold text-sm hover:bg-secondary transition-all"
            >
              See Plans
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
