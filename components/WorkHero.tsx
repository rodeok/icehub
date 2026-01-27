
import Link from "next/link";
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
                                href="#"
                                className="inline-flex items-center rounded-lg bg-[#1a73e8] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                            >
                                Book Workspace
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex items-center rounded-lg border-2 border-[#1a73e8] bg-white px-8 py-3.5 text-base font-bold text-[#1a73e8] transition hover:bg-blue-50"
                            >
                                Explore our Plans
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Image Placeholder */}
                    <div className="relative">
                        <div className="aspect-[1.1/1] w-full rounded-[40px] bg-slate-200 lg:max-w-[550px] shadow-sm flex items-center justify-center">
                            {/* Visual indicator of workspace / office */}
                            <div className="grid grid-cols-2 gap-8 text-slate-400">
                                <Wifi size={40} strokeWidth={1.5} />
                                <Zap size={40} strokeWidth={1.5} />
                                <Coffee size={40} strokeWidth={1.5} />
                                <Users size={40} strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
