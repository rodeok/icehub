
import { Brain, Info } from 'lucide-react';

export default function DigiLit() {
    const features = [
        {
            icon: Brain,
            title: "Hands-On Learning",
            description: "Learn by doing with practical exercises and real computer work that builds muscle memory and confidence."
        },
        {
            icon: Brain,
            title: "Beginner-Friendly",
            description: "Designed specifically for those with little to no computer experience. We start from the very beginning."
        },
        {
            icon: Brain,
            title: "Career Foundation",
            description: "The essential first step toward any tech career path or advanced digital skills training."
        }
    ];

    return (
        <section className="bg-white py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto text-center">

                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
                    <Info className="w-4 h-4" />
                    <span>About the Program</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                    What is Digital Literacy?
                </h2>

                {/* Description */}
                <p className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-16">
                    Digital Literacy at Ice Hub is your foundation for success in the modern world.
                    We teach you practical, real-world computer skills that build confidence and
                    open doors to endless opportunities in technology and beyond.
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#eef7ff] rounded-3xl p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300"
                        >
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
                                <feature.icon className="w-8 h-8" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                {feature.title}
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
