"use client";

import { useState, use } from "react";
import { Play, FileText, Download, CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react";

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [activeModule, setActiveModule] = useState<number | null>(1);

    const modules = [
        {
            id: 1,
            title: "Foundation of Web Development",
            lessons: [
                { title: "Introduction to HTML5", duration: "15:00", completed: true },
                { title: "Semantic Structure and Layout", duration: "20:00", completed: true },
                { title: "HTML Assessment Quiz", duration: "10 mins", completed: true },
            ],
        },
        {
            id: 2,
            title: "Styling with Modern CSS",
            lessons: [],
        },
        {
            id: 3,
            title: "JavaScript Essentials",
            lessons: [],
        },
    ];

    const toggleModule = (id: number) => {
        setActiveModule(activeModule === id ? null : id);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
                {/* Video Player Placeholder */}
                <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg mb-8 group cursor-pointer">
                    <img
                        src="/images/coding-setup.jpg" // Placeholder image, need to ensure this exists or use distinct one
                        alt="Course Video"
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                        onError={(e) => {
                            // Fallback if image doesn't exist
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80';
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-blue-600 ml-1" fill="currentColor" />
                        </div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-sm font-medium opacity-80 mb-1">Now Playing</p>
                        <h2 className="text-2xl font-bold">CSS Flexbox & Grid</h2>
                    </div>
                </div>

                {/* Description & Resources */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        In this lesson, we'll dive deep into modern CSS layout techniques. You'll learn how
                        to build complex, responsive interfaces with Flexbox and Grid without using external
                        libraries. By the end of this module, you'll be able to create any layout imaginable.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { name: "Lecture Slides.pdf", size: "2.4 MB" },
                            { name: "Cheat Sheet.pdf", size: "1.1 MB" },
                        ].map((resource) => (
                            <div key={resource.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{resource.name}</p>
                                        <p className="text-xs text-gray-500">{resource.size}</p>
                                    </div>
                                </div>
                                <Download size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar - Course Content */}
            <div className="w-full lg:w-96 shrink-0">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Content</h3>
                <div className="space-y-4">
                    {modules.map((module) => (
                        <div key={module.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                            <button
                                onClick={() => toggleModule(module.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                            >
                                <span className="font-semibold text-gray-900 text-sm">
                                    Module {module.id}: {module.title}
                                </span>
                                {activeModule === module.id ? (
                                    <ChevronUp size={18} className="text-gray-400" />
                                ) : (
                                    <ChevronDown size={18} className="text-gray-400" />
                                )}
                            </button>

                            {activeModule === module.id && module.lessons.length > 0 && (
                                <div className="border-t border-gray-100 bg-gray-50/50">
                                    {module.lessons.map((lesson, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-100 last:border-0">
                                            {lesson.completed ? (
                                                <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                                            ) : (
                                                <Circle size={18} className="text-gray-300 mt-0.5 shrink-0" />
                                            )}
                                            <div>
                                                <p className={`text-sm font-medium ${lesson.title === "Introduction to HTML5" ? "text-gray-900" : "text-gray-600"}`}>
                                                    {lesson.title}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">{lesson.duration}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
