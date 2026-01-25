import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Explore from "@/components/Explore";
import CoursesHero from "@/components/CoursesHero";

export default function CoursesPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>

            <main>
                <CoursesHero />
                <Explore />
            </main>

            <Footer />
        </div>
    );
}
