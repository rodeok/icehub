import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebChoose from "@/components/WebChoose";
import WebProcess from "@/components/WebProcess";
import WebHero from "@/components/WebHero";
export default function WebSoftwarePage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <WebHero />
            <WebChoose />
            <WebProcess />


            <Footer />
        </div>
    );
}
