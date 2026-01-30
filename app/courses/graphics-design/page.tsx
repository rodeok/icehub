import Navbar from "@/components/Navbar";
import GraphicHero from "@/components/GraphicHero";
import WhatLearnGraphics from "@/components/WhatLearnGraphics";
import CourseScheduleGraphics from "@/components/CourseScheduleGraphics";
import Footer from "@/components/Footer";

export default function ProductDesignCoursePage() {
    return (
        <main className="relative min-h-screen">
            <div className="absolute top-0 left-0 right-0 z-50">
                
            </div>
            <GraphicHero />
            <WhatLearnGraphics />
            <CourseScheduleGraphics />
            <Footer />
        </main>
    );
}
