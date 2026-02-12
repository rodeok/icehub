'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Send,
    Megaphone,
    Search,
    Sliders,
    Eye,
    Users,
    Calendar,
    MoreVertical,
    Globe,
    Target,
    Clock,
    MousePointer2,
    Loader2,
    X
} from 'lucide-react';

export default function AdminAnouncement() {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [programs, setPrograms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search, setSearch] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        message: '',
        targetType: 'all',
        targetId: '',
        targetName: 'All Students'
    });

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [annRes, progRes] = await Promise.all([
                fetch('/api/admin/announcements'),
                fetch('/api/admin/programs')
            ]);
            const [annData, progData] = await Promise.all([
                annRes.json(),
                progRes.json()
            ]);
            setAnnouncements(annData);
            setPrograms(progData.programs || []);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/admin/announcements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to create broadcast');

            await fetchData();
            setIsModalOpen(false);
            setFormData({
                title: '',
                message: '',
                targetType: 'all',
                targetId: '',
                targetName: 'All Students'
            });
        } catch (err) {
            alert('Error creating broadcast');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredAnnouncements = announcements.filter(ann =>
        ann.title.toLowerCase().includes(search.toLowerCase()) ||
        ann.targetName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-12 relative">
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black text-gray-900">New Broadcast</h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reach your student community</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Broadcast Title</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Schedule Update: Weekend Classes"
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Target Audience</label>
                                    <select
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none"
                                        value={formData.targetType === 'all' ? 'all' : formData.targetId}
                                        onChange={e => {
                                            const val = e.target.value;
                                            if (val === 'all') {
                                                setFormData({ ...formData, targetType: 'all', targetId: '', targetName: 'All Students' });
                                            } else {
                                                const prog = programs.find(p => p.id === val);
                                                setFormData({ ...formData, targetType: 'program', targetId: val, targetName: prog?.title || 'Specific Program' });
                                            }
                                        }}
                                    >
                                        <option value="all">All Registered Students</option>
                                        <optgroup label="Programs & Cohorts">
                                            {programs.map(p => (
                                                <option key={p.id} value={p.id}>{p.title}</option>
                                            ))}
                                        </optgroup>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Content Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Write your announcement here..."
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} strokeWidth={2.5} />}
                                        {isSubmitting ? 'Sending...' : 'Publish Broadcast'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Broadcast important updates and schedule reminders for your hub community.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                    <Send size={16} strokeWidth={2.5} />
                    New Broadcast
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Announcements Column */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Search & Filter */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search announcements..."
                                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm shadow-sm outline-none transition-all focus:ring-1 focus:ring-blue-100"
                            />
                        </div>
                        <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:bg-gray-50 transition-all shadow-sm">
                            <Sliders size={18} />
                        </button>
                    </div>

                    {/* Announcements List */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="bg-white py-20 flex flex-col items-center justify-center rounded-[32px] border border-gray-50 gap-4">
                                <Loader2 size={32} className="animate-spin text-blue-600" />
                                <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">Fetching broadcast history...</p>
                            </div>
                        ) : filteredAnnouncements.length === 0 ? (
                            <div className="bg-white py-20 flex flex-col items-center justify-center rounded-[32px] border border-gray-50 gap-4 opacity-70">
                                <Megaphone size={48} className="text-gray-200" />
                                <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">No announcements found</p>
                            </div>
                        ) : (
                            filteredAnnouncements.map((ann, index) => (
                                <div key={index} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 group">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4">
                                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${ann.targetType === 'all' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
                                                }`}>
                                                <Megaphone size={20} strokeWidth={2.5} />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{ann.title}</h3>
                                                <div className="flex items-center gap-1.5 text-gray-400">
                                                    <Target size={12} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Target:</span>
                                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{ann.targetName}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest bg-green-50 text-green-500 uppercase`}>
                                                {ann.status}
                                            </span>
                                            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 font-medium line-clamp-2 px-1">
                                        {ann.message}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Eye size={14} />
                                                <span className="text-[11px] font-black text-gray-700">{ann.views || 0} <span className="text-gray-400 font-bold ml-0.5">Views</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <MousePointer2 size={14} />
                                                <span className="text-[11px] font-black text-gray-700">{ann.clicks || 0} <span className="text-gray-400 font-bold ml-0.5">Clicks</span></span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Calendar size={14} />
                                            <span className="text-[11px] font-bold tracking-tight">{new Date(ann.createdAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Audience Insights Card */}
                    <div className="bg-[#0f172a] p-8 rounded-[32px] text-white shadow-xl flex flex-col gap-8">
                        <h3 className="text-lg font-bold !text-white">Audience Insights</h3>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
                                    <span className="text-gray-400">Open Rate</span>
                                    <span className="text-white">72%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
                                    <span className="text-gray-400">Avg Engagement</span>
                                    <span className="text-white">45%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '45%' }} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 font-bold text-sm text-white leading-relaxed relative">
                            "Students in the Fullstack cohort are most active between 6 PM and 9 PM."
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600/30 rounded-l-2xl" />
                        </div>
                    </div>

                    {/* Target Groups Card */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-gray-900">Target Groups</h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center">
                                        <Users size={18} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-700">All Registered</span>
                                </div>
                                <span className="text-xs font-black text-gray-400">1,289</span>
                            </div>

                            {programs.slice(0, 3).map(p => (
                                <div key={p.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center">
                                            <Globe size={18} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">{p.title}</span>
                                    </div>
                                    <span className="text-xs font-black text-gray-400">{p.students}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-2 py-3.5 bg-gray-50 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-900 hover:bg-gray-100 transition-all">
                            Manage Segments
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
