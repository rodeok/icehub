"use client";

import { MapPin, Calendar, Clock, Bell, Globe, Users, Waves, CheckCircle2 } from "lucide-react";

export default function StartApply() {
    return (
        <div className="bg-white">
            {/* Section 1: Info Bar */}
            <section className="bg-[#1A73E8] py-8">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="bg-[#FFFFFF]/10 backdrop-blur-sm border border-[#FFFFFF]/20 rounded-[2rem] p-8 lg:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
                            {/* Item 1 */}
                            <div className="flex flex-col gap-4 text-white">
                                <MapPin className="text-white" size={24} />
                                <div>
                                    <p className="!text-white text-xs font-bold uppercase tracking-wider mb-2">Location</p>
                                    <h3 className="text-xl font-bold !text-white">ICE Hub, Nnewi, Nigeria</h3>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex flex-col gap-4 text-white">
                                <Calendar className="text-white" size={24} />
                                <div>
                                    <p className="!text-white text-xs font-bold uppercase tracking-wider mb-2">Duration</p>
                                    <h3 className="text-xl font-bold !text-white">12 Weeks (Starting Feb 2026)</h3>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex flex-col gap-4 text-white">
                                <Clock className="text-white" size={24} />
                                <div>
                                    <p className="!text-white text-xs font-bold uppercase tracking-wider mb-2">Schedule</p>
                                    <h3 className="text-xl font-bold !text-white">Hybrid (In-person & Virtual)</h3>
                                </div>
                            </div>

                            {/* Item 4 */}
                            <div className="flex flex-col gap-4 text-white border-0">
                                <Bell className="text-white" size={24} />
                                <div>
                                    <p className="!text-white text-xs font-bold uppercase tracking-wider mb-2">Deadline</p>
                                    <h3 className="text-xl font-bold !text-white">March 15, 2026</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Who Can Apply */}
            <section className="py-16 lg:py-24 bg-[#F8FAFC]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="max-w-3xl mx-auto mb-16 text-center">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6">Who Can Apply</h2>
                        <p className="text-slate-500 text-lg">
                            We are looking for visionary founders building solutions for tomorrow's challenges.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex gap-8 items-start">
                            <div className="flex-shrink-0 w-14 h-14 bg-[#F0F5FF] rounded-full flex items-center justify-center">
                                <Globe className="text-[#1A73E8]" size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#0F172A] mb-3">Startup Stage</h4>
                                <p className="text-slate-500 leading-relaxed">
                                    Early-stage startups ranging from pre-seed to seed stage with a functional MVP or prototype.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex gap-8 items-start">
                            <div className="flex-shrink-0 w-14 h-14 bg-[#F0F5FF] rounded-full flex items-center justify-center">
                                <Users className="text-[#1A73E8]" size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#0F172A] mb-3">Team Composition</h4>
                                <p className="text-slate-500 leading-relaxed">
                                    3–5 core members, including at least one developer and one fully committed founder.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex gap-8 items-start">
                            <div className="flex-shrink-0 w-14 h-14 bg-[#F0F5FF] rounded-full flex items-center justify-center">
                                <Waves className="text-[#1A73E8]" size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#0F172A] mb-3">Focus Area</h4>
                                <p className="text-slate-500 leading-relaxed">
                                    Solutions targeting the Blue Economy (maritime, sustainable fishing, ocean energy, etc.).
                                </p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex gap-8 items-start">
                            <div className="flex-shrink-0 w-14 h-14 bg-[#F0F5FF] rounded-full flex items-center justify-center">
                                <CheckCircle2 className="text-[#1A73E8]" size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#0F172A] mb-3">Commitment</h4>
                                <p className="text-slate-500 leading-relaxed">
                                    Ability to participate in-person at Ice Hub Nnewi for critical milestones and workshops.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
