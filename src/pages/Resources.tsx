import Navigation from "@/components/Navigation";
import SlopTranslator from "@/components/SlopTranslator";
import DiagnosticManual from "@/components/DiagnosticManual";
import Footer from "@/components/Footer";

const Resources = () => (
  <div className="min-h-screen bg-background pt-16">
    <Navigation />
    <SlopTranslator />
    <DiagnosticManual />
    <Footer />
  </div>
);

export default Resources;
