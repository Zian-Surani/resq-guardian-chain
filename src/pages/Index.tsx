import * as React from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { LiveDemoSection } from "@/components/live-demo-section";
import { TechnologySection } from "@/components/technology-section";
import { ImpactSection } from "@/components/impact-section";
import { JudgePackSection } from "@/components/judge-pack-section";
import { DevelopersModal } from "@/components/developers-modal";
import { Footer } from "@/components/footer";

const Index = () => {
  const [isDevelopersModalOpen, setIsDevelopersModalOpen] = React.useState(false);

  React.useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation onOpenDevelopersModal={() => setIsDevelopersModalOpen(true)} />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <LiveDemoSection />
        <TechnologySection />
        <ImpactSection />
        <JudgePackSection />
      </main>

      <Footer onOpenDevelopersModal={() => setIsDevelopersModalOpen(true)} />
      
      <DevelopersModal 
        isOpen={isDevelopersModalOpen} 
        onClose={() => setIsDevelopersModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
