
import { Monitor, FileText, Globe, ShieldCheck, Mail, Briefcase, FolderOpen } from 'lucide-react';

export default function DigitaLearn() {
    const subjects = [
        {
            icon: Monitor,
            title: "Basic Computer Operations",
            description: "Using keyboard, mouse, and understanding how computers work",
            bgColor: "bg-blue-600",
            shadow: "shadow-blue-200"
        },
        {
            icon: FolderOpen, // Better fit for 'Operating Systems & Files' than Code tags
            title: "Operating Systems & Files",
            description: "Navigate Windows, organize files and folders efficiently",
            bgColor: "bg-purple-600",
            shadow: "shadow-purple-200"
        },
        {
            icon: ShieldCheck, // Better fit for 'Safety' than Palette
            title: "Internet & Online Safety",
            description: "Browse safely, protect your information, avoid online risks",
            bgColor: "bg-pink-600",
            shadow: "shadow-pink-200"
        },
        {
            icon: FileText, // Better fit for 'Productivity Tools' than Shield
            title: "Productivity Tools",
            description: "Create documents, spreadsheets, and presentations with confidence",
            bgColor: "bg-green-600",
            shadow: "shadow-green-200"
        },
        {
            icon: Mail,
            title: "Email & Communication",
            description: "Professional email etiquette and digital communication skills",
            bgColor: "bg-orange-500",
            shadow: "shadow-orange-200"
        },
        {
            icon: Briefcase,
            title: "Tech Career Pathways",
            description: "Introduction to different tech careers and next learning steps",
            bgColor: "bg-red-600",
            shadow: "shadow-red-200"
        }
    ];

    return (
        <section className="bg-[#f8faff] py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        What You'll Learn
                    </h2>

                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg text-center">
                        Master the fundamental computer skills that everyone needs in today's digital world
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subjects.map((subject, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-10 flex flex-col items-start shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-14 h-14 ${subject.bgColor} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg ${subject.shadow}`}>
                                <subject.icon className="w-7 h-7" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                {subject.title}
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed">
                                {subject.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
