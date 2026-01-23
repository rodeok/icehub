import { FaCode, FaMousePointer, FaTabletAlt, FaCodeBranch, FaTh, FaLightbulb } from "react-icons/fa";

const learningItems = [
    {
        title: "Server-side Programming Fundamentals",
        description: "Learn how back-end systems works, how servers handle requests, and how data moves between the front-end and databases. (Languages: Python, Node.js, or PHP depending)",
        icon: FaCode
    },
    {
        title: "Building and Managing APIs",
        description: "Create powerful RESTful APIs that connect apps, websites, and mobile platforms enabling seamless data communication between systems.",
        icon: FaMousePointer
    },
    {
        title: "Authentication & Security",
        description: "Implement user authentication (login, signup, JWT tokens) and secure your applications using best practices for data protetion and encryption.",
        icon: FaTabletAlt
    },
    {
        title: "Version Control and collaboration",
        description: "Master Git and GitHub for version control, branching, merging, and collaborating on real-world software projects.",
        icon: FaCodeBranch
    },
    {
        title: "Database Design and Integration",
        description: "Understand relational (MySQL, PostgreSQL) and NoSQL (MongoDB) databases. Learn how to design efficient schemas and write optimized queries.",
        icon: FaTh
    },
    {
        title: "Deploying and Scaling Applications.",
        description: "Deploy your back-end projects to cloud platforms (like Render, AWS, or vercel). Learn continuous integration, scaling, and monitoring of live apps.",
        icon: FaLightbulb
    }
];

export default function WhatLearnBack() {
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
