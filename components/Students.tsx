'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
    Search,
    Filter,
    Download,
    UserPlus,
    Mail,
    MoreHorizontal,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Loader2,
    X,
    CheckCircle2,
    Trash2,
    Ban,
    UserCheck,
    Send,
    BookOpen
} from 'lucide-react';

export default function Students() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Edit Program Modal State
    const [isEditProgramModalOpen, setIsEditProgramModalOpen] = useState(false);
    const [editProgramData, setEditProgramData] = useState({ studentId: '', programId: '', cohort: '' });
    const [isEditingProgram, setIsEditingProgram] = useState(false);

    // Email Modal State
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [emailData, setEmailData] = useState({ to: '', subject: '', message: '' });
    const [sendingEmail, setSendingEmail] = useState(false);

    // Active dropdown state
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // For counts
    const [totalCount, setTotalCount] = useState(0);
    const [programs, setPrograms] = useState<any[]>([]);

    // Form state for adding student
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        id: '',
        password: '',
        programId: '',
        cohort: '',
        enrolledOn: new Date().toISOString().split('T')[0]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch('/api/programs');
                const data = await response.json();
                setPrograms(data.programs || []);
                if (data.programs?.length > 0) {
                    setFormData(prev => ({ ...prev, programId: data.programs[0]._id }));
                }
            } catch (err) {
                console.error('Failed to fetch programs');
            }
        };
        fetchPrograms();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                search,
                status: statusFilter
            });
            const response = await fetch(`/api/admin/students?${query}`);
            if (!response.ok) throw new Error('Failed to fetch students');
            const data = await response.json();
            setStudents(data.students);
            setTotalCount(data.total);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [search, statusFilter]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeDropdown && !(event.target as Element).closest('.actions-dropdown')) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);


    const handleExportCSV = () => {
        if (students.length === 0) return;

        const headers = ['Student', 'Email', 'ID', 'Program', 'Cohort', 'Enrolled On', 'Status'];
        const csvContent = [
            headers.join(','),
            ...students.map(s => [
                `"${s.name}"`,
                `"${s.email}"`,
                `"${s.id}"`,
                `"${s.program}"`,
                `"${s.cohort}"`,
                `"${s.enrolled}"`,
                `"${s.status}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `students_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleAddStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/admin/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to add student');
            }
            setIsAddModalOpen(false);
            fetchStudents();
            setFormData({
                name: '',
                email: '',
                id: '',
                password: '',
                programId: programs[0]?._id || '',
                cohort: '',
                enrolledOn: new Date().toISOString().split('T')[0]
            });
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenEditProgram = (student: any) => {
        setEditProgramData({
            studentId: student.userId || student.id,
            programId: programs.find(p => p.name === student.program)?._id || programs[0]?._id || '',
            cohort: student.cohort !== 'N/A' ? student.cohort : ''
        });
        setIsEditProgramModalOpen(true);
        setActiveDropdown(null);
    };

    const handleEditProgramSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditingProgram(true);
        try {
            const response = await fetch(`/api/admin/students/${editProgramData.studentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    programId: editProgramData.programId,
                    cohort: editProgramData.cohort || ''
                })
            });

            if (!response.ok) throw new Error('Failed to update program/cohort');
            setIsEditProgramModalOpen(false);
            fetchStudents();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsEditingProgram(false);
        }
    };

    const handleStatusChange = async (studentId: string, currentStatus: string) => {
        const newAction = currentStatus === 'ACTIVE' ? 'suspend' : 'activate';
        if (!window.confirm(`Are you sure you want to ${newAction} this student?`)) return;

        try {
            // Need the _id not the unique ID for database operations
            // Assuming we might need to adjust the API to return _id as well or handle lookup
            // For now attempting with the ID assuming route handles it or we pass _id
            // Ideally student object should have _id. Let's check api/admin/students/route.ts
            // The route returns mapped data, might not have raw _id. 
            // Better to include _id in the mapped response in route.ts, but let's try passing the student object's ID if it matches DB _id
            // Re-reading route.ts: id: student.uniqueCode || student._id...
            // If uniqueCode is set, we might not have _id. 
            // FIX: I will update the component to assume student object has a hidden realId or similar if needed, 
            // but let's try with the 'id' we have. If it fails, I'll need to update the API to return _id.
            // Actually, let's fix the API to return _id in the next step if needed. 
            // For now, let's assume I can pass the unique ID if I handle it in backend, OR
            // I should update the API to return userId: student._id.

            // Wait, I can't modify the API in this single tool call easily.
            // I will assume for now that I need to pass the student's DB ID.
            // Let's assume the API returns it as `_id` or I'll add it in valid student mapping.
            // In the GET route, I see it returns `id: student.uniqueCode || student._id...`. 
            // If I use uniqueCode for delete/patch it might fail if route expects objectId.
            // The route expects `ObjectId.isValid(id)`. So I MUST pass the ObjectId.
            // I should have updated the GET route to return `_id` separately.
            // For this step, I will add logic to fetch `_id` if missing or assume `id` IS `_id`. 
            // Actually, looking at the code I replaced: `id: student.uniqueCode || student._id...`.
            // If a student has a uniqueCode, `id` is NOT an ObjectId.
            // This will cause the DELETE/PATCH to fail.
            // Use `userId` which I'll add to the GET route shortly, or use `student.email` to find and delete?
            // No, DELETE route expects ID.

            // STRATEGY: I will modify the `fetchStudents` function in this file to NOT map the data inside the component if possible,
            // OR I will update the API to return `userId`.
            // Since I am editing `Students.tsx`, I can't enforce the API change here.
            // I will implement the frontend assuming `student.userId` exists and is passed.
            // I will update the API in a subsequent step to return `userId`.

            const response = await fetch(`/api/admin/students/${studentId}`, { // Passing student.userId here
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: newAction })
            });

            if (!response.ok) throw new Error('Failed to update status');
            fetchStudents();
            setActiveDropdown(null);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleDelete = async (studentId: string) => {
        if (!window.confirm('Are you sure you want to PERMANENTLY delete this student?')) return;

        try {
            const response = await fetch(`/api/admin/students/${studentId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete student');
            fetchStudents();
            setActiveDropdown(null);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleOpenEmail = (email: string) => {
        setEmailData({ to: email, subject: '', message: '' });
        setIsEmailModalOpen(true);
    };

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setSendingEmail(true);
        try {
            const response = await fetch('/api/admin/students/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailData)
            });

            if (!response.ok) throw new Error('Failed to send email');
            alert('Email sent successfully!');
            setIsEmailModalOpen(false);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSendingEmail(false);
        }
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
                    <p className="text-gray-500 mt-1">Manage all enrolled students, their progress and accounts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportCSV}
                        disabled={loading || students.length === 0}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        Export CSV
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                    >
                        <UserPlus size={18} />
                        Add Student
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="relative w-full lg:max-w-md">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email or ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-blue-100 outline-none transition-all"
                    />
                </div>
                <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-100">
                        <Filter size={18} />
                        Filters
                    </button>
                    <div className="h-6 w-px bg-gray-100 mx-2 hidden lg:block" />
                    <div className="flex items-center bg-gray-50 p-1 rounded-xl">
                        {['All', 'Active', 'Pending', 'Inactive'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === status ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ minHeight: '400px' }}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white border-b border-gray-50">
                                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Student</th>
                                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID</th>
                                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Program / Cohort</th>
                                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enrolled On</th>
                                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm`}>
                                                    {student.initial}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{student.name}</p>
                                                    <p className="text-xs text-gray-400">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-700">{student.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-700">{student.program}</p>
                                                <p className="text-xs text-gray-400">{student.cohort}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Calendar size={14} className="text-gray-400" />
                                                <span className="text-sm font-medium">{student.enrolled}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={student.status} />
                                        </td>
                                        <td className="px-6 py-4 relative">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleOpenEmail(student.email)}
                                                    className="p-2 hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-100 transition-all text-gray-400 hover:text-blue-600"
                                                    title="Send Email"
                                                >
                                                    <Mail size={16} />
                                                </button>

                                                <div className="relative actions-dropdown">
                                                    <button
                                                        onClick={() => setActiveDropdown(activeDropdown === student.id ? null : student.id)}
                                                        className={`p-2 rounded-lg border transition-all ${activeDropdown === student.id ? 'bg-gray-100 border-gray-200 text-gray-900' : 'border-transparent hover:bg-white hover:border-gray-100 text-gray-400 hover:text-gray-600'}`}
                                                    >
                                                        <MoreHorizontal size={16} />
                                                    </button>

                                                    {activeDropdown === student.id && (
                                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in duration-200">
                                                            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</p>
                                                            </div>
                                                            <button
                                                                onClick={() => handleOpenEditProgram(student)}
                                                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-blue-600 flex items-center gap-2 hover:bg-blue-50 transition-colors border-b border-gray-50"
                                                            >
                                                                <BookOpen size={14} />
                                                                Edit Program / Cohort
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(student.userId || student.id, student.status)}
                                                                className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors ${student.status === 'ACTIVE' ? 'text-orange-600' : 'text-green-600'}`}
                                                            >
                                                                {student.status === 'ACTIVE' ? (
                                                                    <>
                                                                        <Ban size={14} />
                                                                        Suspend Student
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <UserCheck size={14} />
                                                                        Activate Student
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(student.userId || student.id)}
                                                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 flex items-center gap-2 hover:bg-red-50 transition-colors"
                                                            >
                                                                <Trash2 size={14} />
                                                                Delete Student
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">
                                        No students found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-5 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400 font-medium">
                        Showing <span className="text-gray-900 font-bold">1-{students.length}</span> of <span className="text-gray-900 font-bold">{totalCount}</span> students
                    </p>
                    <div className="flex items-center gap-1">
                        <PaginationButton icon={<ChevronLeft size={18} />} disabled />
                        <PaginationButton label="1" active />
                        <PaginationButton icon={<ChevronRight size={18} />} disabled />
                    </div>
                </div>
            </div>

            {/* Email Modal */}
            {isEmailModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Send Email</h2>
                            <button onClick={() => setIsEmailModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        <form onSubmit={handleSendEmail} className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recipient</label>
                                <input
                                    type="email"
                                    value={emailData.to}
                                    disabled
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter subject"
                                    value={emailData.subject}
                                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Type your message here..."
                                    value={emailData.message}
                                    onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEmailModalOpen(false)}
                                    className="flex-1 px-6 py-3 border border-gray-100 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={sendingEmail}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {sendingEmail ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                    Send Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Student Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Add New Student</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        <form onSubmit={handleAddStudent} className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Student ID</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="ICE-2026-XXXX"
                                        value={formData.id}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="student@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                                    <input
                                        required
                                        type="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Program</label>
                                    <select
                                        required
                                        value={formData.programId}
                                        onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                    >
                                        <option value="" disabled>Select program</option>
                                        {programs.map(p => (
                                            <option key={p._id} value={p._id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cohort</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Fall 2026"
                                        value={formData.cohort}
                                        onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Enrolled On</label>
                                <input
                                    required
                                    type="date"
                                    value={formData.enrolledOn}
                                    onChange={(e) => setFormData({ ...formData, enrolledOn: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 px-6 py-3 border border-gray-100 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
                                    Add Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Program & Cohort Modal */}
            {isEditProgramModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Edit Program & Cohort</h2>
                            <button onClick={() => setIsEditProgramModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        <form onSubmit={handleEditProgramSubmit} className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Program</label>
                                <select
                                    required
                                    value={editProgramData.programId}
                                    onChange={(e) => setEditProgramData({ ...editProgramData, programId: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                >
                                    <option value="" disabled>Select program</option>
                                    {programs.map(p => (
                                        <option key={p._id} value={p._id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cohort</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Fall 2026"
                                    value={editProgramData.cohort}
                                    onChange={(e) => setEditProgramData({ ...editProgramData, cohort: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditProgramModalOpen(false)}
                                    className="flex-1 px-6 py-3 border border-gray-100 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isEditingProgram}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isEditingProgram ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatusToggle({ label, count, active = false }: { label: string, count?: number, active?: boolean }) {
    return (
        <button className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-gray-500 hover:text-gray-700'}`}>
            {label}
        </button>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        ACTIVE: 'bg-green-50 text-green-600',
        PENDING: 'bg-orange-50 text-orange-600',
        INACTIVE: 'bg-gray-100 text-gray-500',
        SUSPENDED: 'bg-red-50 text-red-600'
    };

    return (
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-wider ${styles[status]}`}>
            {status}
        </span>
    );
}

function PaginationButton({ label, icon, active = false, disabled = false }: { label?: string, icon?: React.ReactNode, active?: boolean, disabled?: boolean }) {
    return (
        <button
            disabled={disabled}
            className={`h-9 w-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${active
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                : disabled
                    ? 'text-gray-200 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
        >
            {label || icon}
        </button>
    );
}
