import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star, AlertTriangle } from "lucide-react";
import { AnimatedIcon } from "./AnimatedIcon";
import { AnimatedCounter } from "./AnimatedCounter";

// Organised as [column][row] to match the 3-col × 2-row grid in the design image
const categories = [
  {
    label: "Manual Operated Shutters",
    plans: [
      {
        name: "G-650 General Plan",
        price: "₹650",
        priceNum: 650,
        period: "/year + GST",
        popular: false,
        features: [
          "Annual premium payment: Rs. 650/- Only + GST",
          "Includes - 3 services per year",
          "Greasing the shutter, spring adjustments, side and centre lock adjustments etc.",
          "Spare Parts not Included",
          "Only Spare parts cost will be charged extra at the time of any breakdowns",
          "No service charges for any kind of breakdowns",
          "This plan is applicable up to 100 Sft. shutter only",
          "Above 100 Sft. extra Rs. 10/- is charged per Sft.",
        ],
      },
      {
        name: "AD-1250 General Plan",
        price: "₹1,250",
        priceNum: 1250,
        period: "/year + GST",
        popular: true,
        features: [
          "Annual premium payment Rs. 1250/- Only + GST",
          "Includes - 3 regular services are given in one year",
          "Within a one year any kind of break downs the damaged spare parts will be replaced with zero cost",
          "Shutter side and centre locks are not included",
          "This plan will be applicable up to 100 Sft. only (Ex: 10x10 shutter)",
          "After 100 Sft. Rs. 15/- will be charged per for each Sft.",
        ],
      },
    ],
  },
  {
    label: "Manual Gear Operated Shutters",
    plans: [
      {
        name: "G-850",
        price: "₹850",
        priceNum: 850,
        period: "/year + GST",
        popular: false,
        features: [
          "Annual premium payment: Rs. 850/- Only + GST",
          "Includes - 3 services per year",
          "Spare Parts not Included",
          "In case any break down. Only spare parts Cost will be charged",
          "No any service charges",
          "Applicable for 100 to 150 Sft. shutter Only",
          "Additional each Sft. Rs. 20/- will be charged",
        ],
      },
      {
        name: "AD-1650",
        price: "₹1,650",
        priceNum: 1650,
        period: "/year + GST",
        popular: false,
        features: [
          "Annual premium payment: Rs. 1650/- Only + GST",
          "Includes - 3 services per year",
          "All Spare Parts are Included",
          "In case any break down with in a year the damaged spare parts will be replace at free of cost",
          "Shutter side and centre locks are not included",
          "Applicable for 100 to 150 Sft. shutter only",
          "Additional each Sft. Rs. 30/- will be charged",
        ],
      },
    ],
  },
  {
    label: "Motorised Shutter",
    plans: [
      {
        name: "G-1850",
        price: "₹1,850",
        priceNum: 1850,
        period: "/year + GST",
        popular: false,
        features: [
          "Annual payment Rs. 1850/- Only + GST",
          "3 General Services like greasing",
          "Spring tension adjustment",
          "Check locks functions",
          "Greasing on gear and worm etc.",
          "Spare parts are not included",
          "In Case any break down only spare parts cost will be charged",
          "Applicable shutter size up 250 Sft.",
          "Above 250 Sft. each Sft. will be charged Rs. 50/- per Sft.",
        ],
      },
      {
        name: "AD-3650",
        price: "₹3,650",
        priceNum: 3650,
        period: "/year + GST",
        popular: false,
        features: [
          "Annual payment Rs. 3650/- Only + GST",
          "3 General Services like greasing",
          "Spring tension adjustment",
          "Check locks functions",
          "Greasing on gear and worm etc.",
          "All Spare parts are included",
          "In Case any break down all mechanical parts will be replaced with free of cost",
          "Excluded spare parts like Electrical gear shutter motor, electrical switches, electrical wiring, and remote controls etc.",
          "Applicable shutter size up to 250 Sft. only",
          "Above 250 Sft. Rs. 100/- will be charged per Sft.",
        ],
      },
    ],
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Flatten plans array with category info, keeping original order for animation index
  const allPlansFlat = categories.flatMap((cat) =>
    cat.plans.map((plan) => ({ ...plan, category: cat.label }))
  );

  return (
    <section
      id="plans"
      className="py-24 md:py-32 relative bg-[url('/images/industrial_texture_bg.png')] bg-cover bg-center bg-fixed"
      ref={ref}
    >
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

        {/* 3-column category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, catIdx) => (
            <div key={cat.label} className="flex flex-col gap-6">
              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="text-center"
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-body font-bold uppercase tracking-widest border border-primary/20">
                  {cat.label}
                </span>
              </motion.div>

              {/* Plans in this column */}
              {cat.plans.map((plan, planIdx) => {
                // Global animation index for stagger
                const animIdx = catIdx * 2 + planIdx;
                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + animIdx * 0.08 }}
                    className={`relative rounded-2xl p-7 premium-card group flex flex-col flex-1 ${
                      plan.popular
                        ? "border-2 border-primary"
                        : "border border-border"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold font-body flex items-center gap-1 whitespace-nowrap">
                        <span className="flex items-center -ml-1 text-primary-foreground">
                          <AnimatedIcon icon={Star} animationType="pulse" size={16} />
                        </span>
                        Most Popular
                      </div>
                    )}

                    {/* Plan name */}
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-5 flex items-baseline gap-1">
                      <AnimatedCounter
                        target={plan.priceNum}
                        prefix="₹"
                        inView={isInView}
                        className="font-display text-3xl font-bold text-foreground"
                      />
                      <span className="text-sm text-muted-foreground font-body">
                        {plan.period}
                      </span>
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm font-body text-muted-foreground"
                        >
                          <AnimatedIcon
                            icon={Check}
                            size={16}
                            className="text-primary mt-0.5 shrink-0"
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => {
                        const whatsappNumber = "919336431234";
                        const text = `Hi, I am interested in the ${plan.name} plan (${plan.price}${plan.period}) for my rolling shutter maintenance. Could we discuss this further?`;
                        window.open(
                          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
                          "_blank"
                        );
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
                );
              })}
            </div>
          ))}
        </div>

        {/* Terms & Conditions Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 w-full max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-l-4 border-l-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/industrial_texture_bg.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <AnimatedIcon
                icon={AlertTriangle}
                animationType="hover-only"
                size={24}
                className="text-primary"
              />
            </div>
            <div className="flex-1 relative z-10">
              <h4 className="font-display font-bold text-lg md:text-xl text-foreground mb-2 tracking-tight">
                Service Requirements &amp; Conditions
              </h4>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
                Removal or alteration of any ceiling, false ceiling, or
                structural obstruction is{" "}
                <strong className="text-foreground font-semibold">
                  not included
                </strong>{" "}
                in ShutterWala services. Customers are responsible for
                arranging the removal of such obstructions{" "}
                <strong className="text-foreground font-semibold border-b border-primary/30 pb-0.5">
                  prior to the service
                </strong>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
