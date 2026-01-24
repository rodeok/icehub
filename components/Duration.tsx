
import { Clock } from 'lucide-react';

export default function Duration() {
    const steps = [
        { number: 1, title: "Onboarding", progress: "w-[10%]" },
        { number: 2, title: "Fundamentals", progress: "w-[30%]" },
        { number: 3, title: "Skill Building", progress: "w-[50%]" },
        { number: 4, title: "Projects", progress: "w-[70%]" },
        { number: 5, title: "Portfolio", progress: "w-[85%]" },
        { number: 6, title: "Career Prep", progress: "w-[100%]" },
    ];

    return (
        <section className="relative w-full bg-[#1a73e8] py-20 overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Program Duration
                    </h2>
                    <div className="h-1.5 w-20 bg-white mx-auto rounded-full"></div>
                </div>

                {/* Glass Card */}
                <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/20 shadow-2xl">
                    <div className="flex flex-col items-center text-center">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-2 text-white font-semibold mb-8 backdrop-blur-sm border border-white/10">
                            <Clock className="w-5 h-5" />
                            <span>6 Months</span>
                        </div>

                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                            Intensive Training Program
                        </h3>

                        <p className="text-white/80 text-lg mb-12 max-w-2xl">
                            A comprehensive journey from beginner to job-ready professional
                        </p>

                        {/* Timeline Steps */}
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full mb-16">
                            {steps.map((step) => (
                                <div key={step.number} className="bg-white/10 rounded-xl p-4 flex flex-col items-center border border-white/10 hover:bg-white/20 transition-colors">
                                    <span className="text-3xl font-bold text-white mb-2">{step.number}</span>
                                    <span className="text-white/90 text-sm font-medium mb-3 whitespace-nowrap">{step.title}</span>
                                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div className={`h-full bg-white rounded-full ${step.progress}`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"></div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-center">
                            <div>
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">24</div>
                                <div className="text-white/70 font-medium">Weeks of Learning</div>
                            </div>
                            <div className="md:border-x border-white/10">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">150+</div>
                                <div className="text-white/70 font-medium">Hours of Training</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">10+</div>
                                <div className="text-white/70 font-medium">Real Projects</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
