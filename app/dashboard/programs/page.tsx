"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Play, FileText, Download, CheckCircle, Circle, ChevronDown, ChevronUp, BookOpen, Clock, ChevronRight, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

export default function ProgramsPage() {
    const [program, setProgram] = useState<any>(null);
    const [availablePrograms, setAvailablePrograms] = useState<any[]>([]);
    const [selectedProgramId, setSelectedProgramId] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [activeModule, setActiveModule] = useState<number | null>(0);
    const router = useRouter();

    const fetchProgramData = async () => {
        try {
            const profileRes = await fetch('/api/user/profile');
            const profileData = await profileRes.json();

            if (profileData.user && profileData.user.enrolledPrograms && profileData.user.enrolledPrograms.length > 0) {
                setProgram(profileData.user.enrolledPrograms[0]);
            } else {
                // If no enrolled program, fetch all available programs
                const programsRes = await fetch('/api/programs');
                const programsData = await programsRes.json();
                const activePrograms = programsData.programs || [];
                setAvailablePrograms(activePrograms);
                if (activePrograms.length > 0) {
                    setSelectedProgramId(activePrograms[0]._id);
                }
            }
        } catch (error) {
            console.error('Error fetching programs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgramData();
    }, []);

    const handleEnroll = () => {
        if (!selectedProgramId) return;
        const selected = availablePrograms.find(p => p._id === selectedProgramId);
        if (selected) {
            setProgram(selected);
            setActiveModule(0);
        }
    };

    const toggleModule = (id: number) => {
        setActiveModule(activeModule === id ? null : id);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const modules = program?.curriculum || [];
    const isEnrolled = !!program;

    return (
        <LayoutGroup>
            <div className="max-w-7xl mx-auto px-4 py-8 relative min-h-[85vh] flex flex-col">

                {/* Header / Selection Trigger Area */}
                <div className="flex items-center justify-between mb-8 min-h-[50px]">
                    <div>
                        {activeModule !== null && isEnrolled && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Learning</h1>
                                <p className="text-sm text-gray-500 font-medium mt-1">Make progress on your journey</p>
                            </motion.div>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        {isEnrolled && (
                            <motion.button
                                layoutId="selection-container"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => {
                                    setProgram(null); // Clear program to show selection
                                    // availablePrograms is already set
                                }}
                                className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all text-gray-600 font-bold text-sm"
                            >
                                <LayoutGrid size={18} />
                                Switch Program
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Selection Modal / Card */}
                <AnimatePresence>
                    {!isEnrolled && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                layoutId="selection-container"
                                className="w-full max-w-4xl bg-white rounded-[32px] p-8 lg:p-12 border border-gray-100 shadow-2xl text-center relative overflow-hidden"
                            >
                                {program && (
                                    <button
                                        onClick={() => setProgram(availablePrograms.find(p => p._id === selectedProgramId) || program)} // Cancel switch
                                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-10"
                                    >
                                        <ChevronDown className="w-6 h-6 rotate-180" />
                                    </button>
                                )}

                                <motion.div layout="position" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                        <BookOpen className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                                        Select Your Path
                                    </h2>
                                    <p className="text-gray-500 mb-8 text-base max-w-md mx-auto">
                                        Select a program below to start your learning journey with us.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 text-left mb-8 max-h-[400px] overflow-y-auto p-1">
                                        {availablePrograms.map((p) => (
                                            <div
                                                key={p._id}
                                                onClick={() => setSelectedProgramId(p._id)}
                                                className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 group hover:shadow-md ${selectedProgramId === p._id ? 'border-blue-600 bg-blue-50/10' : 'border-gray-100 hover:border-blue-200 bg-white'}`}
                                            >
                                                <div className="flex gap-4">
                                                    <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                                        <img
                                                            src={p.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"}
                                                            alt={p.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className={`font-bold text-sm mb-1 truncate ${selectedProgramId === p._id ? 'text-blue-700' : 'text-gray-900'}`}>{p.name}</h3>
                                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                                            <span className="flex items-center gap-1">
                                                                <Circle size={10} className="fill-current text-blue-500" />
                                                                {p.totalModules || 0} Modules
                                                            </span>
                                                            <span className="capitalize bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                                                {p.skillLevel || 'Beginner'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {selectedProgramId === p._id && (
                                                    <div className="absolute top-3 right-3 text-blue-600">
                                                        <CheckCircle size={20} fill="currentColor" className="text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleEnroll}
                                        disabled={!selectedProgramId}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-200 group active:scale-[0.98]"
                                    >
                                        Enroll in Course
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <AnimatePresence mode="wait">
                    {isEnrolled && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col lg:flex-row gap-10 flex-1"
                        >
                            <div className="flex-1 min-w-0">
                                {/* Video Player */}
                                <div className="relative aspect-[16/9] bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl mb-10 group border border-white/10">
                                    {program.videoUrls && program.videoUrls.length > 0 ? (
                                        <iframe
                                            src={program.videoUrls[0].replace("watch?v=", "embed/")}
                                            className="w-full h-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <>
                                            <img
                                                src={program.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"}
                                                alt="Course Video"
                                                className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all duration-500 scale-105 group-hover:scale-100"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                                    <Play className="w-8 h-8 text-blue-600 ml-1.5" fill="currentColor" />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="absolute bottom-10 left-10 text-white drop-shadow-lg pointer-events-none">
                                        <p className="text-sm font-bold !text-white/80 mb-2 uppercase tracking-widest">Now Playing</p>
                                        <h2 className="text-4xl font-extrabold tracking-tight !text-white">
                                            {activeModule !== null ? modules[activeModule] : "Course Introduction"}
                                        </h2>
                                    </div>

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {/* Description Section */}
                                <div className="bg-white rounded-[32px] p-10 lg:p-12 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
                                    <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                                        {activeModule !== null ? (
                                            `In this module, we'll cover ${modules[activeModule]}. This is part of the ${program.name} curriculum. Explore the content and resources below to master these concepts.`
                                        ) : (
                                            "Please select a module from the course content sidebar to view details and lessons."
                                        )}
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
                                    {modules.map((moduleTitle: string, idx: number) => (
                                        <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all hover:shadow-md">
                                            <button
                                                onClick={() => toggleModule(idx)}
                                                className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all text-left ${activeModule === idx ? 'bg-blue-50/30' : ''}`}
                                            >
                                                <span className={`font-bold text-[15px] leading-snug pr-4 ${activeModule === idx ? 'text-gray-900' : 'text-gray-600'}`}>
                                                    Module {idx + 1}: {moduleTitle}
                                                </span>
                                                {activeModule === idx ? (
                                                    <ChevronUp size={20} className="text-gray-900 shrink-0" strokeWidth={2.5} />
                                                ) : (
                                                    <ChevronDown size={20} className="text-gray-400 shrink-0" strokeWidth={2} />
                                                )}
                                            </button>
                                            {activeModule === idx && (
                                                <div className="border-t border-gray-50 bg-white">
                                                    <div className="p-8 text-center bg-gray-50/50">
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">Lessons coming soon</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </LayoutGroup>
    );
}
