import Footer from "@/components/Footer";
import WebChoose from "@/components/WebChoose";
import WebProcess from "@/components/WebProcess";
import WebHero from "@/components/WebHero";
export default function WebSoftwarePage() {
    return (
        <div className="relative">
            <WebHero />
            <WebChoose />
            <WebProcess />


            <Footer />
        </div>
    );
}
