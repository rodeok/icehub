import Footer from "@/components/Footer";
import WorkHero from "@/components/WorkHero";
import WorkSpacePlan from "@/components/WorkSpacePlan";
import WorkSpaceLocation from "@/components/WorkSpaceLocation";
import WorkspaceUtilizationTable from "@/components/WorkspaceUtilizationTable";

export default function WorkspacePage() {
    return (
        <div className="relative">
            <WorkHero />
            <WorkSpacePlan />
            <WorkspaceUtilizationTable />
            <WorkSpaceLocation />
            <Footer />
        </div>
    );
}
