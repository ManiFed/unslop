import Navigation from "@/components/Navigation";
import NewsTicker from "@/components/NewsTicker";
import SlopperQuiz from "@/components/SlopperQuiz";
import Footer from "@/components/Footer";

const Quiz = () => (
  <div className="min-h-screen bg-background pt-24">
    <Navigation />
    <NewsTicker />
    <SlopperQuiz />
    <Footer />
  </div>
);

export default Quiz;
