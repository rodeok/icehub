'use client';

import React, { useEffect, useState } from 'react';
import {
    Plus,
    Trash2,
    Loader2,
    X,
    FileText,
    Pencil
} from 'lucide-react';
import Image from 'next/image';
import UploadDropzone from './UploadDropzone';

export default function AdminBlog() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        tag: 'Blog',
        title: '',
        excerpt: '',
        content: '',
        date: '',
        tagColor: 'bg-blue-50 text-blue-600',
        imageUrl: ''
    });

    const tags = [
        { name: 'Blog', color: 'bg-blue-50 text-blue-600' },
        { name: 'Insight', color: 'bg-indigo-50 text-indigo-600' },
        { name: 'Event', color: 'bg-green-50 text-green-600' },
        { name: 'Workshop', color: 'bg-purple-50 text-purple-600' },
        { name: 'Update', color: 'bg-sky-50 text-sky-600' },
        { name: 'Innovation', color: 'bg-orange-50 text-orange-500' },
        { name: 'Community', color: 'bg-pink-50 text-pink-500' },
        { name: 'Activities', color: 'bg-emerald-50 text-emerald-600' },
    ];

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/admin/blogs');
            const data = await response.json();
            setBlogs(data);
        } catch (err) {
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingId ? `/api/admin/blogs/${editingId}` : '/api/admin/blogs';
            const method = editingId ? 'PUT' : 'POST';

            const payload = { ...formData };
            if (!payload.date) {
                payload.date = new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
            }

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to save blog');
            }

            setIsModalOpen(false);
            fetchBlogs();
            resetForm();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            const response = await fetch(`/api/admin/blogs/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete blog');
            }

            fetchBlogs();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleEdit = (blog: any) => {
        setFormData({
            tag: blog.tag,
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            date: blog.date,
            tagColor: blog.tagColor,
            imageUrl: blog.imageUrl || '',
        });
        setEditingId(blog._id);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            tag: 'Blog',
            title: '',
            excerpt: '',
            content: '',
            date: '',
            tagColor: 'bg-blue-50 text-blue-600',
            imageUrl: ''
        });
        setEditingId(null);
    };

    const handleUploadSuccess = (url: string) => {
        setFormData(prev => ({
            ...prev,
            imageUrl: url
        }));
    };

    if (loading && blogs.length === 0) {
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
                    <h1 className="text-3xl font-bold text-gray-900">Blogs & Activities</h1>
                    <p className="text-gray-500 mt-1">Create and manage your blog posts on the landing page.</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                    <Plus size={18} strokeWidth={2.5} />
                    New Post
                </button>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                    <div key={index} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full group">
                        <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                            {blog.imageUrl ? (
                                <Image src={blog.imageUrl} alt={blog.title} fill className="object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-slate-300 font-bold bg-gray-100">
                                    No Image
                                </div>
                            )}
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest mb-3 w-fit ${blog.tagColor}`}>
                                {blog.tag}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                                {blog.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                                {blog.excerpt}
                            </p>

                            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                                <span className="text-gray-400 text-xs font-semibold">{blog.date}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(blog)}
                                        className="p-2 hover:bg-blue-50 text-blue-500 rounded-xl transition-colors"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog._id, blog.title)}
                                        className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {blogs.length === 0 && (
                    <div
                        onClick={() => {
                            resetForm();
                            setIsModalOpen(true);
                        }}
                        className="p-6 rounded-[32px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center gap-4 py-12 cursor-pointer hover:border-blue-200 hover:bg-blue-50/10 transition-all col-span-full mt-4"
                    >
                        <div className="h-14 w-14 bg-blue-50/50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                            <FileText size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Create Your First Blog Post</h3>
                            <p className="text-sm font-medium text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                                Start sharing your updates, insignts, and events with the community.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
                        <div className="p-8 pb-4 shrink-0 flex justify-between items-center border-b border-gray-100">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Post' : 'New Post'}</h2>
                                <p className="text-gray-500 mt-1 font-medium text-sm">Fill in the details for your blog post.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                            <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Post Title"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category tag</label>
                                        <select
                                            value={formData.tag}
                                            onChange={(e) => {
                                                const selected = tags.find(t => t.name === e.target.value);
                                                if (selected) {
                                                    setFormData({
                                                        ...formData,
                                                        tag: selected.name,
                                                        tagColor: selected.color
                                                    });
                                                }
                                            }}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        >
                                            {tags.map((t) => (
                                                <option key={t.name} value={t.name}>{t.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date String (Optional)</label>
                                        <input
                                            type="text"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="e.g. March 15, 2024"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Short Excerpt</label>
                                    <textarea
                                        required
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[80px] resize-y"
                                        placeholder="Summary for the card..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Content</label>
                                    <textarea
                                        required
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-normal text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[150px] resize-y"
                                        placeholder="Write the full post content here..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cover Image</label>
                                    {formData.imageUrl ? (
                                        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-gray-100">
                                            <Image
                                                src={formData.imageUrl}
                                                alt="Cover"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                                    className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/30 transition-colors"
                                                >
                                                    Remove Image
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <UploadDropzone
                                            type="image"
                                            label="blog cover"
                                            onUploadSuccess={handleUploadSuccess}
                                            uploadPreset="icehub_preset"
                                        />
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="p-8 pt-4 shrink-0 border-t border-gray-100 bg-gray-50 flex gap-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="blog-form"
                                disabled={isSubmitting}
                                className="flex-[2] px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Post'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
