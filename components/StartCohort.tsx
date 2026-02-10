"use client";

import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function StartCohort() {
    return (
        <div className="bg-[#F8FAFC]">
            {/* Section 1: 2026 Incubation Cohort Status */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="relative bg-white rounded-[3rem] p-12 lg:p-20 shadow-xl overflow-hidden max-w-5xl mx-auto border border-slate-50">
                        {/* Decorative Circle/Blob in Top Right */}
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#1A73E8]/5 rounded-full pointer-events-none"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-6 !text-black">
                                2026 Incubation Cohort Status
                            </h2>
                            <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto leading-relaxed !text-slate-500">
                                Our current cohort is currently in session, with 12 amazing startups building
                                the future. However, we are accepting rolling applications for the next phase.
                            </p>

                            <div className="flex flex-col items-center gap-4">
                                <button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                    Apply Here (Rolling Admissions)
                                    <ExternalLink size={18} />
                                </button>
                                <p className="text-slate-400 text-xs italic !text-slate-400">
                                    Redirects to external Google Form application
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Ready to Scale Banner */}
            <section className="py-24 lg:pb-32 lg:pt-0">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="relative rounded-[3rem] overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center justify-center text-center">
                        {/* Background Image with Dark Blue Overlay */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/images/icehubhero.jpg"
                                alt="Incubation Workspace"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[#0F172A]/85 backdrop-blur-[2px]"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 max-w-4xl px-6 py-12">
                            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight !text-white">
                                Ready to Scale <br /> Your Startup?
                            </h2>
                            <p className="text-white/80 text-lg lg:text-xl mb-12 max-w-2xl mx-auto leading-relaxed !text-white/80">
                                Limited slots available for our next cohort. Don't miss the opportunity to transform
                                your vision into a venture-backed reality.
                            </p>

                            <button className="bg-white hover:bg-slate-50 text-[#1A73E8] px-10 py-5 rounded-2xl font-bold transition-all inline-flex items-center gap-3 text-lg shadow-lg group">
                                Apply to the Program
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                            </button>

                            <div className="mt-12 pt-12 border-t border-white/10">
                                <p className="text-white/60 font-medium !text-white/60">
                                    Join 50+ successful founders who started their journey at Ice Hub.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
