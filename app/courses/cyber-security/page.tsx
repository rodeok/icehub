import Navbar from "@/components/Navbar";
import CyberHero from "@/components/CyberHero";
import WhatLearnCyber from "@/components/WhatLearnCyber";
import CourseScheduleCyber from "@/components/CourseScheduleCyber";
import Footer from "@/components/Footer";

export default function CyberSecurityCoursePage() {
    return (
        <main className="relative min-h-screen">
            <div className="absolute top-0 left-0 right-0 z-50">
                
            </div>
            <CyberHero />
            <WhatLearnCyber />
            <CourseScheduleCyber />
            <Footer />
        </main>
    );
}
