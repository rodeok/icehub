"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { safeHref } from '@/utils/safeUrl';

const courses = [
    {
        title: "Front-End Web Development",
        description: "Build responsive, user-friendly websites using HTML, CSS, JavaScript, and modern frameworks.",
        image: "/images/frontend.png",
        link: "/courses/frontend"
    },
    {
        title: "Back-End Development",
        description: "Learn to build powerful mobile applications for iOS and Android.",
        image: "/images/mobile.png",
        link: "/courses/backend"
    },
    {
        title: "Product (UI/UX) Design",
        description: "Master user experience and product design principles + 1 month Internship.",
        image: "/images/product.png",
        link: "/courses/product-design"
    },
    {
        title: "Mobile-App Development",
        description: "Drive growth through effective online marketing and ads.",
        image: "/images/mobile.jpg",
        link: "/courses/mobile-dev"
    },
    {
        title: "Data Analytics",
        description: "Learn to build and manage professional websites with Wordpress.",
        image: "/images/frontend.png",
        link: "/courses/data-analytics"
    },
    {
        title: "Graphics Design",
        description: "Master the art of turning data into insights using tools like SQL and Power BI.",
        image: "/images/analysis.jpg",
        link: "/courses/graphics-design"
    },
    {
        title: "Cyber Security / Ethical Hacking",
        description: "Protect systems and networks from digital threats.",
        image: "/images/gggg.jpeg",
        link: "/courses/cyber-security"
    }
    ,
    {
        title: "Artificial Intelligence",
        description: "Master Machine Learning, Neural Networks, and Natural Language Processing to build future-ready AI solutions.",
        image: "/images/art.jpg",
        link: "/courses/artificial-intelligence"
    }
];

const Explore = () => {
    const [showAll, setShowAll] = useState(false);

    // Show first 6 courses initially, or all if showAll is true
    const displayedCourses = showAll ? courses : courses.slice(0, 6);

    return (
        <div className="w-full bg-white py-12 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold !text-black">
                        Explore Our <span className="text-[#0052CC]">Courses</span>
                    </h2>
                    <p className="!text-black max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                        Join our specialized programs crafted to make you job-ready. Each course combines real-world projects,
                        hands-on exercises, and expert mentorship to help you build the confidence and skills needed to excel in your career.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {displayedCourses.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover-lift hover-glow transition-[transform,box-shadow] duration-300 flex flex-col h-full group gpu"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow relative bg-white">
                                <h3 className="text-xl font-bold !text-black mb-3 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                                <p className="!text-black text-sm leading-relaxed mb-6 flex-grow">
                                    {course.description}
                                </p>
                                <a href={safeHref(course.link)} className="inline-flex items-center text-[#0052CC] text-sm font-bold mt-auto group/link">
                                    Learn More
                                    <ArrowUpRight size={18} className="ml-1 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Show More/Less Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-8 py-3 bg-[#0052CC] text-white font-semibold rounded-full hover:bg-[#0041a3] transition-colors shadow-lg"
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Explore;
