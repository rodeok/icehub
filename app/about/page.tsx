import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import Architects from "@/components/Architects";
import JourneySection from "@/components/JourneySection";
import CorePhilosophy from "@/components/CorePhilosophy";
export default function AboutPage() {
    return (
        <div className="relative">
            <AboutHero />
            <CorePhilosophy />
            <JourneySection />
            <Architects />
            <Footer />
        </div>
    );
}
