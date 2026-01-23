import { FaCode, FaMousePointer, FaTabletAlt, FaCodeBranch, FaTh, FaLightbulb } from "react-icons/fa";

const learningItems = [
    {
        title: "Design Principles & Visual Communication",
        description: "Understand the foundations of great design like balance, contrast, alignment, and hierarchy and how to communicate ideas visually and effectively.",
        icon: FaCode
    },
    {
        title: "Color Theory & Typography",
        description: "Learn how to chooos the right colors  and fonts to create strong, consistent, and visually appealing brand identities.",
        icon: FaMousePointer
    },
    {
        title: "Mastering Design Tools",
        description: "Gain hands-on experience with industry tools like Adobe Photoshop, Illustrator, and Canva to create professional graphics, mockups, and layouts.",
        icon: FaTabletAlt
    },
    {
        title: "Brand Identity & Logo Design",
        description: "Discover how to design brand assets such as logos, business cards, and marketing materials that tell a brands`s story and build recognition.",
        icon: FaCodeBranch
    },
    {
        title: "Social Media & Digital Content Design",
        description: "Create engaging visuals for social media campaigns, websites, and digital ads that grab attention and boost engagement.",
        icon: FaTh
    },
    {
        title: "Portfolio Development & Client Projects",
        description: "Build a professional design portfolio by completing real-world projects and learning how to present your work to clients or employers.",
        icon: FaLightbulb
    }
];

export default function WhatLearnMobile() {
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
