
import { Brain, Book, Rocket, Info } from 'lucide-react';

export default function SkitProgram() {
    const features = [
        {
            icon: Brain,
            title: "Skills",
            description: "Build practical digital skills that prepare you for the future",
            bgColor: "bg-blue-50",
            iconColor: "bg-blue-600",
            iconShadow: "shadow-blue-200"
        },
        {
            icon: Book,
            title: "Knowledge",
            description: "Learn how technology works and shapes our world",
            bgColor: "bg-purple-50",
            iconColor: "bg-purple-600",
            iconShadow: "shadow-purple-200"
        },
        {
            icon: Rocket,
            title: "Innovation",
            description: "Create amazing projects and bring your ideas to life",
            bgColor: "bg-green-50",
            iconColor: "bg-green-600",
            iconShadow: "shadow-green-200"
        }
    ];

    return (
        <section className="bg-white py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto text-center">

                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
                    <Info className="w-4 h-4" />
                    <span>About the Program</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                    What is the SKIT Program?
                </h2>

                {/* Description */}
                <p className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-16">
                    The SKIT Program (Skills, Knowledge, Innovation & Technology) is designed to
                    introduce young learners to foundational tech skills in a fun, hands-on
                    format. It helps children and teenagers develop digital literacy, creativity,
                    problem-solving abilities, and confidence in the world of technology.
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${feature.bgColor} rounded-3xl p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300`}
                        >
                            <div className={`w-16 h-16 ${feature.iconColor} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg ${feature.iconShadow}`}>
                                <feature.icon className="w-8 h-8" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                {feature.title}
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
