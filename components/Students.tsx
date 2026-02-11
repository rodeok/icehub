'use client';

import React from 'react';
import {
    Search,
    Filter,
    Download,
    UserPlus,
    Mail,
    MoreHorizontal,
    Calendar,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const studentsData = [
    {
        name: 'Sarah Connor',
        email: 'sarah.c@icehub.tech',
        id: 'STU001',
        program: 'Fullstack Bootcamp',
        cohort: 'Jan 2026',
        enrolled: 'Jan 5, 2026',
        status: 'ACTIVE',
        initial: 'S',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
    },
    {
        name: 'John Smith',
        email: 'j.smith@icehub.tech',
        id: 'STU002',
        program: 'UX Design Foundations',
        cohort: 'Feb 2026',
        enrolled: 'Feb 1, 2026',
        status: 'PENDING',
        initial: 'J',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
    },
    {
        name: 'Elena Rodriguez',
        email: 'elena.r@icehub.tech',
        id: 'STU003',
        program: 'Data Science Incubation',
        cohort: 'Jan 2026',
        enrolled: 'Jan 10, 2026',
        status: 'ACTIVE',
        initial: 'E',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
    },
    {
        name: 'Marcus Wright',
        email: 'm.wright@icehub.tech',
        id: 'STU004',
        program: 'Mobile App Bootcamp',
        cohort: 'Mar 2026',
        enrolled: 'Mar 12, 2026',
        status: 'INACTIVE',
        initial: 'M',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
    },
    {
        name: 'David Lee',
        email: 'd.lee@icehub.tech',
        id: 'STU005',
        program: 'Fullstack Bootcamp',
        cohort: 'Jan 2026',
        enrolled: 'Jan 5, 2026',
        status: 'ACTIVE',
        initial: 'D',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
    },
    {
        name: 'Lisa Ray',
        email: 'lisa.r@icehub.tech',
        id: 'STU006',
        program: 'Digital Literacy',
        cohort: 'Feb 2026',
        enrolled: 'Feb 15, 2026',
        status: 'ACTIVE',
        initial: 'L',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
    },
    {
        name: 'James Bond',
        email: '007@icehub.tech',
        id: 'STU007',
        program: 'Security Specialist',
        cohort: 'Jan 2026',
        enrolled: 'Jan 20, 2026',
        status: 'SUSPENDED',
        initial: 'J',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
    },
    {
        name: 'Diana Prince',
        email: 'diana.p@icehub.tech',
        id: 'STU008',
        program: 'UX Design Foundations',
        cohort: 'Feb 2026',
        enrolled: 'Feb 1, 2026',
        status: 'ACTIVE',
        initial: 'D',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
    }
];

export default function Students() {
    return (
        <div className="space-y-6 pb-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
                    <p className="text-gray-500 mt-1">Manage all enrolled students, their progress and accounts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
                        <Download size={18} />
                        Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
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
                        <StatusToggle label="All" count={1289} active />
                        <StatusToggle label="Active" />
                        <StatusToggle label="Pending" />
                        <StatusToggle label="Inactive" />
                    </div>
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
                            {studentsData.map((student, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-10 w-10 rounded-full ${student.bgColor} ${student.textColor} flex items-center justify-center font-bold text-sm`}>
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
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 transition-all text-gray-400 hover:text-blue-600">
                                                <Mail size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 transition-all text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-5 border-t border-gray-50 flex flex-col sm:row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400 font-medium">
                        Showing <span className="text-gray-900 font-bold">1-8</span> of <span className="text-gray-900 font-bold">1,289</span> students
                    </p>
                    <div className="flex items-center gap-1">
                        <PaginationButton icon={<ChevronLeft size={18} />} disabled />
                        <PaginationButton label="1" active />
                        <PaginationButton label="2" />
                        <PaginationButton label="3" />
                        <span className="px-2 text-gray-300">...</span>
                        <PaginationButton label="12" />
                        <PaginationButton icon={<ChevronRight size={18} />} />
                    </div>
                </div>
            </div>
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
