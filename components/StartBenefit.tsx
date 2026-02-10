"use client";

import Image from "next/image";
import { Users, GraduationCap, Network, LineChart, Library, Coffee, Share2, Play, Circle } from "lucide-react";

export default function StartBenefit() {
    const benefits = [
        {
            icon: Users,
            title: "1-on-1 Mentorship",
            description: "Personalized guidance from experienced entrepreneurs.",
        },
        {
            icon: GraduationCap,
            title: "Hands-on Workshops",
            description: "Intensive training sessions on scaling and strategy.",
        },
        {
            icon: Network,
            title: "Ecosystem Access",
            description: "Connect with partners, vendors, and hiring networks.",
        },
        {
            icon: LineChart,
            title: "Investor Readiness",
            description: "Pitch deck refinement and demo day preparation.",
        },
        {
            icon: Library,
            title: "Resource Library",
            description: "Access to legal templates, financial models, and tools.",
        },
        {
            icon: Coffee,
            title: "Free Co-working",
            description: "Dedicated workspace at Ice Hub during the program.",
        },
        {
            icon: Share2,
            title: "Alumni Network",
            description: "Lifetime access to the Ice Hub alumni community.",
        },
    ];

    return (
        <div className="bg-white">
            {/* Section 1: Program Benefits */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4">Program Benefits</h2>
                    <p className="text-slate-500 text-lg mb-12">
                        Beyond just training, we provide the infrastructure for your success.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all text-left flex flex-col items-start"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                    <benefit.icon className="text-[#1A73E8]" size={28} />
                                </div>
                                <h4 className="text-xl font-bold text-[#0F172A] mb-3">{benefit.title}</h4>
                                <p className="text-slate-500 leading-relaxed text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 2: Featured Initiative (Dark) */}
            <section className="bg-[#0F172A] py-16 lg:py-24 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left Column: Content */}
                        <div className="text-white">
                            <div className="inline-block bg-[#1A73E8] px-4 py-1.5 rounded-full mb-8">
                                <span className="text-xs font-bold uppercase tracking-widest">Featured Initiative</span>
                            </div>

                            <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight !text-white">
                                Anambra Startup <br />
                                Weekend
                            </h2>

                            <p className="!text-white/90 text-lg mb-10 max-w-lg leading-relaxed">
                                A high-octane 3-day immersive event where ideas meet execution.
                                It's the perfect precursor to our main incubation program.
                            </p>

                            {/* Bullet Points */}
                            <ul className="space-y-4 mb-12">
                                {[
                                    "Rapid idea pitching & validation",
                                    "Direct mentorship from local tech leaders",
                                    "Intensive team collaboration sprints",
                                    "Business plan development workshops",
                                    "Final pitch session to regional investors",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 !text-white/80">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]"></div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white px-8 py-4 rounded-xl font-bold transition-all inline-flex items-center gap-2 group">
                                Learn More About ASW
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>

                        {/* Right Column: Video/Image Container */}
                        <div className="relative group cursor-pointer">
                            <div className="relative rounded-[3rem] overflow-hidden aspect-[4/4] shadow-2xl">
                                <Image
                                    src="/images/startupman.jpg"
                                    alt="Anambra Startup Weekend"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform shadow-white/20">
                                        <Play className="text-[#1A73E8] fill-[#1A73E8] ml-1" size={32} />
                                    </div>
                                </div>
                            </div>

                            {/* Subtle background glow */}
                            <div className="absolute -inset-4 bg-[#1A73E8]/20 blur-3xl -z-10 rounded-full opacity-50"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
