import HeroSection from "@/components/HeroSection";
import CrisisSection from "@/components/CrisisSection";
import CollaboratorsSection from "@/components/CollaboratorsSection";
import SolutionsSection from "@/components/SolutionsSection";
import PledgeSection from "@/components/PledgeSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <CrisisSection />
      <CollaboratorsSection />
      <SolutionsSection />
      <PledgeSection />
      <Footer />
    </div>
  );
};

export default Index;
