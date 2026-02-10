"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export default function StartHero() {
    return (
        <section className="bg-white py-12 lg:py-20 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Content */}
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#F0F5FF] px-4 py-2 rounded-full mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#1A73E8]"></span>
                            <span className="text-[#1A73E8] text-sm font-semibold tracking-wide uppercase">
                                Applications Open for 2026
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-6xl lg:text-8xl font-black text-[#0F172A] leading-[0.95] mb-5 tracking-tighter">
                            Startup <br />
                            Incubation <br />
                            Program
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-slate-500 leading-relaxed max-w-lg mb-8">
                            Empowering early-stage entrepreneurs to scale ideas into
                            sustainable, high-growth ventures with world-class resources and
                            mentorship.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/apply"
                                className="inline-flex items-center gap-2 bg-[#1A73E8] hover:bg-[#1557B0] text-white px-8 py-4 rounded-xl font-bold transition-all hover:translate-y-[-2px] shadow-lg shadow-[#1A73E8]/20"
                            >
                                Apply Now <ArrowRight size={18} />
                            </Link>
                            <button
                                className="inline-flex items-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-[#0F172A] px-8 py-4 rounded-xl font-bold transition-all"
                            >
                                <Download size={18} /> Download Program Details
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Hero Image Container */}
                    <div className="relative pt-10 lg:pt-0">
                        {/* Main Rounded Image */}
                        <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl">
                            <Image
                                src="/images/icehubhero.jpg"
                                alt="Startup Incubation Program"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Floating Testimonial Card */}
                        <div className="absolute -bottom-10 -left-6 lg:-left-12 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-slate-50 animate-fade-in">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                                        >
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold">
                                                AI
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <span className="text-[#0F172A] font-bold text-sm">+50 Alumni</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
                                "Ice Hub changed the trajectory of our startup within 12 weeks."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
