import Navbar from "@/components/Navbar";
import DataHero from "@/components/DataHero";
import WhatLearnData from "@/components/WhatLearnData";
import CourseScheduleData from "@/components/CourseScheduleData";
import Footer from "@/components/Footer";

export default function MobileCoursePage() {
    return (
        <main className="relative min-h-screen">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <DataHero />
            <WhatLearnData />
            <CourseScheduleData />
            <Footer />
        </main>
    );
}