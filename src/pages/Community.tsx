import Navigation from "@/components/Navigation";
import NewsTicker from "@/components/NewsTicker";
import HallOfShame from "@/components/HallOfShame";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReportTool from "@/components/ReportTool";
import Footer from "@/components/Footer";

const Community = () => (
  <div className="min-h-screen bg-background pt-24">
    <Navigation />
    <NewsTicker />
    <HallOfShame />
    <TestimonialsSection />
    <ReportTool />
    <Footer />
  </div>
);

export default Community;
