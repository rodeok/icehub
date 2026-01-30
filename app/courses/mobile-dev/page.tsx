import Navbar from "@/components/Navbar";
import MobileHero from "@/components/MobileHero";
import WhatLearnMobile from "@/components/WhatLearnMobile";
import CourseScheduleMobile from "@/components/CourseSheduleMobile";
import Footer from "@/components/Footer";

export default function MobileCoursePage() {
    return (
        <main className="relative min-h-screen">
            <div className="absolute top-0 left-0 right-0 z-50">
                
            </div>
            <MobileHero />
            <WhatLearnMobile />
            <CourseScheduleMobile />
            <Footer />
        </main>
    );
}
