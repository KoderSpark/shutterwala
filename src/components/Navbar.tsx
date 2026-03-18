import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Home, Briefcase, ListTodo, Info, PhoneCall, Sun, Moon } from "lucide-react";
import { AnimatedIcon } from "./AnimatedIcon";

// Use animated icons for the compact dock
const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Services", href: "#services", icon: Briefcase },
  { label: "Plans", href: "#plans", icon: ListTodo },
  { label: "About", href: "#about", icon: Info },
  { label: "Contact", href: "#contact", icon: PhoneCall },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(navItems[0].label);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy Logic
      const sections = navItems.map(item => ({
        id: item.href.substring(1),
        label: item.label
      }));

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section encompasses the middle of the viewport
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            setActiveTab(section.label);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none w-full px-2 sm:px-4 overflow-visible flex justify-center ${
      scrolled 
        ? 'bottom-6 md:bottom-auto md:top-6' 
        : 'bottom-4 md:bottom-auto md:top-4'
    }`}>
      <motion.nav
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full border border-border transition-all duration-300 ${
          scrolled 
            ? "bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/20" 
            : "bg-background/80 md:bg-background/50 backdrop-blur-md shadow-lg"
        }`}
      >
        {/* Logo Image - Hidden on mobile */}
        <a 
          href="#home" 
          onClick={() => setActiveTab("Home")}
          className="hidden md:flex items-center justify-center pl-4 pr-3 hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="ShutterWala" className="hidden dark:block h-5 w-auto object-contain" />
          <img src="/lightthemelogo.png" alt="ShutterWala" className="block dark:hidden h-5 w-auto object-contain" />
        </a>

        {/* Vertical Divider */}
        <div className="hidden md:block w-[1px] h-8 bg-border/50 mx-1" />

        {/* Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveTab(item.label)}
                className={`relative flex items-center justify-center p-2 rounded-full overflow-hidden transition-all duration-300 ${
                  isActive ? "text-primary-foreground group" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
                aria-label={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-primary -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="flex items-center gap-1.5 sm:gap-2 px-1">
                  <AnimatedIcon
                    icon={item.icon}
                    size={20}
                    className={isActive ? "text-primary-foreground" : "text-muted-foreground"}
                  />
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, width: 0, scale: 0.8 }}
                        animate={{ opacity: 1, width: "auto", scale: 1 }}
                        exit={{ opacity: 0, width: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="text-[11px] sm:text-xs font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </a>
            );
          })}
        </div>

        {/* Vertical Divider */}
        <div className="hidden sm:block w-[1px] h-8 bg-border/50 mx-1" />

        {/* Quick Actions */}
        <div className="flex items-center gap-1 sm:gap-2 pr-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors shrink-0"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>

          {/* WhatsApp Action Button */}
          <a
            href={`https://wa.me/919336431234`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366] text-white hover:opacity-90 hover:scale-105 transition-all shadow-md shadow-[#25D366]/20 shrink-0"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{ width: '1em', height: '1em' }} className="sm:w-[18px] sm:h-[18px]" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
