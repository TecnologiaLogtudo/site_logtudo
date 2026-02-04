import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { DifferentialsSection } from "@/components/sections/DifferentialsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { SegmentsSection } from "@/components/sections/SegmentsSection";
import { CTASection } from "@/components/sections/CTASection";
import { LocationSection } from "@/components/sections/LocationSection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <ServicesSection />
        <DifferentialsSection />
        <HowItWorksSection />
        <ClientsSection />
        <SegmentsSection />
        <CTASection />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
