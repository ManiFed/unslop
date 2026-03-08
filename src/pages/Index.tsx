import Navigation from "@/components/Navigation";
import NewsTicker from "@/components/NewsTicker";
import HeroSection from "@/components/HeroSection";
import CrisisSection from "@/components/CrisisSection";
import StatisticsSection from "@/components/StatisticsSection";
import CollaboratorsSection from "@/components/CollaboratorsSection";
import SlopMap from "@/components/SlopMap";
import Footer from "@/components/Footer";
import SlopOMeter from "@/components/SlopOMeter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      <Navigation />
      <NewsTicker />
      <HeroSection />
      <CrisisSection />
      <StatisticsSection />
      <SlopMap />
      <CollaboratorsSection />
      <Footer />
      <SlopOMeter />
    </div>
  );
};

export default Index;
