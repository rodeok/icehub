import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectHead from "@/components/ProjectHead";
import ProjectContent from "@/components/ProjectContent";

export default function ProjectsPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <ProjectHead />
            <ProjectContent />
            <Footer />
        </div>
    );
}
