import { MessageCircle, ArrowRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { AnimatedIcon } from "./AnimatedIcon";
import { motion } from "framer-motion";
import footerBg from "@/assets/commercial-shutters.jpg";

const footerLinks = {
  Menu: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Plans", href: "#plans" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],
  Services: [
    { label: "Monthly Servicing", href: null },
    { label: "Emergency Repair", href: null },
    { label: "Greasing", href: null },
    { label: "Safety Inspection", href: null },
    { label: "All spare parts replacement", href: null },
    { label: "Installation", href: null }
  ],
  Plans: [
    { label: "G-650 General Plan", href: "#plans" },
    { label: "AD-1250 General Plan", href: "#plans" },
    { label: "G-850", href: "#plans" },
    { label: "AD-1650", href: "#plans" },
    { label: "G-1850", href: "#plans" },
    { label: "AD-3650", href: "#plans" }
  ],
};

const Footer = () => {
  return (
    <footer className="relative bg-background text-foreground overflow-hidden border-t border-border transition-colors duration-300">
      {/* Main Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={footerBg}
          alt="Commercial Shutters"
          className="w-full h-full object-cover opacity-20 bg-fixed"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/images/industrial_texture_bg.png')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none z-[1]" />

      {/* Premium Animated Gear Watermarks */}
      <div className="absolute -right-24 -top-24 w-[800px] h-[800px] dark:opacity-[0.03] opacity-5 pointer-events-none animate-gear-spin text-black dark:text-white">
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

      <div className="absolute -left-32 bottom-0 w-[600px] h-[600px] dark:opacity-[0.02] opacity-5 pointer-events-none animate-gear-spin-slow text-black dark:text-white">
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

      {/* Premium Top Edge Glow */}
      <div className="absolute top-0 left-0 right-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute top-0 right-0 left-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Atmospheric Lighting */}
      <div className="absolute -top-24 left-1/4 w-1/3 h-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-1/3 h-64 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24 pb-8">
        {/* Massive CTA Section */}
        <div className="mb-24 pb-16 border-b border-border text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight"
            >
              Ready to secure your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient-slow drop-shadow-sm">premises?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0"
            >
              India's 1st subscription-based shutter servicing company. <br />
              <span className="text-primary font-bold uppercase tracking-widest text-xs mt-2 block">Powered by GVKS ShutterWala Services</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="shrink-0"
          >
            <a
              href={`https://wa.me/919336431234`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-body font-bold text-base hover:shadow-[0_10px_40px_rgba(37,211,102,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden border border-white/20"
            >
              {/* Premium Glass Polish */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />

              {/* Shine Animation */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />

              <span className="relative z-10 flex items-center justify-center">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-white fill-white"
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 1, ease: "easeInOut" }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </motion.svg>
              </span>
              <span className="relative z-10 tracking-tight">Chat on WhatsApp</span>
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-12 gap-y-16 mb-20">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <img src="/logo.png" alt="ShutterWala Logo" className="hidden dark:block h-32 w-auto mb-6 object-contain" />
            <img src="/lightthemelogo.png" alt="ShutterWala Logo" className="block dark:hidden h-32 w-auto mb-6 object-contain" />
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 max-w-[280px]">
              Evolving the legacy of ganesh Rolling Shutters into professional maintenance.
            </p>
            <p className="font-display text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-8">
              Trusted | Reliable | Professional
            </p>
            {/* Socials */}
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/share/18QQKAugsM/", color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]", label: "Facebook" },
                { Icon: Instagram, href: "https://www.instagram.com/shutterwala_official?igsh=NG56N3d3OTA5bXdk", color: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent", label: "Instagram" },
                { Icon: Linkedin, href: "https://in.linkedin.com/in/shutter-wala-0872673bb", color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]", label: "LinkedIn" }
              ].map(({ Icon, href, color, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-border text-muted-foreground transition-all duration-300 group ${color}`}
                >
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <div key={title} className="col-span-1">
              <h4 className="font-display text-[11px] font-black text-foreground mb-8 uppercase tracking-[0.25em] opacity-60">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * colIndex + (i * 0.05) }}
                  >
                    {link.href ? (
                      <a
                        href={link.href}
                        className="group flex items-center font-body text-[13px] text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span className="font-body text-[13px] text-muted-foreground transition-all duration-300 cursor-default select-none">
                        {link.label}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Semantic NAP for Local SEO — visually subtle, machine readable */}
          <address className="not-italic font-body text-[10px] text-muted-foreground tracking-[0.15em] uppercase text-center md:text-left" itemScope itemType="https://schema.org/LocalBusiness">
            <span itemProp="name">ShutterWala™</span> ·{" "}
            <span itemProp="streetAddress">Gowliguda</span>,{" "}
            <span itemProp="addressLocality">Hyderabad</span>,{" "}
            <span itemProp="addressRegion">Telangana</span> ·{" "}
            <a href="tel:+919336431234" itemProp="telephone" className="hover:text-primary transition-colors">+91 933 643 1234</a>
          </address>
          <p className="font-body text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} ShutterWala India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
