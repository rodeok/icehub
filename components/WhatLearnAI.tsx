"use client";
import React from 'react';
import { CheckCircle2, Shield, Brain, Cpu, MessageSquare, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const modules = [
    {
        title: "Introduction to Machine Learning",
        description: "Master supervised and unsupervised learning algorithms like linear regression, classification, and clustering.",
        icon: Brain
    },
    {
        title: "Neural Networks & Deep Learning",
        description: "Dive into building and training deep neural networks using TensorFlow and PyTorch frameworks.",
        icon: Cpu
    },
    {
        title: "Natural Language Processing (NLP)",
        description: "Process text data, perform sentiment analysis, and build intelligent chatbots and modern language models.",
        icon: MessageSquare
    },
    {
        title: "Computer Vision & Image Processing",
        description: "Learn how to build systems that can see and understand images and video in real-time.",
        icon: Database
    },
    {
        title: "Large Language Models & GPT",
        description: "Build and fine-tune your own GPT-like models and integrate AI agents into your applications.",
        icon: CheckCircle2
    },
    {
        title: "AI Ethics & Future Trends",
        description: "Navigate the ethical landscape of AI and understand its impact on the future of society.",
        icon: Shield
    }
];

export default function WhatLearnAI() {
    return (
        <section className="py-24 bg-white px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight text-black sm:text-4xl mb-4"
                    >
                        What You Will <span className="text-[#0052CC]">Learn</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Our comprehensive curriculum is designed to give you both the theoretical foundation and practical skills needed for a successful career in AI.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {modules.map((module, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6 text-[#0052CC] group-hover:bg-[#0052CC] group-hover:text-white transition-colors">
                                <module.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4 group-hover:text-[#0052CC] transition-colors">{module.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {module.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
