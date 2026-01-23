import Navbar from "@/components/Navbar";
import FrontHero from "@/components/FrontHero";
import WhatLearn from "@/components/WhatLearn";
import CourseSchedule from "@/components/CourseSchedule";
import Footer from "@/components/Footer";

export default function FrontendCoursePage() {
    return (
        <main className="relative min-h-screen">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <FrontHero />
            <WhatLearn />
            <CourseSchedule />
            <Footer />
        </main>
    );
}