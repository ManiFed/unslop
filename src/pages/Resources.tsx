import Navigation from "@/components/Navigation";
import NewsTicker from "@/components/NewsTicker";
import SlopTranslator from "@/components/SlopTranslator";
import DiagnosticManual from "@/components/DiagnosticManual";
import Footer from "@/components/Footer";

const Resources = () => (
  <div className="min-h-screen bg-background pt-24">
    <Navigation />
    <NewsTicker />
    <SlopTranslator />
    <DiagnosticManual />
    <Footer />
  </div>
);

export default Resources;
