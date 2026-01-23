import { FaCode, FaMousePointer, FaTabletAlt, FaCodeBranch, FaTh, FaLightbulb } from "react-icons/fa";

const learningItems = [
    {
        title: "Data Analysis Fundamental",
        description: "Understand what data analysis is, why it matters, and how businesses use data to make informed decisions. Learn the full data analysis workflow from collection to insights.",
        icon: FaCode
    },
    {
        title: "Excel and Spreadsheet Mastery",
        description: "Learn to clean, organize, and analyze data using Microsoft Excel and Google sheets. Create formulas, pivot tables, and charts for clear data visualization.",
        icon: FaMousePointer
    },
    {
        title: "Data Visualization and Storytelling",
        description: "Use tools like Power BI or Tableau to turn raw numbers into interactive dashboard and visuals that tell compelling data-driven stories.",
        icon: FaTabletAlt
    },
    {
        title: "Database Management and SQL",
        description: "Master SQL (Structured Query Language) to store, query, and manage large datasets efficiently. Understand how database power modern data systems.",
        icon: FaCodeBranch
    },
    {
        title: "Python for Data Analysis",
        description: "Get hands-on with python libraries like Pandas, NumPy, and Matplotlip to automate data cleaning, analysis, and visualization tasks.",
        icon: FaTh
    },
    {
        title: "Real-World Data Projects.",
        description: "Apply all your skills in practical projects, analyze business datasets, identify trends, and present actionable insights like a true data professional.",
        icon: FaLightbulb
    }
];

export default function WhatLearnData() {
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
