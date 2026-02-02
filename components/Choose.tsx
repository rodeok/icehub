"use client";
import React, { useState } from "react";
import { GraduationCap, Users, Briefcase, Laptop, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseIceHub() {
    const [showMore, setShowMore] = useState(false);
    return (
        <section className="w-full pt-4 pb-10 bg-white border-t border-gray-50">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900">
                        Why Choose <span className="text-blue-600">Ice Hub</span>
                    </h2>
                    <p className="mt-2 text-gray-500">
                        8 compelling reasons why Ice Hub is the right place to kick start your tech journey.
                    </p>
                </motion.div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm"
                    >
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full">
                            <img src="/images/colab.png" alt="Collaborative Learning" className="h-17 w-17" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Collaborative Learning</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Learn with passionate peers in a vibrant tech space that fosters teamwork and creativity.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm"
                    >
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full ">
                            <img src="/images/mentor.png" alt="Mentorship" className="h-17 w-17" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Mentorship</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            You’ll be paired with experienced mentors who guide you through every stage of your learning.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm"
                    >
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full">
                            <img src="/images/job.png" alt="Job Opportunity" className="h-17 w-17" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Job Opportunity</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            75% of our graduates get employed within 3 months of completing their training. Students leave from learning to getting jobs.
                        </p>
                    </motion.div>

                    {/* Card 4 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm"
                    >
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full">
                            <img src="/images/cert.png" alt="Certification" className="h-17 w-17" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Certification</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            You will earn a recognized certificate at the end of your program that validates your skills and gives you a competitive edge in the job market.
                        </p>
                    </motion.div>
                </div>

                {/* Extra 4 Cards with Animation */}
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ease-in-out overflow-hidden ${showMore ? "mt-8 max-h-[2000px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
                        }`}
                >
                    {/* Card 5 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full  text-white">
                            <img src="/images/project-based.png" alt="Certification" className="h-17 w-17" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Project-based Learning</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Our hands-on programs mirror real industry challenges, helping you build practical, meaningful solutions.
                        </p>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full text-white">
                            <img src="/images/expert.png" alt="Certification" className="h-17 w-17" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Expert Instructors</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Learn from seasoned professionals and industry experts who share practical insights and personalized guidance in every session.
                        </p>
                    </div>

                    {/* Card 7 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full  text-white">
                            <img src="/images/physical.png" alt="Certification" className="h-17 w-17" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Physical and Virtual Class</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            You can choose to learn physically at our hub or join virtually from anywhere. Our flexible learning options ensure you never miss out, no matter your location or schedule.
                        </p>
                    </div>

                    {/* Card 8 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full text-white">
                            <img src="/images/community.png" alt="Certification" className="h-17 w-17" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Community Support</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            You’ll get free access to ICE Hub’s workspace and learning resources. Plus, our vibrant tech community supports your growth, collaboration, and innovation journey.
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => setShowMore(!showMore)}
                    className="mt-10 text-sm font-medium text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                    {showMore ? "Show Less ←" : "Show 4 More →"}
                </button>
            </div>
        </section>
    );
}
