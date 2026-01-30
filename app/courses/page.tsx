import Footer from "@/components/Footer";
import Explore from "@/components/Explore";
import CoursesHero from "@/components/CoursesHero";

export default function CoursesPage() {
    return (
        <div className="relative">

            <main>
                <CoursesHero />
                <Explore />
            </main>

            <Footer />
        </div>
    );
}
