
import { Baby, GraduationCap, Sprout, Flame, Users } from 'lucide-react';

export default function KidsPerfect() {
    const groups = [
        {
            icon: Baby, // Or User if Baby looks too young, but design has a child-like icon
            title: "Kids (Ages 8-12)",
            description: "Perfect for young explorers who are curious about how computers and technology work. No experience needed!",
            color: "bg-blue-600",
            shadow: "shadow-blue-200"
        },
        {
            icon: GraduationCap,
            title: "Teens (Ages 13-17)",
            description: "Ideal for teenagers ready to dive deeper into coding, design, and digital creativity with hands-on projects.",
            color: "bg-purple-600",
            shadow: "shadow-purple-200"
        },
        {
            icon: Sprout,
            title: "Complete Beginners",
            description: "No prior tech experience? No problem! We start from the basics and build up your confidence step by step.",
            color: "bg-green-600",
            shadow: "shadow-green-200"
        },
        {
            icon: Flame,
            title: "Tech Enthusiasts",
            description: "Young learners who are curious about technology and want to explore digital skills in a fun environment.",
            color: "bg-orange-500", // Adjusted to match the reddish-orange in design
            shadow: "shadow-orange-200"
        }
    ];

    return (
        <section className="bg-[#f8faff] py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-6xl mx-auto text-center">

                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
                    <Users className="w-4 h-4" />
                    <span>Who Can Join</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-16">
                    This Program is Perfect For
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {groups.map((group, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-8 md:p-10 flex flex-col items-start text-left shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-16 h-16 ${group.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg ${group.shadow}`}>
                                <group.icon className="w-8 h-8" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                {group.title}
                            </h3>

                            <p className="text-slate-500 text-base leading-relaxed">
                                {group.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
