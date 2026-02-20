
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Coffee, Wifi, Zap, Users } from "lucide-react";

export default function WorkHero() {
    return (
        <section className="bg-white pt-32 pb-16 lg:py-24 px-4 md:px-8 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

                    {/* Left Column: Content */}
                    <div className="max-w-xl">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.1]">
                            Workspaces Designed <br />
                            for <span className="text-[#1a73e8]">Productivity & Comfort</span>
                        </h1>

                        <p className="mt-8 text-lg leading-relaxed text-slate-600">
                            Explore our flexible workspace options built to support
                            entrepreneurs, teams, and professionals. Enjoy fast internet,
                            power supply, meeting rooms, and a serene environment for
                            your best work.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="#plans"
                                className="inline-flex items-center rounded-lg bg-[#1a73e8] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                            >
                                Book Workspace
                            </Link>
                            <Link
                                href="#plans"
                                className="inline-flex items-center rounded-lg border-2 border-[#1a73e8] bg-white px-8 py-3.5 text-base font-bold text-[#1a73e8] transition hover:bg-blue-50"
                            >
                                Explore our Plans
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Hero Image */}
                    <div className="relative group">
                        <div className="relative aspect-[1.1/1] w-full rounded-[40px] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                            <Image
                                src="/images/workspaceimg.jpg"
                                alt="Modern Workspace"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
                        </div>

                        {/* Floating Badge (Extra Polish) */}
                        {/* <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-50 animate-fade-in">
                            <div className="w-10 h-10 bg-[#F0F5FF] rounded-lg flex items-center justify-center">
                                <Wifi className="text-[#1A73E8]" size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">High Speed</p>
                                <p className="text-sm font-bold text-[#0F172A]">Starlink Internet</p>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>
        </section>
    );
}
