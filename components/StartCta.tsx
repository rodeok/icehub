"use client";

import Image from "next/image";
import { Rocket, Zap, Target, Users, LayoutGrid, TrendingUp, Handshake, Landmark } from "lucide-react";

export default function StartCta() {
    return (
        <div className="bg-white">
            {/* Section 1: A Structured Journey */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Image */}
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/4]">
                            <Image
                                src="/images/starthero.jpg"
                                alt="Structured Journey"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Right: Content */}
                        <div className="max-w-xl">
                            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight mb-8">
                                A Structured Journey from Idea to Impact
                            </h2>
                            <p className="text-slate-500 text-lg leading-relaxed mb-12">
                                Our incubation program is a high-intensity, structured experience
                                designed to help early-stage founders navigate the complexities of
                                building a tech company in Nigeria's unique market environment.
                            </p>

                            {/* Feature Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#F0F5FF] rounded-xl flex items-center justify-center">
                                        <Rocket className="text-[#1A73E8]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] mb-1">Business Model Refinement</h4>
                                        <p className="text-slate-400 text-sm leading-snug">Solidify your value proposition and market fit.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#F0F5FF] rounded-xl flex items-center justify-center">
                                        <Zap className="text-[#1A73E8]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] mb-1">Scalable Product Dev</h4>
                                        <p className="text-slate-400 text-sm leading-snug">Build technology that can grow with your user base.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#F0F5FF] rounded-xl flex items-center justify-center">
                                        <Target className="text-[#1A73E8]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] mb-1">Funding Access</h4>
                                        <p className="text-slate-400 text-sm leading-snug">Direct connections to angel investors and VCs.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#F0F5FF] rounded-xl flex items-center justify-center">
                                        <Users className="text-[#1A73E8]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] mb-1">Industry Exposure</h4>
                                        <p className="text-slate-400 text-sm leading-snug">Get in front of the partners that matter.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: What We Offer */}
            <section className="py-16 lg:py-24 bg-slate-50/30">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6">What We Offer</h2>
                        <p className="text-slate-500 text-lg">
                            Comprehensive support tailored for the Nigerian entrepreneurial ecosystem.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Offer Card 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-[#F0F5FF] rounded-2xl flex items-center justify-center mb-8">
                                <LayoutGrid className="text-[#1A73E8]" size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-[#0F172A] mb-4">Structured Incubation</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                A 12-week curriculum covering product-market fit, legal structures, and operations.
                            </p>
                        </div>

                        {/* Offer Card 2 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-[#F0F5FF] rounded-2xl flex items-center justify-center mb-8">
                                <TrendingUp className="text-[#1A73E8]" size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-[#0F172A] mb-4">Business Development</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Hands-on support for market entry strategies and sustainable growth frameworks.
                            </p>
                        </div>

                        {/* Offer Card 3 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-[#F0F5FF] rounded-2xl flex items-center justify-center mb-8">
                                <Handshake className="text-[#1A73E8]" size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-[#0F172A] mb-4">Expert Mentorship</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Weekly 1-on-1 sessions with seasoned founders and industry experts in your niche.
                            </p>
                        </div>

                        {/* Offer Card 4 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-[#F0F5FF] rounded-2xl flex items-center justify-center mb-8">
                                <Landmark className="text-[#1A73E8]" size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-[#0F172A] mb-4">Investment Access</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Direct pathway to seed funding and introductions to active regional investors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
