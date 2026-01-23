import { FaCode, FaMousePointer, FaTabletAlt, FaCodeBranch, FaTh, FaLightbulb } from "react-icons/fa";

const learningItems = [
    {
        title: "HTML, CSS & JavaScript Fundamentals",
        description: "Build a strong foundation in the core languages of web, mastering semantic HTML, styling with CSS, and interactive behaviors with JavaScript.",
        icon: FaCode
    },
    {
        title: "Responsive Design & UI/UX Principles",
        description: "Learn to create layouts that adapt seamlessly to all screens sizes and apply fundamental UI/UX principles for intuitive and engaging user experiences.",
        icon: FaMousePointer
    },
    {
        title: "Modern JavaScripts Frameworks (React)",
        description: "Gain proficiency in a popular front-end framework like React.js, building complex single-page applications with reusable components.",
        icon: FaTabletAlt
    },
    {
        title: "Version Control with Git & GitHub",
        description: "Understand essential collaborative development practices using Git for version control and GitHub for project hosting and teamwork.",
        icon: FaCodeBranch
    },
    {
        title: "API Integration & Data Handling",
        description: "Connect your front-end applications to back-end services, fetching and displaying data dynamically using RESTful APIs.",
        icon: FaTh
    },
    {
        title: "Testing & Debugging Strategies",
        description: "Develop skills in testing your code and efficiency debugging issues to ensure robust and error-free applications.",
        icon: FaLightbulb
    }
];

export default function WhatLearn() {
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
