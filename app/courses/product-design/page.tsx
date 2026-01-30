import Navbar from "@/components/Navbar";
import ProductHero from "@/components/ProductHero";
import WhatLearnProduct from "@/components/WhatLearnProduct";
import CourseScheduleProduct from "@/components/CourseScheduleProduct";
import Footer from "@/components/Footer";

export default function ProductDesignCoursePage() {
    return (
        <main className="relative min-h-screen">
            <div className="absolute top-0 left-0 right-0 z-50">
                
            </div>
            <ProductHero />
            <WhatLearnProduct />
            <CourseScheduleProduct />
            <Footer />
        </main>
    );
}
