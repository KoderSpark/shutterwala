import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timeline = [
  { 
    year: "1989", 
    title: "The Legacy Begins", 
    desc: "Our founder started Sri Sai Ram Rolling Shutters in Gowliguda, Hyderabad, with a clear mission: building strong, dependable shutters and standing by every customer." 
  },
  { 
    year: "2000", 
    title: "35,000+ Trust", 
    desc: "Sri Sai Ram became a household name, proudly manufacturing and installing over 35,000 shutters for shops, warehouses, and factories across Hyderabad." 
  },
  { 
    year: "2005", 
    title: "Exponential Growth", 
    desc: "The brand firmly established its reputation as active service operations grew exponentially, serving commercial establishments of all segments." 
  },
  { 
    year: "2024", 
    title: "ShutterWala™ Evolution", 
    desc: "As reliable maintenance became a gap in the rapidly expanding city, we evolved into ShutterWala™ — India's 1st professional maintenance subscription brand." 
  },
];

const BrandStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Calculate line height based on scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary mb-4 block">
            Our Legacy. Our Responsibility.
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            The Story of ShutterWala™
          </h2>
        </motion.div>

        {/* Premium Animated Gear Watermarks */}
        <div className="absolute -left-32 top-[10%] w-[600px] h-[600px] dark:opacity-[0.03] opacity-5 pointer-events-none animate-gear-spin-slow text-black dark:text-foreground">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
             <circle cx="50" cy="50" r="40" strokeWidth="0.4" />
             <circle cx="50" cy="50" r="32" strokeWidth="0.2" />
             <circle cx="50" cy="50" r="15" strokeWidth="0.5" />
             <circle cx="50" cy="50" r="6" strokeWidth="0.2" fill="currentColor" fillOpacity="0.1" />
             
             {/* Angled Teeth */}
             {[...Array(24)].map((_, i) => (
               <path
                 key={`story-tooth1-${i}`}
                 d="M47 10 L48 6 L52 7 L52 10 Z"
                 transform={`rotate(${i * 15} 50 50)`}
               />
             ))}
             
             {/* Abstract Spokes */}
             {[...Array(8)].map((_, i) => (
               <g key={`story-spoke1-${i}`} transform={`rotate(${i * 45} 50 50)`}>
                 <line x1="50" y1="15" x2="50" y2="32" strokeWidth="0.8" />
                 <circle cx="50" cy="24" r="2" strokeWidth="0.3" fill="currentColor" />
                 <path d="M48 32 L52 32 L54 40 L46 40 Z" />
               </g>
             ))}
          </svg>
        </div>

        <div className="absolute -right-32 bottom-[20%] w-[800px] h-[800px] dark:opacity-[0.02] opacity-5 pointer-events-none animate-gear-spin text-black dark:text-foreground">
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
                 key={`story-tooth2-${i}`}
                 d="M48 8 L48.5 4 L51.5 4 L52 8 Z"
                 transform={`rotate(${i * 10} 50 50)`}
               />
             ))}

             {/* Precision Inner Notches */}
             {[...Array(18)].map((_, i) => (
               <path
                 key={`story-notch2-${i}`}
                 d="M49 26 L49 28 L51 28 L51 26 Z"
                 transform={`rotate(${i * 20} 50 50)`}
                 fill="currentColor"
               />
             ))}
             
             {/* Complex Spokes */}
             {[...Array(6)].map((_, i) => (
               <g key={`story-spoke2-${i}`} transform={`rotate(${i * 60} 50 50)`}>
                 <path d="M47 12 L53 12 L51 28 L49 28 Z" strokeWidth="0.3" fill="currentColor" fillOpacity="0.02" />
                 <path d="M49 12 L49 28" strokeWidth="0.5" />
                 <path d="M51 12 L51 28" strokeWidth="0.5" />
                 <circle cx="50" cy="20" r="1.5" strokeWidth="0.2" fill="currentColor" />
               </g>
             ))}
          </svg>
        </div>

        <div className="max-w-4xl mx-auto relative mt-20">
          {/* Animated SVG center line (Desktop) */}
          <div className="absolute left-[24px] md:left-1/2 top-4 bottom-8 w-[2px] bg-border md:-translate-x-[1px] hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-primary w-full origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {timeline.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`relative flex items-center mb-24 md:mb-32 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Mobile vertical line */}
                <div className="absolute left-[24px] top-0 bottom-[-6rem] w-[2px] bg-border md:hidden">
                  <motion.div 
                    className="absolute top-0 left-0 right-0 bg-primary w-full origin-top"
                    style={{ height: lineHeight }}
                  />
                </div>

                {/* Center Node Marker */}
                <div className="absolute left-[24px] md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-2 z-10 hidden md:block" />
                
                {/* Mobile Node Marker */}
                <div className="absolute left-[24px] w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-2 z-10 md:hidden" />

                {/* Content Side */}
                <div className={`ml-16 md:ml-0 md:w-1/2 relative group ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 text-left"}`}>
                  
                  {/* Glowing line connector (Desktop only) */}
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "2rem" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`absolute top-2 h-[2px] bg-primary hidden md:block ${isEven ? "right-6" : "left-6"}`}
                  />

                  {/* Massive Background Year Watermark */}
                  <div className={`absolute top-1/2 -translate-y-1/2 text-8xl md:text-9xl font-display font-black text-foreground/5 dark:text-foreground/5 z-0 select-none ${isEven ? "md:-right-12 right-0 origin-right" : "md:-left-12 left-0 origin-left"}`}>
                    {item.year}
                  </div>

                  {/* Interactive Card */}
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative z-10 glass-card p-6 md:p-8 rounded-2xl border border-border/50"
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-display font-bold text-lg mb-4">
                      {item.year}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>

                </div>

                {/* Empty Side (Desktop space filler) */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
