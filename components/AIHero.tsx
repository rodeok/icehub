"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';

export default function AIHero() {
    return (
        <div className="bg-white pt-20">
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl">
                            Artificial Intelligence
                            <br />
                            <span className="text-[#0052CC]">Masterclass</span>
                        </h1>

                        <p className="mt-8 text-lg leading-8 text-gray-700 max-w-xl">
                            Embark on a journey into the future of technology. Our Artificial Intelligence course is designed to take you from fundamentals to advanced concepts in Machine Learning, Neural Networks, and Deep Learning. Gain the skills needed to build intelligent systems and innovative solutions for the modern world.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-6 py-2 text-sm font-medium text-blue-700 border border-blue-100">
                                AI & ML
                            </span>
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-6 py-2 text-sm font-medium text-blue-700 border border-blue-100">
                                Hands-on Training
                            </span>
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-6 py-2 text-sm font-medium text-blue-700 border border-blue-100">
                                Future-Ready
                            </span>
                        </div>

                        <div className="mt-10">
                            <Link
                                href="/enroll?category=ai"
                                className="inline-block bg-[#0052CC] px-10 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#0041a3] transition-all rounded-lg"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/art.jpg"
                                alt="Artificial Intelligence Visualization"
                                width={800}
                                height={600}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -z-10 -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute -z-10 -bottom-8 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-gray-50 py-20 px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight text-black sm:text-4xl mb-12"
                    >
                        About the AI Course
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8 text-lg leading-8 text-gray-700"
                    >
                        <p>
                            Transition from a consumer of technology to a creator of intelligent systems. This course bridges the gap between theoretical knowledge and practical application, ensuring you're ready to tackle real-world challenges.
                        </p>
                        <p>
                            You'll work with industry-standard tools and libraries like Python, TensorFlow, and PyTorch. Our curriculum is constantly updated to reflect the latest advancements in GPT models, computer vision, and autonomous systems.
                        </p>
                    </motion.div>
            </div>
            </section >
        </div >
    );
}
