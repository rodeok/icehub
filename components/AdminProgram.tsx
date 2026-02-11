'use client';

import React from 'react';
import {
    Layers,
    Video,
    FileText,
    Clock,
    BookOpen,
    Users,
    MoreVertical,
    ChevronRight,
    Search
} from 'lucide-react';
import Image from 'next/image';

const stats = [
    { label: 'TOTAL MODULES', value: '124', icon: Layers, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'VIDEO LESSONS', value: '842', icon: Video, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'RESOURCES', value: '2,410', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
];

const courses = [
    {
        title: 'Fullstack Web Development',
        weeks: '12 Weeks',
        modules: '8 Modules',
        students: '450 Students',
        status: 'IN PROGRESS',
        statusColor: 'text-blue-600',
        dotColor: 'bg-blue-600',
        image: '/images/icehub.png', // Placeholder, using available image
    },
    {
        title: 'UX/UI Design Foundations',
        weeks: '8 Weeks',
        modules: '6 Modules',
        students: '320 Students',
        status: 'ACTIVE',
        statusColor: 'text-green-600',
        dotColor: 'bg-green-600',
        image: '/images/icehub.png',
    },
    {
        title: 'Digital Literacy 101',
        weeks: '4 Weeks',
        modules: '4 Modules',
        students: '850 Students',
        status: 'ACTIVE',
        statusColor: 'text-green-600',
        dotColor: 'bg-green-600',
        image: '/images/icehub.png',
    },
    {
        title: 'Data Science Incubation',
        weeks: '24 Weeks',
        modules: '12 Modules',
        students: '180 Students',
        status: 'PLANNING',
        statusColor: 'text-gray-500',
        dotColor: 'bg-gray-400',
        image: '/images/icehub.png',
        badge: 'ADVANCED'
    },
];

export default function AdminProgram() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Programs & Courses</h1>
                    <p className="text-gray-500 mt-1">Create, edit and manage educational content and program structures.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    <span className="text-lg">+</span> New Program
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-blue-600 tracking-wider uppercase mb-0.5">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {courses.map((course, index) => (
                    <div key={index} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex h-full min-h-[220px]">
                        {/* Course Image */}
                        <div className="relative w-2/5 min-w-[200px] bg-gray-100 overflow-hidden">
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                            {course.badge && (
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest text-gray-900 shadow-sm">
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
                                <button className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:gap-2 transition-all group">
                                    Manage Course
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Expansion CTA */}
            <div className="bg-gray-50/50 rounded-[40px] border border-gray-100/50 p-12 text-center mt-12 flex flex-col items-center">
                <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                    <BookOpen size={36} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Ready to expand the curriculum?</h2>
                <p className="text-gray-500 mt-3 max-w-lg leading-relaxed font-medium">
                    Create specialized tracks for web, mobile, data science or design to reach more students.
                </p>
                <button className="mt-8 px-8 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                    Browse Course Templates
                </button>
            </div>
        </div>
    );
}
