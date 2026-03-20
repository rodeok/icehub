import React from 'react';
import Footer from "@/components/Footer";
import AIHero from "@/components/AIHero";
import WhatLearnAI from "@/components/WhatLearnAI";
import CourseScheduleAI from "@/components/CourseScheduleAI";

export const metadata = {
    title: 'Artificial Intelligence - ICEHUB',
    description: 'Master Machine Learning, Deep Learning and NLP at ICEHUB AI Masterclass.',
};

export default function AICoursePage() {
    return (
        <main className="relative min-h-screen bg-white">
            <AIHero />
            <WhatLearnAI />
            <CourseScheduleAI />
            <Footer />
        </main>
    );
}
