import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star, AlertTriangle } from "lucide-react";
import { AnimatedIcon } from "./AnimatedIcon";
import { AnimatedCounter } from "./AnimatedCounter";

const plans = [
  {
    category: "Manual Operated",
    name: "G-650 General Plan",
    price: "₹650",
    period: "/year + GST",
    features: [
      "3 services per year",
      "Greasing, spring & lock adjustments",
      "No service charges for breakdowns",
      "Applicable up to 100 Sft. shutter",
      "Extra: ₹10/Sft above 100 Sft.",
      "Spare parts cost extra",
    ],
    popular: false,
  },
  {
    category: "Manual Operated",
    name: "AD-1250 General Plan",
    price: "₹1,250",
    period: "/year + GST",
    features: [
      "3 regular services per year",
      "Damaged spares replaced at zero cost",
      "Zero breakdown service charges",
      "Applicable up to 100 Sft. (10x10)",
      "Extra: ₹15/Sft after 100 Sft.",
      "Locks not included",
    ],
    popular: true,
  },
  {
    category: "Manual Gear",
    name: "G-850",
    price: "₹850",
    period: "/year + GST",
    features: [
      "3 services per year",
      "No service charges for breakdowns",
      "Applicable for 100 to 150 Sft.",
      "Extra: ₹20/Sft additional",
      "Spare parts cost extra",
    ],
    popular: false,
  },
  {
    category: "Motorised Shutter",
    name: "G-1850",
    price: "₹1,850",
    period: "/year + GST",
    features: [
      "3 general services (Greasing/Locks)",
      "Spring tension & gear maintenance",
      "No service charges for breakdowns",
      "Applicable up to 250 Sft.",
      "Extra: ₹50/Sft above 250 Sft.",
      "Spare parts cost extra",
    ],
    popular: false,
  },
  {
    category: "Motorised Shutter",
    name: "AD-1650",
    price: "₹1,650",
    period: "/year + GST",
    features: [
      "3 regular services per year",
      "All spare parts included (except locks)",
      "Free damaged spares replacement",
      "Applicable for 100 to 150 Sft.",
      "Extra: ₹30/Sft additional",
    ],
    popular: false,
  },
  {
    category: "Motorised Shutter",
    name: "AD-3650",
    price: "₹3,650",
    period: "/year + GST",
    features: [
      "3 general services & adjustments",
      "Mechanical parts replaced free",
      "No service charges for breakdowns",
      "Applicable up to 250 Sft. only",
      "Extra: ₹100/Sft above 250 Sft.",
      "Excl: Electricals (Motor/Remotes)",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="plans" className="py-24 md:py-32 relative bg-[url('/images/industrial_texture_bg.png')] bg-cover bg-center bg-fixed" ref={ref}>
      <div className="absolute inset-0 bg-background/95" />
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary mb-4 block">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Choose Your Plan
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 premium-card group flex flex-col ${
                plan.popular ? "border-2 border-primary" : "border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold font-body flex items-center gap-1">
                  <span className="flex items-center -ml-1 text-primary-foreground">
                    <AnimatedIcon icon={Star} animationType="pulse" size={16} />
                  </span>
                  Most Popular
                </div>
              )}

              <span className="text-[10px] font-body font-bold text-primary/80 uppercase tracking-widest mb-1 block">
                {plan.category}
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                {plan.name}
              </h3>
              <div className="mb-6">
                <AnimatedCounter
                  target={parseInt(plan.price.replace(/\D/g, ""), 10)}
                  prefix="₹"
                  inView={isInView}
                  className="font-display text-3xl font-bold text-foreground"
                />
                <span className="text-sm text-muted-foreground font-body">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                    <AnimatedIcon icon={Check} size={18} className="text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  const whatsappNumber = "919336431234";
                  const text = `Hi, I am interested in the ${plan.name} plan (${plan.price}${plan.period}) for my rolling shutter maintenance. Could we discuss this further?`;
                  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
                }}
                className={`mt-auto block text-center w-full py-3 rounded-full text-sm font-semibold font-body transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_20px_rgba(255,165,0,0.3)]"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Professional Terms & Conditions Highlight */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6, delay: 0.5 }}
           className="mt-16 w-full max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-l-4 border-l-primary relative overflow-hidden">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-[url('/images/industrial_texture_bg.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <AnimatedIcon icon={AlertTriangle} animationType="hover-only" size={24} className="text-primary" />
            </div>
            
            <div className="flex-1 relative z-10">
              <h4 className="font-display font-bold text-lg md:text-xl text-foreground mb-2 tracking-tight">
                Service Requirements & Conditions
              </h4>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
                Removal or alteration of any ceiling, false ceiling, or structural obstruction is <strong className="text-foreground font-semibold">not included</strong> in ShutterWala services. Customers are responsible for arranging the removal of such obstructions <strong className="text-foreground font-semibold border-b border-primary/30 pb-0.5">prior to the service</strong>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
