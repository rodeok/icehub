'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

type Testimonial = {
    name: string;
    role: string;
    content: string;
};

const testimonials: Testimonial[] = [
    {
        name: 'Mary J',
        role: 'Product Design Student',
        content:
            'Ice Hub gave me more than just tech skills — it gave me confidence. The hands-on projects and supportive community made learning exciting and pushed me to start my career in product design.',
    },
    {
        name: 'Mr. Amaechi',
        role: 'Frontend Tutor',
        content:
            'Teaching at Ice Hub has been incredibly rewarding. The focus on practical learning and mentorship allows tutors like me to guide students through real-world challenges and see them grow into confident tech professionals.',
    },
    {
        name: 'Emmanuel O.',
        role: 'Data Analytics Student',
        content:
            'Joining Ice Hub was the best decision I made this year. The mentors are approachable, the classes are practical, and I now have real projects in my portfolio to show employers.',
    },
];

export default function Testimonials() {
    return (
        <section className="relative w-full bg-[#FAFAFA] py-24 overflow-hidden">
            {/* Decorative dots */}
            <div className="absolute left-10 top-10 h-2 w-2 rounded-full bg-purple-500" />
            <div className="absolute left-24 top-24 h-3 w-3 rounded-full bg-green-500" />
            <div className="absolute left-16 top-44 h-2 w-2 rounded-full bg-blue-600" />
            <div className="absolute left-40 top-64 h-2 w-2 rounded-full bg-red-500" />

            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-wide !text-black">
                    TESTIMONIALS
                </h2>
                <p className="mt-4 max-w-2xl mx-auto !text-black">
                    Hear from the people who’ve experienced Ice Hub — students, mentors,
                    and partners sharing how our programs have shaped their growth and
                    success.
                </p>

                {/* Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-8 text-left shadow-lg"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 text-orange-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>

                            <p className="mt-6 !text-black leading-relaxed">
                                {item.content}
                            </p>

                            <div className="mt-6">
                                <p className="font-semibold !text-black">{item.name}</p>
                                <p className="text-sm !text-black">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <div className="mt-14 flex justify-center items-center gap-4">
                    <button className="flex h-10 w-10 items-center justify-center rounded bg-white shadow">
                        <ArrowLeft size={18} />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded bg-blue-600 text-white shadow">
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}
