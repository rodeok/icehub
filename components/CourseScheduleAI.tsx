"use client";
import React from 'react';
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from 'framer-motion';

export default function CourseScheduleAI() {
    return (
        <section className="bg-white py-24 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold tracking-tight text-black text-center sm:text-4xl mb-16"
                >
                    Course Schedule & Location
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                    {/* Weekly Schedule Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-3xl p-10 shadow-sm border border-gray-100"
                    >
                        <h3 className="text-2xl font-bold text-black text-center mb-10">
                            Weekly Schedule
                        </h3>

                        <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 border-b border-gray-200 pb-4">
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Time</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Topic Focus</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4">
                                <div>
                                    <p className="font-bold text-black">Tue & Thu:</p>
                                    <p className="text-[#0052CC] font-bold">4 PM - 7 PM</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-gray-700 font-medium">Machine Learning Theory & Practice</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4">
                                <div>
                                    <p className="font-bold text-black">Sat:</p>
                                    <p className="text-[#0052CC] font-bold">11 AM - 3 PM</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-gray-700 font-medium">Deep Learning Lab & GPU Computing</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4">
                                <div>
                                    <p className="font-bold text-black">Flexible:</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-gray-700 font-medium">Capston Project & 1-on-1 Mentorship</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Our Hub Location Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-3xl p-10 shadow-sm border border-gray-100 flex flex-col"
                    >
                        <h3 className="text-2xl font-bold text-black text-center mb-6">
                            Our Hub Location
                        </h3>

                        <p className="text-center text-gray-700 mb-10 max-w-md mx-auto leading-relaxed">
                            No 270, Old Onitsha Road, Bethel Building, Opposite Anglican Girls
                            Secondary School Junction, Uruagu (Nnewi), Anambra State,
                            Nigeria.
                        </p>

                        <div className="flex-grow flex items-end justify-center pb-4 relative h-48">
                            <div className="relative w-full max-w-xs mx-auto h-40">
                                <svg
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                                    width="120"
                                    height="120"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="20" y="45" width="60" height="45" fill="#0052CC" rx="2" />
                                    <path d="M10 45 L50 15 L90 45 Z" fill="#FF5A5F" />
                                    <rect x="42" y="65" width="16" height="25" fill="#FFC107" rx="2" />
                                    <rect x="28" y="52" width="12" height="12" fill="white" rx="1" />
                                    <rect x="60" y="52" width="12" height="12" fill="white" rx="1" />
                                </svg>
                                <FaMapMarkerAlt className="text-[#FF5A5F] text-4xl absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center bg-blue-600 rounded-3xl p-16 shadow-xl"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                        Ready to Build the Future?
                    </h2>
                    <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-10">
                        Join the Artificial Intelligence masterclass and start building intelligent solutions today. Our specialized instructors are ready to guide you from zero to expertise.
                    </p>
                    <Link
                        href="/apply?course=ai"
                        className="inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-blue-600 shadow-lg hover:bg-gray-50 transition-all hover:scale-105"
                    >
                        Apply Now
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
