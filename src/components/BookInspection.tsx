import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { AnimatedIcon } from "./AnimatedIcon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const shutterTypes = ["Rolling Shutter", "Motorized Shutter", "Grill Shutter", "Sliding Shutter", "Aluminium Shutter", "Other"];
const planOptions = ["G-650", "AD-1250", "G-850", "G-1850", "AD-1650", "AD-3650", "Not Sure"];

const BookInspection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    location: "",
    shutterType: "",
    plan: "",
    message: ""
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
    }
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }

    setIsSubmitting(true);
    let imageUrl = "";

    try {
      if (file) {
        // --- Pre-compress image before uploading to Cloudinary ---
        const compressImage = async (imageFile: File): Promise<File> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = (event) => {
              const img = new Image();
              img.src = event.target?.result as string;
              img.onload = () => {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 800; // Force downscale to ensure WhatsApp preview logic works
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleSize;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                  resolve(imageFile); // fallback to original if canvas fails
                  return;
                }

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Compress heavily to a JPEG (0.6 quality = ~60%)
                canvas.toBlob((blob) => {
                  if (blob) {
                    const compressedFile = new File([blob], imageFile.name.replace(/\.[^/.]+$/, ".jpg"), {
                      type: "image/jpeg",
                      lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                  } else {
                    resolve(imageFile);
                  }
                }, "image/jpeg", 0.6);
              };
              img.onerror = (error) => reject(error);
            };
            reader.onerror = (error) => reject(error);
          });
        };

        const compressedFile = await compressImage(file);

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
        const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

        const timestamp = Math.round(new Date().getTime() / 1000).toString();
        const signatureString = `timestamp=${timestamp}${apiSecret}`;
        const encoder = new TextEncoder();
        const data = encoder.encode(signatureString);
        const hashBuffer = await crypto.subtle.digest("SHA-1", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const signature = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

        const formDataToUpload = new FormData();
        formDataToUpload.append("file", compressedFile);
        formDataToUpload.append("api_key", apiKey);
        formDataToUpload.append("timestamp", timestamp);
        formDataToUpload.append("signature", signature);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formDataToUpload
        });

        const dataRes = await response.json();
        if (dataRes.public_id) {
          // Use only the Cloudinary public_id to build a very short share URL: /api/share?i=abc123
          // The server-side function reconstructs the full Cloudinary URL from the ID
          const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
          imageUrl = `${siteUrl}/api/share?i=${encodeURIComponent(dataRes.public_id)}`;
        }
      }

      // Place share URL at the TOP so WhatsApp renders the preview card right over it,
      // visually absorbing the raw link into the card header. The link must be in the text
      // to trigger the preview, but this placement makes it least intrusive.
      const text = `${imageUrl ? `${imageUrl}\n` : ""}*New Inspection Request*\nName: ${formData.name}\nMobile: ${formData.mobile}\nLocation: ${formData.location}\n\n*Details*\nShutter Type: ${formData.shutterType || "Not Specified"}\nPlan: ${formData.plan || "Not Specified"}\nMessage: ${formData.message || "None"}`;

      const whatsappNumber = "919336431234";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

      window.open(whatsappUrl, "_blank");

      setStep(1);
      setFormData({ name: "", mobile: "", location: "", shutterType: "", plan: "", message: "" });
      setFile(null);
      setFileName("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book" className="py-24 md:py-32 relative bg-[url('/images/rolling_shutter_cinematic.png')] bg-cover bg-center bg-fixed" ref={ref}>
      <div className="absolute inset-0 bg-background/90" />
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary mb-4 block">
            Get Started
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Inspection
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Progress Indicator */}
          <div className="absolute top-0 left-0 right-0 flex h-1.5 bg-border/50">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "33%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                {step === 1 && "Contact Details"}
                {step === 2 && "Service Needs"}
                {step === 3 && "Final Details"}
              </h3>
              <span className="text-sm font-body font-medium text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">
                Step {step} of 3
              </span>
            </div>

            <div className="relative min-h-[250px]">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5 absolute inset-0"
                >
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData(p => ({ ...p, mobile: e.target.value }))}
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                    placeholder="Location / Area"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5 absolute inset-0"
                >
                  <Select value={formData.shutterType} onValueChange={(val) => setFormData(p => ({ ...p, shutterType: val }))}>
                    <SelectTrigger className="w-full px-4 h-12 rounded-xl bg-secondary/50 border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                      <SelectValue placeholder="Type of Shutter" />
                    </SelectTrigger>
                    <SelectContent>
                      {shutterTypes.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={formData.plan} onValueChange={(val) => setFormData(p => ({ ...p, plan: val }))}>
                    <SelectTrigger className="w-full px-4 h-12 rounded-xl bg-secondary/50 border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                      <SelectValue placeholder="Plan Interested" />
                    </SelectTrigger>
                    <SelectContent>
                      {planOptions.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5 absolute inset-0 flex flex-col"
                >
                  {/* Drag & drop */}
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors flex flex-col items-center justify-center ${dragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                      }`}
                  >
                    <AnimatedIcon icon={Upload} animationType="bounce" size={32} className="text-muted-foreground mb-2" />
                    <p className="text-sm font-body text-muted-foreground">
                      {fileName || "Drag & drop shutter photo or click to upload"}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Additional Message (Optional)"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none flex-grow"
                  />
                </motion.div>
              )}
            </div>

            <div className="flex gap-4 mt-8 pt-4 border-t border-border/50">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 rounded-full border border-border text-foreground font-body font-semibold text-sm hover:bg-secondary transition-colors"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex justify-center items-center py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(255,165,0,0.3)] disabled:opacity-50"
                >
                  {isSubmitting ? "Uploading & Submitting..." : "Submit Inspection"}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookInspection;
