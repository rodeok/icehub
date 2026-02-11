'use client';

import React from 'react';
import {
    Plus,
    Mail,
    MoreVertical,
    Star,
    ChevronRight,
    User as UserIcon
} from 'lucide-react';

const instructors = [
    {
        name: 'Mr Onyekachi',
        role: 'Mobile Development Instructor',
        students: '120',
        courses: '2',
        rating: '4.9',
        statusColor: 'bg-green-500',
        cohorts: ['FULLSTACK JAN', 'WEB APPS FEB'],
    },
    {
        name: 'Chimdindu Ezulike',
        role: 'UX/UI Design Mentor',
        students: '85',
        courses: '3',
        rating: '4.8',
        statusColor: 'bg-blue-500',
        cohorts: ['FULLSTACK JAN', 'WEB APPS FEB'],
    },
    {
        name: 'Miss Ogechukwu',
        role: 'Data Science Lead',
        students: '45',
        courses: '1',
        rating: '5',
        statusColor: 'bg-orange-500',
        cohorts: ['FULLSTACK JAN', 'WEB APPS FEB'],
    }
];

export default function AdminInstructor() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Instructors & Mentors</h1>
                    <p className="text-gray-500 mt-1">Manage your academic staff, assignments and performance metrics.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    <Plus size={18} strokeWidth={2.5} />
                    Hire Instructor
                </button>
            </div>

            {/* Instructors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructors.map((instructor, index) => (
                    <div key={index} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6">
                        {/* Instructor Header */}
                        <div className="flex justify-between items-start">
                            <div className="relative">
                                <div className="h-16 w-16 bg-gray-200 rounded-2xl border border-gray-50 overflow-hidden shadow-sm">
                                    <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-300">
                                        <UserIcon size={32} />
                                    </div>
                                </div>
                                <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-4 border-white ${instructor.statusColor}`} />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400">
                                    <Mail size={18} />
                                </button>
                                <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Name & Role */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">{instructor.name}</h3>
                            <p className="text-sm font-medium text-gray-400 mt-1">{instructor.role}</p>
                        </div>

                        {/* Stats Bar */}
                        <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-2xl p-4">
                            <div className="text-center">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Students</p>
                                <p className="text-sm font-bold text-gray-900">{instructor.students}</p>
                            </div>
                            <div className="text-center border-x border-gray-200/50">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Courses</p>
                                <p className="text-sm font-bold text-gray-900">{instructor.courses}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Rating</p>
                                <div className="flex items-center justify-center gap-1">
                                    <p className="text-sm font-bold text-gray-900">{instructor.rating}</p>
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
                                {instructor.cohorts.map((cohort, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-blue-50/50 rounded-lg text-[9px] font-black tracking-wider text-blue-600">
                                        {cohort}
                                    </span>
                                ))}
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
                <div className="p-6 rounded-[32px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center gap-4 py-12">
                    <div className="h-14 w-14 bg-blue-50/50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                        <UserIcon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Expand Your Team</h3>
                        <p className="text-xs font-medium text-gray-400 mt-2 max-w-[180px] mx-auto leading-relaxed">
                            Looking for industry experts to join Ice Hub as mentors?
                        </p>
                    </div>
                    <button className="mt-2 px-6 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-900 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
                        Post Job Opening
                    </button>
                </div>
            </div>
        </div>
    );
}
