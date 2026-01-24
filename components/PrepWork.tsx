
import { FileText, UserPlus, MonitorPlay, Share2, Handshake } from 'lucide-react';

const steps = [
    {
        number: 1,
        title: "Apply for the Program",
        description: "Fill out our simple application form and tell us about yourself. We review applications on a rolling basis and get back to you within 48 hours.",
        icon: FileText
    },
    {
        number: 2,
        title: "Get Onboarded into the Learning Track",
        description: "Once accepted, you'll be welcomed into your cohort and assigned a learning track based on your interests and goals.",
        icon: UserPlus
    },
    {
        number: 3,
        title: "Begin Skill Training & Mentorship",
        description: "Start your hands-on learning journey with expert instructors and dedicated mentors who guide you every step of the way.",
        icon: MonitorPlay
    },
    {
        number: 4,
        title: "Work on Real-World Projects",
        description: "Apply your skills to actual projects that solve real problems and build an impressive portfolio that showcases your abilities.",
        icon: Share2
    },
    {
        number: 5,
        title: "Access Opportunities & Guidance",
        description: "Graduate with access to internships, job placements, and ongoing career support to launch your professional journey.",
        icon: Handshake
    }
];

export default function Prep() {
    return (
        <section className="bg-slate-50 py-20 px-4 md:px-8 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        How NextGen Prep <span className="text-[#1a73e8]">Works</span>
                    </h2>
                    <div className="h-1.5 w-20 bg-[#1a73e8] mx-auto rounded-full mb-8"></div>

                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
                        Your journey from application to career opportunities in 5 simple steps
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Dashed Center Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-slate-300 -translate-x-1/2 hidden md:block" />

                    <div className="space-y-12 md:space-y-24 relative z-10">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={step.number} className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">

                                    {/* Content Card - Left for Even, Right for Odd (on Desktop) */}
                                    <div className={`w-full md:w-5/12 ${isEven ? 'md:order-1 md:text-right md:pr-12' : 'md:order-3 md:text-left md:pl-12'}`}>
                                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 relative group">
                                            {/* Mobile Number Badge (visible only on mobile) */}
                                            <div className="md:hidden absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1a73e8] flex items-center justify-center text-white font-bold border-4 border-slate-50 shadow-sm">
                                                {step.number}
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-4 pt-4 md:pt-0">
                                                {step.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Central Number Badge - Desktop Only */}
                                    <div className="hidden md:flex md:order-2 w-2/12 justify-center relative">
                                        <div className="w-14 h-14 rounded-full bg-[#1a73e8] flex items-center justify-center text-white text-xl font-bold shadow-lg ring-8 ring-slate-50 relative z-10 transition-transform hover:scale-110 duration-300">
                                            {step.number}
                                        </div>
                                    </div>

                                    {/* Icon Placeholder - Right for Even, Left for Odd (on Desktop) */}
                                    <div className={`w-full md:w-5/12 flex justify-center ${isEven ? 'md:order-3 md:justify-start md:pl-12' : 'md:order-1 md:justify-end md:pr-12'}`}>
                                        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#1a73e8] flex items-center justify-center shadow-inner">
                                            <step.icon className="w-8 h-8" strokeWidth={2} />
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
