import Navigation from "@/components/Navigation";
import NewsTicker from "@/components/NewsTicker";
import SlopHotline from "@/components/SlopHotline";
import Footer from "@/components/Footer";

const Hotline = () => (
  <div className="min-h-screen bg-background pt-24">
    <Navigation />
    <NewsTicker />
    <SlopHotline />
    <Footer />
  </div>
);

export default Hotline;
