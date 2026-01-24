
import { Code2, ShieldCheck, Zap, Layers, Users, HeartHandshake } from 'lucide-react';

const reasons = [
    {
        icon: Zap,
        title: "Fast & Responsive",
        description: "Lightning-fast, SEO-Optimized designs that rank higher and load instantly"
    },
    {
        icon: Layers,
        title: "Scalable Architecture",
        description: "Built to grow with your business, handling increased traffic and complexity"
    },
    {
        icon: Code2,
        title: "Seamless UX",
        description: "Intuitive interfaces designed for user engagement and satisfaction"
    },
    {
        icon: ShieldCheck,
        title: "Reliable and Secure",
        description: "Enterprise-grade security and reliability you can trust for your business"
    },
    {
        icon: Users,
        title: "Customer-Centric",
        description: "Collaborative development process focused on your vision and goals"
    },
    {
        icon: HeartHandshake,
        title: "Ongoing Support.",
        description: "Continuous maintenance and updates to keep your system running smoothly"
    }
];

export default function WebChoose() {
    return (
        <section className="bg-[#f3f4f6] py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto text-center">

                {/* Header */}
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                    Why Choose Us?
                </h2>

                <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg mb-16">
                    We build smart, modern, and responsive digital solutions tailored to your business
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-10 flex flex-col items-start text-left shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full"
                        >
                            <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center text-blue-600 mb-8">
                                <reason.icon className="w-6 h-6" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                {reason.title}
                            </h3>

                            <p className="text-slate-500 text-sm leading-relaxed">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
