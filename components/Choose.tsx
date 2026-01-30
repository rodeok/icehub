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
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-blue-500">
                            <img src="/images/colab.png" alt="Collaborative Learning" className="h-8 w-8" />
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
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green-500">
                            <img src="/images/mentor.png" alt="Mentorship" className="h-8 w-8" />
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
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-red-500">
                            <img src="/images/job.png" alt="Job Opportunity" className="h-8 w-8" />
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
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-pink-500">
                            <img src="/images/cert.png" alt="Certification" className="h-8 w-8" />
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
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-indigo-500 text-white">
                            <Laptop className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Practical Projects</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Build real-world applications and gain hands-on experience through industry-standard development projects.
                        </p>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-orange-500 text-white">
                            <Briefcase className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Career Support</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Receive personalized career coaching, resume building sessions, and interview preparation to land your dream job.
                        </p>
                    </div>

                    {/* Card 7 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-purple-500 text-white">
                            <GraduationCap className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Modern Curriculum</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Stay ahead with a curriculum developed by industry experts, covering the latest technologies and best practices.
                        </p>
                    </div>

                    {/* Card 8 */}
                    <div className="bg-sky-50 rounded-2xl p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-teal-500 text-white">
                            <Globe className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Lifetime Community</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Join an exclusive network of tech professionals and alumni for ongoing support and networking opportunities.
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
