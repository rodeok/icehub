
import { Laptop, Code2, TrendingUp, Sprout, Users, Briefcase, FolderGit2, Award } from 'lucide-react';

const learningItems = [
    {
        icon: Laptop,
        title: "High In-Demand Tech Skills",
        description: "Master cutting-edge technologies that employers are actively seeking.",
        gradient: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    {
        icon: Code2,
        title: "Hands-On Digital Training",
        description: "Learn by doing with practical projects and real-world applications.",
        gradient: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
        icon: TrendingUp,
        title: "Academic & Career Readiness",
        description: "Prepare comprehensively for both academic pursuits and career opportunities.",
        gradient: "bg-gradient-to-br from-emerald-400 to-green-600"
    },
    {
        icon: Sprout,
        title: "Personal Growth & Mindset Development",
        description: "Develop the soft skills and mindset needed for long-term success.",
        gradient: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
        icon: Users,
        title: "Access to Mentorship",
        description: "Connect with experienced professionals who guide your journey.",
        gradient: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
        icon: Briefcase,
        title: "Opportunities for Internships & Junior Roles",
        description: "Gain access to real job opportunities and internship placements.",
        gradient: "bg-gradient-to-br from-amber-400 to-orange-500"
    },
    {
        icon: FolderGit2,
        title: "Portfolio-Building Projects",
        description: "Create impressive projects that showcase your skills to employers.",
        gradient: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    {
        icon: Award,
        title: "Industry-Recognized Certification",
        description: "Earn certificates that validate your skills and enhance your resume.",
        gradient: "bg-gradient-to-br from-violet-500 to-purple-600"
    }
];

export default function WhatLearnPrep() {
    return (
        <section className="bg-white py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        What You Will <span className="text-[#1a73e8]">Learn</span>
                    </h2>
                    <div className="h-1.5 w-20 bg-[#1a73e8] mx-auto rounded-full mb-8"></div>

                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
                        Gain the skills, knowledge, and confidence to thrive in the digital age.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {learningItems.map((item, index) => (
                        <div
                            key={index}
                            className={`${item.gradient} rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
                        >
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm">
                                <item.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-lg font-bold mb-3 leading-tight min-h-[3rem] flex items-end">
                                {item.title}
                            </h3>

                            <p className="text-white/90 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
