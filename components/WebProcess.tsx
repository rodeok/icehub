import { Lightbulb, PencilRuler, TestTube, Wrench } from "lucide-react";

const steps = [
    {
        title: "Planning & Consultation",
        description:
            "Understanding goals, brand needs, and requirements to create the project roadmap",
        icon: Lightbulb,
    },
    {
        title: "Design & Development",
        description:
            "Creating intuitive, beautiful UI/UX and building robust scalable solutions",
        icon: PencilRuler,
    },
    {
        title: "Testing & Deployment",
        description:
            "Ensuring scalability, speed, and reliability through rigorous quality assurance",
        icon: TestTube,
    },
    {
        title: "Maintenance & Support",
        description:
            "Keeping systems updated, optimized, and running smoothly with continuous care",
        icon: Wrench,
    },
];

export default function OurProcess() {
    return (
        <section className="w-full bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                        Our Process
                    </h2>
                    <p className="mt-2 text-gray-500">
                        A proven methodology that delivers exceptional result every time
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative text-center">
                                {/* Connector line */}
                                {index !== steps.length - 1 && (
                                    <div className="hidden md:block absolute top-[34px] left-[60%] w-full h-[2px] bg-blue-600" />
                                )}

                                {/* Icon */}
                                <div className="mx-auto mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-blue-600">
                                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                                </div>

                                {/* Text */}
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
