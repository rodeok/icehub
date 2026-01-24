
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden bg-white">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/icehubhero.jpg"
                    alt="Tech talents"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Solid blue base layer for mobile/fallback */}
            <div className="absolute inset-y-0 left-0 w-full sm:w-[60%] lg:w-[50%] bg-[#0D55BA] z-[1] sm:hidden" />

            {/* Blue Curved Overlay (EXACT SMOOTH CURVE FOR DESKTOP) */}
            <div
                className="hidden sm:block absolute inset-0 bg-[#0D55BA] z-[1]"
                style={{
                    clipPath: "ellipse(85% 150% at -30% 50%)",
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center pt-24 md:pt-0">
                <div className="max-w-2xl text-white">
                    <h1 className="!text-white text-[40px] md:text-[56px] leading-[1.1] font-bold tracking-tight">
                        Become a World-class
                        <br />
                        Tech Talent
                    </h1>

                    <p className="!text-white mt-8 text-base md:text-lg leading-relaxed max-w-md font-medium">
                        Learn tech from top Industry experts and explore global
                        and funding opportunities in a thriving tech community
                    </p>

                    {/* Buttons */}
                    <div className="mt-12 flex flex-wrap gap-5">
                        <button className="group flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#0A3F8F] hover:bg-[#08357a] transition-all text-sm font-bold shadow-xl transform hover:-translate-y-1">
                            Learn More
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </button>

                        <button className="group flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#0A3F8F] hover:bg-[#08357a] transition-all text-sm font-bold shadow-xl transform hover:-translate-y-1">
                            Start Now
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
