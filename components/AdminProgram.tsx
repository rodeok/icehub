'use client';

import React, { useEffect, useState } from 'react';
import {
    Layers,
    Video,
    FileText,
    Clock,
    BookOpen,
    Users,
    MoreVertical,
    ChevronRight,
    Search,
    Plus,
    X,
    Upload,
    Trash2,
    Loader2,
    Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import UploadDropzone from './UploadDropzone';

export default function AdminProgram() {
    const [programs, setPrograms] = useState<any[]>([]);
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'frontend',
        weeks: '',
        skillLevel: 'beginner',
        imageUrl: '',
        totalModules: '',
        videoLessons: '',
        resourcesCount: '',
        videoUrls: [] as string[],
        resourceUrls: [] as string[],
        curriculum: [] as string[]
    });

    const fetchPrograms = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/programs');
            if (!response.ok) throw new Error('Failed to fetch programs');
            const data = await response.json();
            setPrograms(data.programs);
            setStats(data.stats);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/admin/programs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create program');
            }
            setIsModalOpen(false);
            fetchPrograms();
            // Reset form
            setFormData({
                name: '',
                description: '',
                category: 'frontend',
                weeks: '',
                skillLevel: 'beginner',
                imageUrl: '',
                totalModules: '',
                videoLessons: '',
                resourcesCount: '',
                videoUrls: [],
                resourceUrls: [],
                curriculum: []
            });
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading && programs.length === 0) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;

        try {
            const response = await fetch(`/api/admin/programs/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete program');
            }

            fetchPrograms();
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Programs & Courses</h1>
                    <p className="text-gray-500 mt-1">Create, edit and manage educational content and program structures.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                    <Plus size={18} /> New Program
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.label === 'TOTAL MODULES' ? Layers : stat.label === 'VIDEO LESSONS' ? Video : FileText;
                    return (
                        <div key={index} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <Icon size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-blue-600 tracking-wider uppercase mb-0.5">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {programs.map((course, index) => (
                    <div key={index} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex h-full min-h-[220px] group">
                        {/* Course Image */}
                        <div className="relative w-2/5 min-w-[200px] bg-gray-100 overflow-hidden">
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                unoptimized
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                            {course.badge && (
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest text-gray-900 shadow-sm uppercase">
                                        {course.badge}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Course Content */}
                        <div className="p-6 flex flex-col justify-between flex-1">
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-gray-900 leading-tight pr-4">{course.title}</h3>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock size={16} className="text-gray-400" />
                                        <span className="text-xs font-bold">{course.weeks}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Layers size={16} className="text-gray-400" />
                                        <span className="text-xs font-bold">{course.modules}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 col-span-2">
                                        <Users size={16} className="text-gray-400" />
                                        <span className="text-xs font-bold">{course.students}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className={`h-2 w-2 rounded-full ${course.dotColor}`} />
                                    <span className={`text-[10px] font-black tracking-wider ${course.statusColor}`}>{course.status}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:gap-2 transition-all">
                                        Manage Course
                                        <ChevronRight size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.id, course.title)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        title="Delete Program"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Expansion CTA if no programs */}
            {programs.length === 0 && (
                <div className="bg-gray-50/50 rounded-[40px] border border-gray-100/50 p-12 text-center mt-12 flex flex-col items-center">
                    <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                        <BookOpen size={36} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">No programs found</h2>
                    <p className="text-gray-500 mt-3 max-w-lg leading-relaxed font-medium">
                        Start by creating your first program to reach more students.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-8 px-8 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
                    >
                        Create New Program
                    </button>
                </div>
            )}

            {/* Add Program Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl my-8 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
                            <h2 className="text-2xl font-bold text-gray-900">Add New Program</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Program Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Fullstack Web Development"
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Category</label>
                                    <select
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="frontend">Frontend Development</option>
                                        <option value="backend">Backend Development</option>
                                        <option value="mobile-dev">Mobile Development</option>
                                        <option value="data-analytics">Data Analytics</option>
                                        <option value="cyber-security">Cyber Security</option>
                                        <option value="product-design">Product Design</option>
                                        <option value="digital-literacy">Digital Literacy</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Enter program description..."
                                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Duration (Weeks)</label>
                                    <input
                                        required
                                        type="number"
                                        placeholder="12"
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
                                        value={formData.weeks}
                                        onChange={(e) => setFormData({ ...formData, weeks: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Skill Level</label>
                                    <select
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
                                        value={formData.skillLevel}
                                        onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value as any })}
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>


                            {/* Course Content / Curriculum */}
                            <div className="space-y-4 pt-4">
                                <h3 className="text-sm font-bold text-gray-900 border-l-4 border-blue-600 pl-3">Course Content</h3>
                                <div className="space-y-3">
                                    {formData.curriculum.map((moduleName, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <div className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-800">
                                                <span className="text-gray-400 font-bold mr-2">Module {idx + 1}:</span>
                                                {moduleName}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newCurriculum = [...formData.curriculum];
                                                    newCurriculum.splice(idx, 1);
                                                    setFormData({
                                                        ...formData,
                                                        curriculum: newCurriculum,
                                                        totalModules: Math.max(0, (Number(formData.totalModules) || 0) - 1) + ""
                                                    });
                                                }}
                                                className="p-3.5 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            id="newModuleInput"
                                            placeholder="Enter module title (e.g. Introduction to React)"
                                            className="flex-1 px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const input = e.currentTarget;
                                                    if (input.value.trim()) {
                                                        setFormData({
                                                            ...formData,
                                                            curriculum: [...formData.curriculum, input.value.trim()],
                                                            totalModules: (Number(formData.totalModules) || 0) + 1 + ""
                                                        });
                                                        input.value = '';
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const input = document.getElementById('newModuleInput') as HTMLInputElement;
                                                if (input && input.value.trim()) {
                                                    setFormData({
                                                        ...formData,
                                                        curriculum: [...formData.curriculum, input.value.trim()],
                                                        totalModules: (Number(formData.totalModules) || 0) + 1 + ""
                                                    });
                                                    input.value = '';
                                                }
                                            }}
                                            className="px-6 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 pl-2">Press Enter to add a module</p>
                                </div>
                            </div>


                            {/* Media Uploads */}                            {/* Media Uploads */}
                            <div className="space-y-6 pt-4">
                                <h3 className="text-sm font-bold text-gray-900 border-l-4 border-blue-600 pl-3">Media & Resources</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <UploadDropzone
                                        type="image"
                                        label="Thumbnail Image"
                                        description="Best size: 1280x720 (16:9)"
                                        currentValue={formData.imageUrl}
                                        onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })}
                                        onRemove={() => setFormData({ ...formData, imageUrl: '' })}
                                    />

                                    <div className="space-y-4">
                                        <UploadDropzone
                                            type="video"
                                            label={`Video Lessons (${formData.videoUrls.length})`}
                                            description="MP4, MOV supported"
                                            onUploadSuccess={(url) => setFormData({
                                                ...formData,
                                                videoUrls: [...formData.videoUrls, url],
                                                videoLessons: (Number(formData.videoLessons) || 0) + 1 + ""
                                            })}
                                        />
                                        <div className="flex flex-wrap gap-2">
                                            {formData.videoUrls.map((url, i) => (
                                                <div key={i} className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-bold flex items-center gap-2">
                                                    Video {i + 1}
                                                    <button onClick={() => setFormData({
                                                        ...formData,
                                                        videoUrls: formData.videoUrls.filter((_, idx) => idx !== i),
                                                        videoLessons: Math.max(0, Number(formData.videoLessons) - 1) + ""
                                                    })}>
                                                        <X size={10} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Manual Video Lesson Count</label>
                                        <input
                                            type="number"
                                            placeholder="Total videos"
                                            className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
                                            value={formData.videoLessons}
                                            onChange={(e) => setFormData({ ...formData, videoLessons: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Module Count</label>
                                        <input
                                            type="number"
                                            placeholder="Total modules"
                                            className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
                                            value={formData.totalModules}
                                            onChange={(e) => setFormData({ ...formData, totalModules: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <UploadDropzone
                                        type="pdf"
                                        label={`Resources (${formData.resourceUrls.length})`}
                                        description="PDF, ZIP supported"
                                        onUploadSuccess={(url) => setFormData({
                                            ...formData,
                                            resourceUrls: [...formData.resourceUrls, url],
                                            resourcesCount: (Number(formData.resourcesCount) || 0) + 1 + ""
                                        })}
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {formData.resourceUrls.map((url, i) => (
                                            <div key={i} className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold flex items-center gap-2">
                                                Resource {i + 1}
                                                <button onClick={() => setFormData({
                                                    ...formData,
                                                    resourceUrls: formData.resourceUrls.filter((_, idx) => idx !== i),
                                                    resourcesCount: Math.max(0, Number(formData.resourcesCount) - 1) + ""
                                                })}>
                                                    <X size={10} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-50 flex gap-4 sticky bottom-0 bg-white pb-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-8 py-4 border border-gray-100 rounded-[2rem] text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-3 px-12 py-4 bg-blue-600 text-white rounded-[2rem] text-sm font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                                    Create Program
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
