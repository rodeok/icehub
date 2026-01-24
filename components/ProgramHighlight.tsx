
import { Heart, Hand, Presentation, Building2, Users, Award, Star } from 'lucide-react';

export default function ProgramHighlight() {
    const highlights = [
        {
            icon: Heart,
            title: "Friendly Environment",
            description: "A welcoming and supportive space where every student feels valued",
            color: "bg-blue-600",
            shadow: "shadow-blue-200"
        },
        {
            icon: Hand, // Using Hand as a proxy for hands-on, or maybe Code/Wrench
            title: "Hands-On Learning",
            description: "Practical sessions where you learn by doing, not just watching",
            color: "bg-purple-600",
            shadow: "shadow-purple-200"
        },
        {
            icon: Presentation,
            title: "Expert Instructors",
            description: "Learn from experienced teachers who love working with young minds",
            color: "bg-green-600",
            shadow: "shadow-green-200"
        },
        {
            icon: Building2,
            title: "Modern Facilities",
            description: "State-of-the-art equipment and comfortable learning spaces",
            color: "bg-red-500",
            shadow: "shadow-red-200"
        },
        {
            icon: Users,
            title: "Small Groups",
            description: "Limited class sizes ensure personalized attention for every student",
            color: "bg-pink-600",
            shadow: "shadow-pink-200"
        },
        {
            icon: Award,
            title: "Certificates",
            description: "Earn recognized certificates upon successful program completion",
            color: "bg-yellow-500",
            shadow: "shadow-yellow-200"
        }
    ];

    return (
        <section className="bg-[#f8faff] py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto text-center">

                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
                    <Star className="w-4 h-4 fill-blue-600" />
                    <span>Why Choose Us</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-16">
                    Program Highlights
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlights.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-white mb-6 shadow-lg ${item.shadow}`}>
                                <item.icon className="w-8 h-8" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                {item.title}
                            </h3>

                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
