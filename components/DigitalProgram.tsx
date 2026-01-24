
import { Monitor, Code2, Palette } from 'lucide-react';

export default function DigitalProgram() {
    const audiences = [
        {
            icon: Monitor,
            title: "Absolute Beginners",
            description: "Never used a computer before? Perfect. We'll start from the very basics and build your skills step by step.",
            color: "bg-blue-600",
            shadow: "shadow-blue-200"
        },
        {
            icon: Code2,
            title: "Students & School Leavers",
            description: "Preparing for university or the workforce? Get the essential digital skills every employer expects.",
            color: "bg-purple-600",
            shadow: "shadow-purple-200"
        },
        {
            icon: Palette,
            title: "Career Changers",
            description: "Looking to enter the tech industry? This is your essential foundation before specialized training.",
            color: "bg-pink-600",
            shadow: "shadow-pink-200"
        }
    ];

    return (
        <section className="bg-white py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto text-center">

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                    Who This Program Is For
                </h2>

                {/* Subtitle */}
                <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg mb-16">
                    This program welcomes everyone ready to build their digital confidence
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {audiences.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-slate-50"
                        >
                            <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg ${item.shadow}`}>
                                <item.icon className="w-8 h-8" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                {item.title}
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
