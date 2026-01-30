import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Explore from "@/components/Explore";
import Skit from "@/components/Skit";
import Choose from "@/components/Choose";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="relative">
            <Hero />
            <Explore />
            <Skit />
            <Choose />
            <Faq />
            <Testimonials />
            <Partners />
            <Footer />
        </div>
    );
}
