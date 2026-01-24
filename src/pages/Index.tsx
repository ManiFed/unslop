import HeroSection from "@/components/HeroSection";
import CrisisSection from "@/components/CrisisSection";
import CollaboratorsSection from "@/components/CollaboratorsSection";
import SolutionsSection from "@/components/SolutionsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatisticsSection from "@/components/StatisticsSection";
import PledgeSection from "@/components/PledgeSection";
import Footer from "@/components/Footer";
import SlopOMeter from "@/components/SlopOMeter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <CrisisSection />
      <StatisticsSection />
      <CollaboratorsSection />
      <TestimonialsSection />
      <SolutionsSection />
      <PledgeSection />
      <Footer />
      <SlopOMeter />
    </div>
  );
};

export default Index;
