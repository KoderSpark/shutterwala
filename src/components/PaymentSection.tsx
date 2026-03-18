import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { QrCode, Smartphone } from "lucide-react";

const PaymentSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const upiApps = ["Google Pay", "PhonePe", "Paytm", "Any UPI"];

  return (
    <section className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary mb-4 block">
            Quick Pay
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            UPI Payment
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto glass-card rounded-2xl p-8 md:p-10 text-center"
        >
          {/* QR Placeholder */}
          <div className="w-48 h-48 mx-auto mb-6 rounded-xl bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center">
            <QrCode className="w-16 h-16 text-muted-foreground" />
          </div>

          <p className="font-body text-sm text-muted-foreground mb-6">
            Scan QR code to pay via UPI
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {upiApps.map((app) => (
              <span
                key={app}
                className="px-4 py-2 rounded-full bg-secondary/80 text-foreground text-xs font-body font-medium flex items-center gap-1.5"
              >
                <Smartphone size={14} className="text-primary" />
                {app}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentSection;
