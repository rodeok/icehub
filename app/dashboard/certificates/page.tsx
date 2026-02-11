'use client';

import React from 'react';
import {
    Award,
    CheckCircle2,
    Circle,
    Download,
    Star,
    Share2
} from 'lucide-react';

export default function CertificatesPage() {
    const checklist = [
        { task: "Complete all 40 modules", completed: true },
        { task: "Submit all 15 assignments", completed: false },
        { task: "Maintain 80% attendance", completed: true },
        { task: "Pass final project assessment", completed: false }
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Course Certification</h1>
                <p className="text-gray-500 mt-1 font-medium text-sm">Track your eligibility for graduation and certificates</p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Progress Card */}
                <div className="lg:col-span-7 bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 lg:p-12 space-y-10">
                    <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                        <Award size={32} strokeWidth={1.5} />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-extrabold text-gray-900">Completion Progress</h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                            You're currently in the middle of your software development journey. Complete all requirements to unlock your digital certificate.
                        </p>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-6">
                        {checklist.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 group cursor-default">
                                {item.completed ? (
                                    <CheckCircle2 size={24} className="text-green-500 shrink-0" strokeWidth={2.5} />
                                ) : (
                                    <Circle size={24} className="text-gray-200 shrink-0 group-hover:text-blue-200 transition-colors" strokeWidth={2} />
                                )}
                                <span className={`text-sm font-bold ${item.completed ? 'text-gray-700' : 'text-gray-400'}`}>
                                    {item.task}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 space-y-4">
                        <button
                            disabled
                            className="w-full py-5 bg-gray-50 text-gray-400 rounded-[20px] text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 cursor-not-allowed group transition-all"
                        >
                            <Download size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                            Download Certificate
                        </button>
                        <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
                            Eligibility Status: 60% Completed
                        </p>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Preview Placeholder */}
                    <div className="aspect-[4/3] bg-blue-50/30 rounded-[32px] border-2 border-dashed border-blue-100 flex flex-col items-center justify-center p-8 text-center group hover:bg-blue-50/50 transition-all">
                        <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                            <Star size={32} className="text-blue-100" />
                        </div>
                        <p className="text-sm font-bold text-blue-200/80 max-w-[200px] leading-relaxed">
                            Certificate preview will be available once you graduate.
                        </p>
                    </div>

                    {/* Recognition Info Card */}
                    <div className="bg-blue-50/50 p-8 rounded-[32px] border border-blue-100 space-y-6">
                        <div className="flex items-center gap-3 text-blue-600">
                            <Share2 size={20} strokeWidth={2.5} />
                            <h3 className="text-sm font-black uppercase tracking-widest">Professional Recognition</h3>
                        </div>
                        <p className="text-xs text-blue-500 font-bold leading-relaxed">
                            Ice Hub certificates are globally recognized and can be added directly to your LinkedIn profile to boost your visibility to recruiters.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
