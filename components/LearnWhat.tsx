
import { Monitor, Code2, Palette, ShieldCheck, MessageCircle, Users } from 'lucide-react';

export default function LearnWhat() {
    const subjects = [
        {
            icon: Monitor,
            title: "Basic Computer Skills",
            description: "Master essential computer operations, typing, and file management",
            bgColor: "bg-blue-50",
            iconColor: "bg-blue-600",
            iconShadow: "shadow-blue-200"
        },
        {
            icon: Code2,
            title: "Coding Fundamentals",
            description: "Learn programming basics through fun games and interactive projects",
            bgColor: "bg-purple-50",
            iconColor: "bg-purple-600",
            iconShadow: "shadow-purple-200"
        },
        {
            icon: Palette,
            title: "Graphics & Creativity",
            description: "Design amazing visuals using digital art and creativity tools",
            bgColor: "bg-pink-50",
            iconColor: "bg-pink-600",
            iconShadow: "shadow-pink-200"
        },
        {
            icon: ShieldCheck,
            title: "Internet Safety",
            description: "Stay safe online and learn responsible digital citizenship",
            bgColor: "bg-green-50",
            iconColor: "bg-green-600",
            iconShadow: "shadow-green-200"
        },
        {
            icon: MessageCircle,
            title: "Digital Communication",
            description: "Learn effective online communication and collaboration skills",
            bgColor: "bg-orange-50",
            iconColor: "bg-orange-500",
            iconShadow: "shadow-orange-200"
        },
        {
            icon: Users,
            title: "Teamwork & Problem-Solving",
            description: "Work on group projects and develop critical thinking skills",
            bgColor: "bg-red-50",
            iconColor: "bg-red-600",
            iconShadow: "shadow-red-200"
        }
    ];

    return (
        <section className="bg-white py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    {/* Pill Badge */}
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        <span className="text-lg">🎓</span>
                        <span>Curriculum</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        What You'll Learn
                    </h2>

                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
                        Explore exciting tech skills through fun, hands-on activities designed for young learners
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subjects.map((subject, index) => (
                        <div
                            key={index}
                            className={`${subject.bgColor} rounded-[2rem] p-8 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 flex flex-col items-start`}
                        >
                            <div className={`w-14 h-14 ${subject.iconColor} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg ${subject.iconShadow}`}>
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
