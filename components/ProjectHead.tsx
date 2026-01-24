
import { ArrowRight } from "lucide-react";

export default function ProjectHead() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="bg-[#f0f7ff] pt-32 pb-24 px-4 relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-48 h-48 bg-blue-200/50 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-48 h-48 bg-blue-200/40 rounded-full blur-2xl"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#1a2b4b] mb-6">
                        Our Projects
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                        Explore the initiatives, innovations, and community-driven solutions <br className="hidden md:block" />
                        created by ICE Hub.
                    </p>
                </div>
            </section>

            {/* Featured Project Card Container */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-[-60px] relative z-20">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Project Image Placeholder */}
                        <div className="relative aspect-[16/10] w-full bg-slate-200 rounded-2xl overflow-hidden shadow-inner">
                            <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold">
                                Project Screenshot
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="flex flex-col items-start">
                            <span className="inline-block bg-[#eef7ff] text-[#1a73e8] px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                                Featured Project
                            </span>

                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-primary">
                                Chowflex
                            </h2>

                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                A real-world food ordering app project developed at Ice Hub,
                                designed to demonstrate how young innovators apply modern
                                technology skills to solve everyday problems through user-centered
                                design, scalable systems, and practical execution.
                            </p>

                            <button className="bg-[#1a73e8] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2 transform hover:scale-105">
                                View Project
                                <ArrowRight size={20} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
