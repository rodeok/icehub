import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkHero from "@/components/WorkHero";
import WorkSpacePlan from "@/components/WorkSpacePlan";
import WorkSpaceLocation from "@/components/WorkSpaceLocation";
export default function WorkspacePage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <WorkHero />
            <WorkSpacePlan />
            <WorkSpaceLocation />
            <Footer />
        </div>
    );
}
