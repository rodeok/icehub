import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextGenHero from "@/components/NextGenHero";
import NextGenPrepWorks from "@/components/NextGenPrepWorks";
import WhoIsFor from "@/components/WhoIsFor";
import WhatLearn from "@/components/WhatLearnPrep";
import Duration from "@/components/Duration";
import PrepWork from "@/components/PrepWork";
import PrepReady from "@/components/PrepReady";
export default function NextGenPrepPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar />
            </div>

            <NextGenHero />
            <NextGenPrepWorks />
            <WhoIsFor />
            <WhatLearn />
            <Duration />
            <PrepWork />
            <PrepReady />
            <Footer />
        </div>
    );
}
