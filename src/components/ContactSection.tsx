import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, Globe, Navigation } from "lucide-react";
import { AnimatedIcon } from "./AnimatedIcon";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const hyderabadNumber = "919336431234";
  const mumbaiNumber = "917208338298";
  const tollFree = "1800-599-1233";

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-background transition-colors duration-300 overflow-hidden" ref={ref}>
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/industrial_texture_bg.png')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Narrative & Primary Support */}
          <div className="lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-body font-semibold tracking-[0.4em] uppercase text-primary mb-6 block">
                Connect With Excellence
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight">
                Our <span className="gradient-text uppercase">Direct</span> <br/>
                Line of Trust.
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-12 max-w-md">
                From our roots in Gowliguda to our regional expansion in Mumbai, we maintain the same commitment to precision and reliability.
              </p>

              {/* Global Support Pillar */}
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="glass-card rounded-2xl p-6 border-l-4 border-l-primary group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-bold">National Toll-Free</p>
                      <a href={`tel:${tollFree.replace(/-/g, "")}`} className="text-2xl font-display font-black text-foreground hover:text-primary transition-colors">
                        {tollFree}
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="glass-card rounded-2xl p-6 border-l-4 border-l-blue-500 group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-bold">Official Correspondence</p>
                      <a href="mailto:info@shutterwala.com" className="text-lg font-body font-bold text-foreground hover:text-blue-500 transition-colors">
                        info@shutterwala.com
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Regional Hubs & Interactive Elements */}
          <div className="lg:w-3/5 grid gap-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hyderabad HQ Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl" />
                <div className="relative glass-card rounded-3xl p-8 border border-white/10 flex flex-col h-full hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-10">
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-tighter">
                      Headquarters
                    </div>
                    <Globe className="text-foreground/20" size={20} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Hyderabad</h3>
                  <div className="space-y-4 mb-10 flex-grow">
                    <div className="flex gap-3 items-start">
                      <MapPin size={18} className="text-primary mt-1 shrink-0" />
                      <p className="text-sm text-muted-foreground leading-snug">Gowliguda, Hyderabad - 12,<br/>Telangana State, India.</p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Phone size={18} className="text-primary shrink-0" />
                      <a href={`tel:+${hyderabadNumber}`} className="text-base font-bold text-foreground hover:underline">+91 933 643 1234</a>
                    </div>
                  </div>
                  <a 
                    href={`https://wa.me/${hyderabadNumber}`}
                    className="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-secondary text-foreground font-bold text-sm hover:bg-primary hover:text-white transition-all group/btn border border-border"
                  >
                    <MessageSquare size={16} className="group-hover/btn:scale-110 transition-transform" />
                    Direct Connect
                  </a>
                </div>
              </motion.div>

              {/* Mumbai Regional Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl" />
                <div className="relative glass-card rounded-3xl p-8 border border-white/10 flex flex-col h-full hover:border-blue-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-10">
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-tighter">
                      Regional Office
                    </div>
                    <Navigation className="text-foreground/20" size={20} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Mumbai</h3>
                  <div className="space-y-4 mb-10 flex-grow">
                    <div className="flex gap-3 items-start">
                      <MapPin size={18} className="text-blue-500 mt-1 shrink-0" />
                      <p className="text-sm text-muted-foreground leading-snug">Rosa Bella 1, Ghodbunder Road,<br/>Thane West, Mumbai.</p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Phone size={18} className="text-blue-500 shrink-0" />
                      <a href={`tel:+${mumbaiNumber}`} className="text-base font-bold text-foreground hover:underline">+91 720 833 8298</a>
                    </div>
                  </div>
                  <a 
                    href={`https://wa.me/${mumbaiNumber}`}
                    className="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-secondary text-foreground font-bold text-sm hover:bg-blue-500 hover:text-white transition-all group/btn border border-border"
                  >
                    <MessageSquare size={16} className="group-hover/btn:scale-110 transition-transform" />
                    Office Liaison
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Premium Integrated Map Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative rounded-[2rem] overflow-hidden border border-white/10 h-[320px] shadow-2xl group"
            >
              <div className="absolute inset-0 bg-primary/5 z-10 pointer-events-none mix-blend-overlay group-hover:bg-transparent transition-colors" />
              <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-border flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-foreground uppercase tracking-widest">HQ Tracking Active</span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5!2d78.474!3d17.374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIyJzI2LjQiTiA3OMKwMjgnMjYuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
