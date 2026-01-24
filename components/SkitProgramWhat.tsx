
import { FileText, Handshake, Laptop, Award, ArrowRight, Settings } from 'lucide-react'; // Using Settings as placeholder for Process icon if needed

export default function SkitProgramWhat() {
    const steps = [
        {
            number: 1,
            icon: FileText,
            title: "Register",
            description: "Fill out the simple registration form online",
            color: "bg-blue-100",
            itemColor: "bg-blue-600",
            textColor: "text-blue-600",
            arrowColor: "text-blue-400"
        },
        {
            number: 2,
            icon: Handshake,
            title: "Orientation",
            description: "Meet your instructors and fellow students",
            color: "bg-purple-100",
            itemColor: "bg-purple-600",
            textColor: "text-purple-600",
            arrowColor: "text-purple-400"
        },
        {
            number: 3,
            icon: Laptop,
            title: "Start Learning",
            description: "Dive into fun activities and exciting projects",
            color: "bg-green-100",
            itemColor: "bg-green-600",
            textColor: "text-green-600",
            arrowColor: "text-green-400"
        },
        {
            number: 4,
            icon: Award,
            title: "Get Certified",
            description: "Complete projects and earn your certificate",
            color: "bg-yellow-100",
            itemColor: "bg-yellow-600",
            textColor: "text-yellow-600",
            arrowColor: "text-yellow-400"
        }
    ];

    return (
        <section className="bg-white py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto text-center">

                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
                    {/* Design shows an icon resembling bars/process */}
                    <span className="text-lg">📊</span>
                    <span>Simple Process</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                    How the SKIT Program Works
                </h2>

                {/* Subtitle */}
                <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg mb-16">
                    Getting started is easy! Follow these simple steps to begin your tech journey
                </p>

                {/* Steps Container */}
                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch relative">

                    {steps.map((step, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center relative group">

                            {/* Card */}
                            <div className={`w-full h-full ${step.color} rounded-[2.5rem] p-8 flex flex-col items-center transition-transform hover:-translate-y-2 duration-300`}>

                                {/* Number Circle */}
                                <div className={`w-12 h-12 rounded-full ${step.itemColor} flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg`}>
                                    {step.number}
                                </div>

                                {/* Icon Box */}
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                                    <step.icon className={`w-8 h-8 ${step.textColor}`} strokeWidth={2.5} />
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed max-w-[150px]">
                                    {step.description}
                                </p>
                            </div>

                            {/* Arrow (Desktop only, not on last item) */}
                            {index < steps.length - 1 && (
                                <div className={`hidden md:flex absolute top-1/2 -right-6 lg:-right-8 -translate-y-1/2 z-10 ${step.arrowColor}`}>
                                    <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={3} />
                                </div>
                            )}
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}
