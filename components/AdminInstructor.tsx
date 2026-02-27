'use client';

import React, { useEffect, useState } from 'react';
import {
    Plus,
    Mail,
    MoreVertical,
    Star,
    ChevronRight,
    User as UserIcon,
    Trash2,
    Loader2,
    X,
    Upload
} from 'lucide-react';
import Image from 'next/image';

export default function AdminInstructor() {
    const [instructors, setInstructors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        specialty: 'frontend',
        email: '',
        role: 'Instructor',
        bio: '',
        imageUrl: '',
        cohorts: [] as string[]
    });

    const generateCredentials = () => {
        const randomString = Math.random().toString(36).substring(2, 8);
        setFormData(prev => ({
            ...prev,
            username: prev.fullName ? prev.fullName.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 100) : `instructor${randomString}`,
            password: `Pass@${Math.random().toString(36).substring(2, 8)}`
        }));
    };

    const categories = [
        'frontend',
        'backend',
        'mobile-dev',
        'data-analytics',
        'cyber-security',
        'graphics-design',
        'product-design',
        'digital-literacy',
        'next-gen',
        'skit',
    ];

    const fetchInstructors = async () => {
        try {
            const response = await fetch('/api/admin/instructors');
            const data = await response.json();
            setInstructors(data);
        } catch (err) {
            console.error('Error fetching instructors:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/admin/instructors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to hire instructor');
            }

            setIsModalOpen(false);
            fetchInstructors();
            // Reset form
            setFormData({
                fullName: '',
                username: '',
                password: '',
                specialty: 'frontend',
                email: '',
                role: 'Instructor',
                bio: '',
                imageUrl: '',
                cohorts: []
            });
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;

        try {
            const response = await fetch(`/api/admin/instructors/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete instructor');
            }

            fetchInstructors();
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (loading && instructors.length === 0) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Instructors & Mentors</h1>
                    <p className="text-gray-500 mt-1">Manage your academic staff, assignments and performance metrics.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    Hire Instructor
                </button>
            </div>

            {/* Instructors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructors.map((instructor, index) => (
                    <div key={index} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6 relative group">
                        {/* Instructor Header */}
                        <div className="flex justify-between items-start">
                            <div className="relative">
                                <div className="h-16 w-16 bg-gray-200 rounded-2xl border border-gray-50 overflow-hidden shadow-sm">
                                    {instructor.imageUrl ? (
                                        <Image
                                            src={instructor.imageUrl}
                                            alt={instructor.fullName}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-300">
                                            <UserIcon size={32} />
                                        </div>
                                    )}
                                </div>
                                <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-4 border-white ${instructor.statusColor || 'bg-green-500'}`} />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400">
                                    <Mail size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(instructor._id, instructor.fullName)}
                                    className="p-2 hover:bg-red-50 rounded-xl transition-colors text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Name & Role */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">{instructor.fullName}</h3>
                            <p className="text-sm font-medium text-gray-400 mt-1">{instructor.specialty || instructor.role}</p>
                        </div>

                        {/* Stats Bar */}
                        <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-2xl p-4">
                            <div className="text-center">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Students</p>
                                <p className="text-sm font-bold text-gray-900">{instructor.studentsCount || 0}</p>
                            </div>
                            <div className="text-center border-x border-gray-200/50">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Courses</p>
                                <p className="text-sm font-bold text-gray-900">{instructor.coursesCount || 0}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Rating</p>
                                <div className="flex items-center justify-center gap-1">
                                    <p className="text-sm font-bold text-gray-900">{instructor.rating || 5.0}</p>
                                    <Star size={12} className="text-orange-400 fill-orange-400" />
                                </div>
                            </div>
                        </div>

                        {/* Cohorts */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Cohorts</h4>
                                <button className="text-[10px] font-black text-blue-600 hover:underline">See All</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {instructor.cohorts?.length > 0 ? instructor.cohorts.map((cohort: string, i: number) => (
                                    <span key={i} className="px-3 py-1.5 bg-blue-50/50 rounded-lg text-[9px] font-black tracking-wider text-blue-600 uppercase">
                                        {cohort}
                                    </span>
                                )) : (
                                    <span className="text-[10px] text-gray-400 font-medium italic">No active cohorts</span>
                                )}
                            </div>
                        </div>

                        {/* Footer Action */}
                        <button className="w-full mt-2 py-3.5 rounded-2xl border border-gray-100 text-xs font-bold text-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group">
                            View Full Profile
                            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                ))}

                {/* Team Expansion CTA */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="p-6 rounded-[32px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center gap-4 py-12 cursor-pointer hover:border-blue-200 hover:bg-blue-50/10 transition-all"
                >
                    <div className="h-14 w-14 bg-blue-50/50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                        <UserIcon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Expand Your Team</h3>
                        <p className="text-xs font-medium text-gray-400 mt-2 max-w-[180px] mx-auto leading-relaxed">
                            Looking for industry experts to join Ice Hub as mentors?
                        </p>
                    </div>
                </div>
            </div>

            {/* Hire Instructor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="p-8 pb-0 flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">Hire Instructor</h2>
                                <p className="text-gray-500 mt-1 font-medium text-sm">Fill in the details to add a new mentor.</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={generateCredentials}
                                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                                >
                                    Auto-Generate Login
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-3 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Form Body */}
                        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="Auto-generate or type..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="Auto-generate or type..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Specialty / Track</label>
                                        <select
                                            value={formData.specialty}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    specialty: val,
                                                    cohorts: [val] // Default cohort to specialty
                                                });
                                            }}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Role</label>
                                        <input
                                            type="text"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="e.g. Lead Instructor"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Short Bio</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[100px]"
                                        placeholder="Experience and background..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Profile Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-8 py-4 bg-gray-50 text-gray-900 rounded-2xl text-sm font-bold hover:bg-gray-100 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-[2] px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Hiring...
                                            </>
                                        ) : (
                                            'Confirm Hire'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
