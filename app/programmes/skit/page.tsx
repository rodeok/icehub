import Navbar from "@/components/Navbar";
import SkitProgram from "@/components/SkitProgram";
import KidsPerfect from "@/components/KidsPerfect";
import SkitHero from "@/components/SkitHero";
import LearnWhat from "@/components/LearnWhat";
import ProgramHighlight from "@/components/ProgramHighlight";
import SkitProgramWhat from "@/components/SkitProgramWhat";
import SkitDuration from "@/components/SkitDuration";
import SkitReady from "@/components/SkitReady";
import Footer from "@/components/Footer";
export default function SCITPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                
            </div>
            <SkitHero />
            <SkitProgram />
            <KidsPerfect />
            <LearnWhat />
            <ProgramHighlight />
            <SkitProgramWhat />
            <SkitDuration />
            <SkitReady />
            <Footer />
        </div>
    );
}
