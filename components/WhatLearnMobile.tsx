import { FaCode, FaMousePointer, FaTabletAlt, FaCodeBranch, FaTh, FaLightbulb } from "react-icons/fa";

const learningItems = [
    {
        title: "Connecting to APIs and Databases",
        description: "Learn how to integrate your apps with real-world data, connecting to APIs, cloud storage, and databases like Firebase or MongoDB.",
        icon: FaCode
    },
    {
        title: "Building Cross-Platform Apps",
        description: "Learn to build high-performing mobile apps that run on both Andriod and iOS using modern frameworks like Flutter or React Native.",
        icon: FaMousePointer
    },
    {
        title: "Mobile App Development Fundamentals",
        description: "Understand how mobile apps works across different platforms (Andriod & iOS). Learn about app architecture, UI frameworks, and how front-end connects to back-end services.",
        icon: FaTabletAlt
    },
    {
        title: "State Management and Performance Optimization",
        description: "Master how to handle user data, manage app state  efficiently, and optimize performance for smooth animations and faster load times.",
        icon: FaCodeBranch
    },
    {
        title: "UI/UX for Mobile Interfaces",
        description: "Design and implement beautiful, responsive app interfaces. Understand layout, navigation, user interactions, and mobile accessibility best practices.",
        icon: FaTh
    },
    {
        title: "App Deployment and Publishing.",
        description: "Deploy your mobile apps to the Google Play Store and Apple App Store. Learn how to manage app versions, updates and real-user testing.",
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
