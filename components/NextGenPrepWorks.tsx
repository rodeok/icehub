
import { GraduationCap, Compass, Rocket, Globe, Users, Trophy } from 'lucide-react';

const features = [
    {
        icon: GraduationCap,
        title: "Designed for School Leavers & JAMB Candidates",
        description: "Tailored specifically for young people transitioning from secondary school into their next phase of life.",
        bgColor: "bg-blue-50",
    },
    {
        icon: Compass,
        title: "Builds Clarity, Direction & Confidence",
        description: "Gain the clarity and confidence needed to make informed decisions about your future career path.",
        bgColor: "bg-pink-50",
    },
    {
        icon: Rocket,
        title: "Prepares Youths for the Tech-Driven Future",
        description: "Learn the digital skills that are essential in today's rapidly evolving technological landscape.",
        bgColor: "bg-green-50",
    },
    {
        icon: Globe,
        title: "Access Local & Global Opportunities",
        description: "Connect with opportunities both within Nigeria and internationally through our network.",
        bgColor: "bg-yellow-50",
    },
    {
        icon: Users,
        title: "Blends Learning, Mentoring & Personal Development",
        description: "A holistic approach combining technical training with personal growth and mentorship.",
        bgColor: "bg-red-50",
    },
    {
        icon: Trophy,
        title: "Excellence-Driven Curriculum",
        description: "Industry-aligned training that prepares you for real-world challenges and opportunities.",
        bgColor: "bg-cyan-50",
    },
];

export default function NextGenPrepWorks() {
    return (
        <section className="bg-white py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        What is <span className="text-[#1a73e8]">NextGen Prep</span> ?
                    </h2>
                    <div className="h-1.5 w-20 bg-[#1a73e8] mx-auto rounded-full mb-8"></div>

                    <p className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                        NextGen Prep is a transformative program built exclusively for secondary school leavers and
                        JAMBites. The goal is to provide a solid foundation for academic, career, and personal success
                        through in-demand tech skills.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${feature.bgColor} rounded-3xl p-8 transition-transform hover:-translate-y-1 duration-300`}
                        >
                            <div className="w-14 h-14 bg-[#1a73e8] rounded-xl flex items-center justify-center mb-6 shadow-md text-white">
                                <feature.icon className="w-7 h-7" strokeWidth={2} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
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
