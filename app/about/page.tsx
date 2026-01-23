import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import Architects from "@/components/Architects";
import JourneySection from "@/components/JourneySection";
import CorePhilosophy from "@/components/CorePhilosophy";
export default function AboutPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <AboutHero />
            <CorePhilosophy />
            <JourneySection />
            <Architects />
            <Footer />
        </div>
    );
}
