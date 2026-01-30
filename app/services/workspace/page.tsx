import Footer from "@/components/Footer";
import WorkHero from "@/components/WorkHero";
import WorkSpacePlan from "@/components/WorkSpacePlan";
import WorkSpaceLocation from "@/components/WorkSpaceLocation";
export default function WorkspacePage() {
    return (
        <div className="relative">
            <WorkHero />
            <WorkSpacePlan />
            <WorkSpaceLocation />
            <Footer />
        </div>
    );
}
