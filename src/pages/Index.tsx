import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyShutterWala from "@/components/WhyShutterWala";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import BookInspection from "@/components/BookInspection";
import BrandStory from "@/components/BrandStory";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import SEO from "@/components/SEO";

const Index = () => {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("shutter_animation_played");
    }
    return true;
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("shutter_animation_played", "true");
  };

  return (
    <>
      <SEO />
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <WhyShutterWala />
        <ServicesSection />
        <StatsSection />
        <PricingSection />
        <BookInspection />
        <BrandStory />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
