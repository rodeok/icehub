import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogMain from "@/components/BlogMain";
import BlogUp from "@/components/BlogUp";
import BlogHero from "@/components/BlogHero";
export default function BlogsPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                
            </div>
            <BlogHero />
            <BlogUp />
            <BlogMain />
            <Footer />
        </div>
    );
}
