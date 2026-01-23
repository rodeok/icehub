import { FaCode, FaMousePointer, FaTabletAlt, FaCodeBranch, FaTh, FaLightbulb } from "react-icons/fa";

const learningItems = [
    {
        title: "User Research & Analysis",
        description: "Master techniques to understand user needs, behaviors, and motivations through surveys, interviews, and usability testing.",
        icon: FaCode
    },
    {
        title: "Wireframing & Prototyping",
        description: "Learn to translate research into tangible designs using industry-standard tools like Figma to create interactive prototypes.",
        icon: FaMousePointer
    },
    {
        title: "Information Architecture",
        description: "Design intuitive navigation and content structures that enhance user experience and accessibility for complex applications.",
        icon: FaTabletAlt
    },
    {
        title: "Interaction Design Principles",
        description: "Explore fundamental principles of interaction design, micro -interactions, and visual feedback to create engaging interfaces.",
        icon: FaCodeBranch
    },
    {
        title: "Usability Testing & Iteration",
        description: "Conduct effective usability tests, analyze results, and iterate on designs to refine and optimize user flows.",
        icon: FaTh
    },
    {
        title: "Portfolio Development",
        description: "Build a compelling portfolio of projects that showcases your design skills and thought process to potential emplyers.",
        icon: FaLightbulb
    }
];

export default function WhatLearnProduct() {
    return (
        <section className="bg-white py-20 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-3xl font-bold tracking-tight text-black text-center sm:text-4xl mb-16">
                    What You'll Learn in This Course
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {learningItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#f8f9fa] p-8 rounded-xl transition-shadow hover:shadow-md"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-black leading-tight">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-black leading-relaxed text-[15px]">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
