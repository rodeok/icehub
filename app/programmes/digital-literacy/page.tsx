import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DigitalHero from "@/components/DigitalHero";
import DigiLit from "@/components/DigiLit";
import DigitaLearn from "@/components/DigitaLearn";
import DigitalProgram from "@/components/DigitalProgram";
import TechJourneyCTA from "@/components/TechJourneyCTA";
import DigitalAchieve from "@/components/DigitalAchieve";
import DigitalWorks from "@/components/DigitalWorks";

export default function DigitalLiteracyPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                
            </div>
            <DigitalHero />
            <DigiLit />
            <DigitaLearn />
            <DigitalProgram />
            <DigitalAchieve />
            <DigitalWorks />
            <TechJourneyCTA />
            <Footer />
        </div>
    );
}
