import Navigation from "@/components/Navigation";
import NewsTicker from "@/components/NewsTicker";
import DonationSection from "@/components/DonationSection";
import PledgeSection from "@/components/PledgeSection";
import CertificateGenerator from "@/components/CertificateGenerator";
import SlopImpactCalculator from "@/components/SlopImpactCalculator";
import SolutionsSection from "@/components/SolutionsSection";
import Footer from "@/components/Footer";

const Support = () => (
  <div className="min-h-screen bg-background pt-24">
    <Navigation />
    <NewsTicker />
    <DonationSection />
    <PledgeSection />
    <CertificateGenerator />
    <SlopImpactCalculator />
    <SolutionsSection />
    <Footer />
  </div>
);

export default Support;
