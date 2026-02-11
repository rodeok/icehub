"use client";

import { useState, use } from "react";
import { Play, FileText, Download, CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react";

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [activeModule, setActiveModule] = useState<number | null>(2);

    const modules = [
        {
            id: 1,
            title: "Foundation of Web Development",
            lessons: [
                { title: "Introduction to HTML5", duration: "15:00", status: "completed" },
                { title: "Semantic Structure and Layout", duration: "20:00", status: "completed" },
                { title: "HTML Assessment Quiz", duration: "10 mins", status: "completed" },
            ],
        },
        {
            id: 2,
            title: "Styling with Modern CSS",
            lessons: [
                { title: "CSS Flexbox & Grid", duration: "45:00", status: "active" },
                { title: "Responsive Design Principles", duration: "30:00", status: "locked" },
                { title: "Tailwind CSS Fundamentals", duration: "25:00", status: "locked" },
            ],
        },
        {
            id: 3,
            title: "JavaScript Essentials",
            lessons: [
                { title: "Introduction to JavaScript", duration: "30:00", status: "locked" },
                { title: "Variables & Functions", duration: "45:00", status: "locked" },
                { title: "DOM Manipulation", duration: "50:00", status: "locked" },
            ],
        },
    ];

    const toggleModule = (id: number) => {
        setActiveModule(activeModule === id ? null : id);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Video Player */}
                    <div className="relative aspect-[16/9] bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl mb-10 group cursor-pointer border border-white/10">
                        <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
                            alt="Course Video"
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all duration-500 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-8 h-8 text-blue-600 ml-1.5" fill="currentColor" />
                            </div>
                        </div>
                        <div className="absolute bottom-10 left-10 text-white drop-shadow-lg">
                            <p className="text-sm font-bold !text-white/80 mb-2 uppercase tracking-widest">Now Playing</p>
                            <h2 className="text-4xl font-extrabold tracking-tight !text-white">CSS Flexbox & Grid</h2>
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Description Section */}
                    <div className="bg-white rounded-[32px] p-10 lg:p-12 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                            In this lesson, we'll dive deep into modern CSS layout techniques. You'll learn how
                            to build complex, responsive interfaces with Flexbox and Grid without using external
                            libraries. By the end of this module, you'll be able to create any layout imaginable.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { name: "Lecture Slides.pdf", size: "2.4 MB" },
                                { name: "Cheat Sheet.pdf", size: "1.1 MB" },
                            ].map((resource) => (
                                <div key={resource.name} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group hover:bg-white hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-50 group-hover:bg-blue-50 transition-colors">
                                            <FileText size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{resource.name}</p>
                                            <p className="text-xs font-bold text-gray-400 mt-0.5">{resource.size}</p>
                                        </div>
                                    </div>
                                    <Download size={20} className="text-gray-400 group-hover:text-blue-600 transition-all" strokeWidth={2} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Course Content */}
                <div className="w-full lg:w-96 shrink-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Course Content</h3>
                    <div className="space-y-4">
                        {modules.map((module) => (
                            <div key={module.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all hover:shadow-md">
                                <button
                                    onClick={() => toggleModule(module.id)}
                                    className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all text-left ${activeModule === module.id ? 'bg-blue-50/30' : ''}`}
                                >
                                    <span className={`font-bold text-[15px] leading-snug pr-4 ${activeModule === module.id ? 'text-gray-900' : 'text-gray-600'}`}>
                                        Module {module.id}: {module.title}
                                    </span>
                                    {activeModule === module.id ? (
                                        <ChevronUp size={20} className="text-gray-900 shrink-0" strokeWidth={2.5} />
                                    ) : (
                                        <ChevronDown size={20} className="text-gray-400 shrink-0" strokeWidth={2} />
                                    )}
                                </button>

                                {activeModule === module.id && (
                                    <div className="border-t border-gray-50 bg-white">
                                        {module.lessons.length > 0 ? (
                                            <div className="py-0">
                                                {module.lessons.map((lesson, idx) => {
                                                    const isActive = lesson.status === "active";
                                                    const isLocked = lesson.status === "locked";
                                                    const isCompleted = lesson.status === "completed";

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`flex items-start gap-4 px-6 py-4 transition-all cursor-pointer group active:bg-gray-100 border-b border-gray-50 last:border-0 ${isActive ? 'bg-blue-50/40 border-r-4 border-r-blue-600' : 'hover:bg-gray-50/80'
                                                                }`}
                                                        >
                                                            <div className="mt-1 shrink-0">
                                                                {isCompleted && (
                                                                    <div className="w-5 h-5 rounded-full border border-green-200 bg-green-50 flex items-center justify-center">
                                                                        <CheckCircle size={14} className="text-green-500" strokeWidth={3} />
                                                                    </div>
                                                                )}
                                                                {isActive && (
                                                                    <Play size={18} className="text-blue-600" strokeWidth={2} />
                                                                )}
                                                                {isLocked && (
                                                                    <div className="text-gray-300">
                                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                                        </svg>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className={`text-sm font-bold truncate transition-colors ${isActive ? "text-blue-600" : isLocked ? "text-gray-400" : "text-gray-900"} group-hover:text-blue-600`}>
                                                                    {lesson.title}
                                                                </p>
                                                                <p className={`text-[11px] font-bold mt-1 uppercase tracking-wider ${isActive ? "text-blue-400" : "text-gray-400"}`}>
                                                                    {lesson.duration}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="p-8 text-center bg-gray-50/50">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">Lessons coming soon</p>
                                            </div>
                                        )
                                        }
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

