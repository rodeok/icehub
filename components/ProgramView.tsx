"use client";

import { useState, useEffect, useRef } from "react";
import { Play, FileText, Download, CheckCircle, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { IProgram, IModule, ILesson } from "@/models/Program";
import dynamic from 'next/dynamic';

// Use dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

interface ProgramViewProps {
    program: IProgram;
}

interface ProgressData {
    [lessonId: string]: {
        secondsWatched: number;
        status: 'not_started' | 'in_progress' | 'completed';
    };
}

export default function ProgramView({ program }: ProgramViewProps) {
    // Default to first module if exists
    const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(0);
    const [currentLesson, setCurrentLesson] = useState<ILesson | null>(
        program.modules?.[0]?.lessons?.[0] || null
    );
    const [progressData, setProgressData] = useState<ProgressData>({});
    const playerRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Fetch user progress on mount
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await fetch(`/api/programs/progress?programId=${program._id}`);
                if (res.ok) {
                    const data = await res.json();
                    const progressMap: ProgressData = {};
                    data.progress.forEach((p: any) => {
                        progressMap[p.lessonId] = {
                            secondsWatched: p.secondsWatched,
                            status: p.status
                        };
                    });
                    setProgressData(progressMap);
                }
            } catch (error) {
                console.error("Failed to fetch progress", error);
            }
        };

        if (program._id) {
            fetchProgress();
        }
    }, [program._id]);

    const toggleModule = (index: number) => {
        setActiveModuleIndex(activeModuleIndex === index ? null : index);
    };

    const handleLessonSelect = (lesson: ILesson) => {
        if (!lesson.isFree && !program.isActive) { // Simple check for locked
            // Logic for locked lesson (e.g. show toast)
            return;
        }

        // Save current lesson progress before switching?
        // Ideally handled by periodic save or unmount, but let's ensure last state is saved.
        // For simplicity, relying on periodic updates in onProgress.

        setCurrentLesson(lesson);
        setIsPlaying(true);
    };

    const saveProgress = async (lessonId: string, secondsWatched: number, status: 'in_progress' | 'completed') => {
        if (!program.modules) return;

        // Find module ID for current lesson
        let moduleId = '';
        for (const module of program.modules) {
            if (module.lessons.some((l: any) => l._id === lessonId)) {
                moduleId = module._id?.toString() || 'unknown'; // assuming module has _id
                break;
            }
        }

        // Need to ensure lesson has ID. If using subdocuments, Mongoose assigns _id by default.
        // But our manual interface might not reflect it perfectly in frontend types.
        // Assuming lesson object has _id.

        try {
            await fetch('/api/programs/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    programId: program._id,
                    moduleId,
                    lessonId,
                    secondsWatched,
                    status
                })
            });
        } catch (error) {
            console.error("Failed to save progress", error);
        }
    };

    const handleProgress = (state: { playedSeconds: number }) => {
        if (!currentLesson) return;

        // Update local state
        const lessonId = (currentLesson as any)._id; // Cast to access _id
        if (!lessonId) return;

        setProgressData(prev => ({
            ...prev,
            [lessonId]: {
                secondsWatched: state.playedSeconds,
                status: 'in_progress'
            }
        }));

        // Save to DB every 10 seconds or structured intervals (debouncing would be better)
        if (state.playedSeconds > 0 && Math.floor(state.playedSeconds) % 10 === 0) {
            saveProgress(lessonId, state.playedSeconds, 'in_progress');
        }
    };

    const handleDuration = (duration: number) => {
        // seek to saved timestamp when player is ready
        if (currentLesson && playerRef.current) {
            const lessonId = (currentLesson as any)._id;
            const savedProgress = progressData[lessonId];
            if (savedProgress?.secondsWatched > 0) {
                playerRef.current.seekTo(savedProgress.secondsWatched);
            }
        }
    }

    const handleEnded = () => {
        if (!currentLesson) return;
        const lessonId = (currentLesson as any)._id;
        if (!lessonId) return;

        saveProgress(lessonId, 0, 'completed'); // Reset watch time? Or keep max? Usually keep max or 0 if "completed" means done.
        // Actually for "completed", we might want to keep secondsWatched at max duration or similar.
        // But keeping it simple: just mark status = completed.

        setProgressData(prev => ({
            ...prev,
            [lessonId]: {
                ...prev[lessonId],
                status: 'completed'
            }
        }));
    };

    // If no modules, show default view or empty state
    if (!program.modules || program.modules.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Course Content Coming Soon</h2>
                <p className="text-gray-500">This program doesn't have any content yet.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Video Player */}
                    <div className="relative aspect-[16/9] bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl mb-10 group cursor-pointer border border-white/10">
                        {currentLesson?.videoUrl ? (
                            <ReactPlayer
                                ref={playerRef}
                                url={currentLesson.videoUrl}
                                width="100%"
                                height="100%"
                                controls
                                playing={isPlaying}
                                onProgress={handleProgress}
                                onStart={() => handleDuration(0)} // Trigger seek on start
                                onEnded={handleEnded}
                                config={{
                                    youtube: {
                                        playerVars: { showinfo: 1 }
                                    }
                                }}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                <p className="text-white">Select a lesson to start learning</p>
                            </div>
                        )}

                        {currentLesson && !isPlaying && (
                            <div className="absolute bottom-10 left-10 text-white drop-shadow-lg pointer-events-none">
                                <p className="text-sm font-bold !text-white/80 mb-2 uppercase tracking-widest">Now Playing</p>
                                <h2 className="text-4xl font-extrabold tracking-tight !text-white">{currentLesson.title}</h2>
                            </div>
                        )}
                    </div>

                    {/* Description Section */}
                    <div className="bg-white rounded-[32px] p-10 lg:p-12 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                            {program.description}
                        </p>

                        {currentLesson?.resources && currentLesson.resources.length > 0 && (
                            <>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Resources</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {currentLesson.resources.map((resource, idx) => (
                                        <a
                                            key={idx}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group hover:bg-white hover:shadow-md"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-50 group-hover:bg-blue-50 transition-colors">
                                                    <FileText size={24} strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{resource.title}</p>
                                                    {resource.size && <p className="text-xs font-bold text-gray-400 mt-0.5">{resource.size}</p>}
                                                </div>
                                            </div>
                                            <Download size={20} className="text-gray-400 group-hover:text-blue-600 transition-all" strokeWidth={2} />
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Sidebar - Course Content */}
                <div className="w-full lg:w-96 shrink-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Course Content</h3>
                    <div className="space-y-4">
                        {program.modules.map((module, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all hover:shadow-md">
                                <button
                                    onClick={() => toggleModule(index)}
                                    className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all text-left ${activeModuleIndex === index ? 'bg-blue-50/30' : ''}`}
                                >
                                    <span className={`font-bold text-[15px] leading-snug pr-4 ${activeModuleIndex === index ? 'text-gray-900' : 'text-gray-600'}`}>
                                        Module {index + 1}: {module.title}
                                    </span>
                                    {activeModuleIndex === index ? (
                                        <ChevronUp size={20} className="text-gray-900 shrink-0" strokeWidth={2.5} />
                                    ) : (
                                        <ChevronDown size={20} className="text-gray-400 shrink-0" strokeWidth={2} />
                                    )}
                                </button>

                                {activeModuleIndex === index && (
                                    <div className="border-t border-gray-50 bg-white">
                                        {module.lessons.length > 0 ? (
                                            <div className="py-0">
                                                {module.lessons.map((lesson, idx) => {
                                                    const isActive = currentLesson === lesson;
                                                    const isLocked = !lesson.isFree; // Simplification for now

                                                    const lessonId = (lesson as any)._id; // Needs casting if not strictly typed
                                                    const progress = lessonId ? progressData[lessonId] : null;
                                                    const isCompleted = progress?.status === 'completed';

                                                    return (
                                                        <div
                                                            key={idx}
                                                            onClick={() => handleLessonSelect(lesson)}
                                                            className={`flex items-start gap-4 px-6 py-4 transition-all cursor-pointer group active:bg-gray-100 border-b border-gray-50 last:border-0 ${isActive ? 'bg-blue-50/40 border-r-4 border-r-blue-600' : 'hover:bg-gray-50/80'
                                                                }`}
                                                        >
                                                            <div className="mt-1 shrink-0">
                                                                {isCompleted ? (
                                                                    <div className="w-5 h-5 rounded-full border border-green-200 bg-green-50 flex items-center justify-center">
                                                                        <CheckCircle size={14} className="text-green-500" strokeWidth={3} />
                                                                    </div>
                                                                ) : isActive ? (
                                                                    <Play size={18} className="text-blue-600" strokeWidth={2} />
                                                                ) : isLocked ? (
                                                                    <div className="text-gray-300">
                                                                        <Lock size={18} />
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
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
