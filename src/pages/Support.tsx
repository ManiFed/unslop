import Navigation from "@/components/Navigation";
import DonationSection from "@/components/DonationSection";
import PledgeSection from "@/components/PledgeSection";
import SolutionsSection from "@/components/SolutionsSection";
import Footer from "@/components/Footer";

const Support = () => (
  <div className="min-h-screen bg-background pt-16">
    <Navigation />
    <DonationSection />
    <PledgeSection />
    <SolutionsSection />
    <Footer />
  </div>
);

export default Support;
