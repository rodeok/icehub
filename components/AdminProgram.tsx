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
    Image as ImageIcon,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import UploadDropzone from './UploadDropzone';

interface Resource {
    title: string;
    url: string;
    type: string;
    size?: string;
}

interface Lesson {
    title: string;
    duration: string;
    videoUrl?: string; // YouTube Video URL associated with the lesson
    isFree: boolean;
    resources: Resource[];
    isFetchingMetadata?: boolean; // UI state for fetching
}

interface Module {
    title: string;
    lessons: Lesson[];
}

export default function AdminProgram() {
    const [programs, setPrograms] = useState<any[]>([]);
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isFetchingCourse, setIsFetchingCourse] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'frontend',
        weeks: '',
        skillLevel: 'beginner',
        imageUrl: '',
        modules: [] as Module[], // Structured modules
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
            const url = editingId ? `/api/admin/programs/${editingId}` : '/api/admin/programs';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || `Failed to ${editingId ? 'update' : 'create'} program`);
            }
            setIsModalOpen(false);
            setEditingId(null);
            fetchPrograms();
            // Reset form
            setFormData({
                name: '',
                description: '',
                category: 'frontend',
                weeks: '',
                skillLevel: 'beginner',
                imageUrl: '',
                modules: [],
            });
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditCourse = async (id: string) => {
        setIsFetchingCourse(true);
        try {
            const response = await fetch(`/api/admin/programs/${id}`);
            if (!response.ok) throw new Error('Failed to fetch course details');
            const data = await response.json();
            const course = data.program;
            setEditingId(id);
            setFormData({
                name: course.name || '',
                description: course.description || '',
                category: course.category || 'frontend',
                weeks: (course.weeks || '').toString(),
                skillLevel: course.skillLevel || 'beginner',
                imageUrl: course.imageUrl || '',
                modules: course.modules || [],
            });
            setIsModalOpen(true);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsFetchingCourse(false);
        }
    };

    // Helper functions for Module/Lesson Management
    const addModule = () => {
        setFormData({
            ...formData,
            modules: [...formData.modules, { title: 'New Module', lessons: [] }]
        });
    };

    const updateModuleTitle = (index: number, title: string) => {
        const newModules = [...formData.modules];
        newModules[index].title = title;
        setFormData({ ...formData, modules: newModules });
    };

    const deleteModule = (index: number) => {
        const newModules = [...formData.modules];
        newModules.splice(index, 1);
        setFormData({ ...formData, modules: newModules });
    };

    const addLesson = (moduleIndex: number) => {
        const newModules = [...formData.modules];
        newModules[moduleIndex].lessons.push({
            title: 'New Lesson',
            duration: '10:00',
            isFree: false,
            resources: []
        });
        setFormData({ ...formData, modules: newModules });
    };

    const updateLesson = (moduleIndex: number, lessonIndex: number, field: keyof Lesson, value: any) => {
        const newModules = [...formData.modules];
        (newModules[moduleIndex].lessons[lessonIndex] as any)[field] = value;
        setFormData({ ...formData, modules: newModules });
    };

    const deleteLesson = (moduleIndex: number, lessonIndex: number) => {
        const newModules = [...formData.modules];
        newModules[moduleIndex].lessons.splice(lessonIndex, 1);
        setFormData({ ...formData, modules: newModules });
    };

    const addResource = (moduleIndex: number, lessonIndex: number, resource: Resource) => {
        const newModules = [...formData.modules];
        if (!newModules[moduleIndex].lessons[lessonIndex].resources) {
            newModules[moduleIndex].lessons[lessonIndex].resources = [];
        }
        newModules[moduleIndex].lessons[lessonIndex].resources.push(resource);
        setFormData({ ...formData, modules: newModules });
    };

    const removeResource = (moduleIndex: number, lessonIndex: number, resourceIndex: number) => {
        const newModules = [...formData.modules];
        newModules[moduleIndex].lessons[lessonIndex].resources.splice(resourceIndex, 1);
        setFormData({ ...formData, modules: newModules });
    };

    const fetchYouTubeMetadata = async (moduleIndex: number, lessonIndex: number, url: string) => {
        if (!url) return;

        updateLesson(moduleIndex, lessonIndex, 'isFetchingMetadata', true);

        try {
            const response = await fetch('/api/admin/youtube', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to fetch YouTube metadata');
            }

            const data = await response.json();

            // Auto-fill title and duration
            if (data.title) updateLesson(moduleIndex, lessonIndex, 'title', data.title);
            if (data.duration) updateLesson(moduleIndex, lessonIndex, 'duration', data.duration);

            alert('Metadata fetched successfully!');
        } catch (error: any) {
            console.error('Error fetching YouTube metadata:', error);
            alert(error.message);
            // Optionally clear the invalid URL
            // updateLesson(moduleIndex, lessonIndex, 'videoUrl', '');
        } finally {
            updateLesson(moduleIndex, lessonIndex, 'isFetchingMetadata', false);
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
                    onClick={() => {
                        setEditingId(null);
                        setFormData({
                            name: '',
                            description: '',
                            category: 'frontend',
                            weeks: '',
                            skillLevel: 'beginner',
                            imageUrl: '',
                            modules: [],
                        });
                        setIsModalOpen(true);
                    }}
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
                                    <button
                                        onClick={() => handleEditCourse(course.id)}
                                        disabled={isFetchingCourse}
                                        className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:gap-2 transition-all disabled:opacity-50"
                                    >
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
                            <h2 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Program' : 'Add New Program'}</h2>
                            <button onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
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

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <UploadDropzone
                                    type="image"
                                    label="Thumbnail Image"
                                    description="Best size: 1280x720 (16:9)"
                                    currentValue={formData.imageUrl}
                                    onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })}
                                    onRemove={() => setFormData({ ...formData, imageUrl: '' })}
                                />
                            </div>

                            {/* Modules & Lessons Management */}
                            <div className="space-y-6 pt-6 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-900">Course Modules</h3>
                                    <button
                                        type="button"
                                        onClick={addModule}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-gray-800 transition-all"
                                    >
                                        <Plus size={16} /> Add Module
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {formData.modules.map((module, mIdx) => (
                                        <div key={mIdx} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm text-gray-400 font-bold text-xs">
                                                    #{mIdx + 1}
                                                </div>
                                                <input
                                                    type="text"
                                                    value={module.title}
                                                    onChange={(e) => updateModuleTitle(mIdx, e.target.value)}
                                                    className="flex-1 bg-white border-none rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none"
                                                    placeholder="Module Title"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => deleteModule(mIdx)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            {/* Lessons */}
                                            <div className="pl-4 space-y-3 border-l-2 border-gray-200 ml-4">
                                                {module.lessons.map((lesson, lIdx) => (
                                                    <div key={lIdx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-4">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1 space-y-3">
                                                                <input
                                                                    type="text"
                                                                    value={lesson.title}
                                                                    onChange={(e) => updateLesson(mIdx, lIdx, 'title', e.target.value)}
                                                                    className="w-full bg-gray-50 border-none rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none"
                                                                    placeholder="Lesson Title"
                                                                />
                                                                <div className="flex gap-3">
                                                                    <input
                                                                        type="text"
                                                                        value={lesson.duration}
                                                                        onChange={(e) => updateLesson(mIdx, lIdx, 'duration', e.target.value)}
                                                                        className="w-24 bg-gray-50 border-none rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-100 outline-none"
                                                                        placeholder="Duration (e.g. 10:00)"
                                                                    />
                                                                    <div className="flex items-center gap-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={lesson.isFree}
                                                                            onChange={(e) => updateLesson(mIdx, lIdx, 'isFree', e.target.checked)}
                                                                            id={`free-${mIdx}-${lIdx}`}
                                                                            className="rounded text-blue-600 focus:ring-blue-500"
                                                                        />
                                                                        <label htmlFor={`free-${mIdx}-${lIdx}`} className="text-xs text-gray-500 font-medium">Free Preview</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => deleteLesson(mIdx, lIdx)}
                                                                className="text-gray-400 hover:text-red-500"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </div>

                                                        {/* YouTube URL input per Lesson */}
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">YouTube Video URL</label>
                                                            <div className="flex gap-3">
                                                                <input
                                                                    type="text"
                                                                    value={lesson.videoUrl || ''}
                                                                    onChange={(e) => updateLesson(mIdx, lIdx, 'videoUrl', e.target.value)}
                                                                    className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none"
                                                                    placeholder="e.g. https://youtu.be/dQw4w9WgXcQ"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => fetchYouTubeMetadata(mIdx, lIdx, lesson.videoUrl || '')}
                                                                    disabled={!lesson.videoUrl || lesson.isFetchingMetadata}
                                                                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[130px]"
                                                                >
                                                                    {lesson.isFetchingMetadata ? <Loader2 size={16} className="animate-spin" /> : 'Fetch Metadata'}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Resources Upload */}
                                                        <div className="space-y-3 pt-4 mt-2 border-t border-gray-100">
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lesson Resources (Slides/PDF/DOCX)</label>
                                                            </div>
                                                            {lesson.resources && lesson.resources.length > 0 && (
                                                                <div className="space-y-2 mb-4">
                                                                    {lesson.resources.map((res: any, rIdx: number) => (
                                                                        <div key={rIdx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                                            <div className="flex items-center gap-3 overflow-hidden">
                                                                                <FileText size={16} className="text-orange-500 flex-shrink-0" />
                                                                                <a href={res.url} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-700 truncate hover:text-blue-600 transition-colors">
                                                                                    {res.title}
                                                                                </a>
                                                                            </div>
                                                                            <button type="button" onClick={() => removeResource(mIdx, lIdx, rIdx)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                                                                                <Trash2 size={14} />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            <UploadDropzone
                                                                type="document"
                                                                label="Upload New Slide / Document"
                                                                description="Accepts .pdf, .docx, .pptx files"
                                                                onUploadSuccess={(url, originalFilename) => {
                                                                    addResource(mIdx, lIdx, {
                                                                        title: originalFilename || 'Untitled Document',
                                                                        url,
                                                                        type: 'document'
                                                                    });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}

                                                <button
                                                    type="button"
                                                    onClick={() => addLesson(mIdx)}
                                                    className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 py-2"
                                                >
                                                    <Plus size={14} /> Add Lesson
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {formData.modules.length === 0 && (
                                        <div className="text-center py-8 text-gray-400 text-sm italic border-2 border-dashed border-gray-100 rounded-2xl">
                                            No modules added yet. Click "Add Module" to start.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-50 flex gap-4 sticky bottom-0 bg-white pb-4">
                                <button
                                    type="button"
                                    onClick={() => { setIsModalOpen(false); setEditingId(null); }}
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
                                    {editingId ? 'Save Changes' : 'Create Program'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
