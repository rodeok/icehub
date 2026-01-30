import Navbar from "@/components/Navbar";
import BackHero from "@/components/BackHero";
import WhatLearnBack from "@/components/WhatLearnBack";
import CourseScheduleback from "@/components/CourseScheduleback";
import Footer from "@/components/Footer";

export default function BackendCoursePage() {
    return (
        <main className="relative min-h-screen">
            <div className="absolute top-0 left-0 right-0 z-50">
                
            </div>
            <BackHero />
            <WhatLearnBack />
            <CourseScheduleback />
            <Footer />
        </main>
    );
}
