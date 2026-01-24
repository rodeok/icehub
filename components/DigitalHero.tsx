
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DigitalHero() {
    return (
        <section className="relative w-full overflow-hidden bg-[#f8faff] pt-32 pb-16 lg:py-24">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 items-center">

                    {/* Left Column: Text Content */}
                    <div className="max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                            Start Your Tech <br />
                            Journey With <br />
                            <span className="text-[#1a73e8]">Confidence</span>
                        </h1>

                        <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-lg">
                            Build essential computer skills from scratch. No prior experience needed.
                            Perfect for beginners ready to unlock their digital potential and prepare for the future.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/register"
                                className="inline-flex justify-center items-center rounded-md bg-[#1a73e8] px-8 py-3.5 text-base font-bold text-white shadow-lg hover:bg-blue-600 transition-colors"
                            >
                                Start your tech journey <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="/program-details"
                                className="inline-flex justify-center items-center rounded-md bg-white px-8 py-3.5 text-base font-bold text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Circle Placeholder */}
                    <div className="flex justify-center lg:justify-end relative">
                        {/* Large decorative circle matching the design */}
                        <div className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] rounded-full bg-blue-100/50 relative overflow-hidden">
                            {/* This circle represents the image placeholder region from the design */}
                            <div className="w-full h-full bg-slate-50/10"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
