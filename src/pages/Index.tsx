import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CrisisSection from "@/components/CrisisSection";
import StatisticsSection from "@/components/StatisticsSection";
import CollaboratorsSection from "@/components/CollaboratorsSection";
import Footer from "@/components/Footer";
import SlopOMeter from "@/components/SlopOMeter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Navigation />
      <HeroSection />
      <CrisisSection />
      <StatisticsSection />
      <CollaboratorsSection />
      <Footer />
      <SlopOMeter />
    </div>
  );
};

export default Index;
