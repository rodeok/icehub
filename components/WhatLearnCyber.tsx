import { FaShieldAlt, FaLock, FaBullseye, FaNetworkWired, FaServer, FaLightbulb } from "react-icons/fa";

const learningItems = [
    {
        title: "Security Principles & Risk Management",
        description: "Understand the foundations of cybersecurity, including confidentiality, integrity, availability and how to protect systems and data effectively.",
        icon: FaShieldAlt
    },
    {
        title: "Security Fundamentals & Access Control",
        description: "Learn how to choose the right security tools and practices to create strong, consistent, and resilient digital defenses.",
        icon: FaLock
    },
    {
        title: "Mastering Cybersecurity Tools & Techniques",
        description: "Gain hands-on experience with industry-standard cybersecurity tools like Wireshark, Metasploit, and Nmap to analyze threats, secure systems, and protect networks.",
        icon: FaBullseye
    },
    {
        title: "Network Security & System Architecture",
        description: "Learn how to set up security measures, monitor networks, and protect systems to keep data safe and maintain organizational trust.",
        icon: FaNetworkWired
    },
    {
        title: "Cybersecurity Operations & Online Risk Management",
        description: "Learn to secure digital systems, monitor networks, and implement defenses that keep data safe and prevent cyber attacks.",
        icon: FaServer
    },
    {
        title: "Practical Security Labs & Real-World Projects",
        description: "Develop hands-on experience in cybersecurity through real-world projects, while learning how to showcase your skills and solutions to potential employers.",
        icon: FaLightbulb
    }
];

export default function WhatLearnCyber() {
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
