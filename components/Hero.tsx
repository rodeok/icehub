
import Image from "next/image";
import { IoPlay } from "react-icons/io5";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function HeroSection() {
    return (
        <section className="relative w-full h-[600px] lg:h-[750px] overflow-hidden bg-white">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/icehubhero.jpg"
                    alt="Ice Hub Tech Talents"
                    fill
                    priority
                    className="object-cover object-center translate-x-[15%]"
                />
            </div>

            {/* Blue Curved Overlay with Soft Edge */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: "radial-gradient(circle at -10% 50%, #0D55BA 0%, #0D55BA 45%, rgba(13, 85, 186, 0.9) 55%, transparent 75%)",
                }}
            />

            {/* Alternative Curve for precise mobile/desktop handling if needed */}
            <div
                className="absolute inset-0 z-10 sm:hidden bg-[#0D55BA]"
                style={{
                    clipPath: "ellipse(150% 100% at 0% 50%)",
                }}
            />

            {/* Content Container */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-16 flex items-center">
                <div className="max-w-2xl text-white">
                    <h1 className="!text-white text-[44px] md:text-[64px] leading-[1.1] font-bold tracking-tight">
                        Become a World Class
                        <br />
                        Tech Talent
                    </h1>

                    <p className="!text-white mt-8 text-lg md:text-xl leading-relaxed max-w-lg font-normal opacity-90">
                        Learn tech from top Industry experts and explore global
                        and funding opportunities in a thriving tech community
                    </p>

                    {/* Buttons */}
                    <div className="mt-12 flex flex-wrap gap-6">
                        <button className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#07357A] hover:bg-[#05285d] transition-all text-[15px] font-bold shadow-lg">
                            Learn More
                            <IoPlay className="text-[12px] mt-[1px]" />
                        </button>

                        <button className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#07357A] hover:bg-[#05285d] transition-all text-[15px] font-bold shadow-lg">
                            Start Now
                            <HiArrowNarrowRight className="text-[20px]" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
