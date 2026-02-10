import Image from 'next/image';
import { GraduationCap, BookOpen, Lightbulb } from 'lucide-react';

const targets = [
    {
        icon: GraduationCap,
        title: "Secondary School Leavers",
        image: "/images/sec.jpg",
        description: "Just finished secondary school and looking to build valuable skills before or during university."
    },
    {
        icon: BookOpen,
        title: "Students Preparing for JAMB",
        image: "/images/stu.jpg",
        description: "Candidates preparing for university entrance who want to maximize their gap year productively."
    },
    {
        icon: Lightbulb,
        title: "Young People Figuring Out Their Next Step",
        image: "/images/young.jpg",
        description: "Anyone seeking clarity and direction while building practical skills for the future."
    }
];

export default function WhoIsFor() {
    return (
        <section className="bg-[#f8faff] py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 !text-black">
                        Who Is This <span className="text-[#1a73e8]">For</span> ?
                    </h2>
                    <div className="h-1.5 w-20 bg-[#1a73e8] mx-auto rounded-full mb-8"></div>

                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed !text-slate-500">
                        NextGen Prep is designed for ambitious young people ready to take charge of their future.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {targets.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center pt-0 overflow-hidden"
                        >
                            {/* Image Container */}
                            <div className="w-full h-56 relative mb-[-24px] z-0 -mx-8 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>
                            </div>

                            {/* Icon */}
                            <div className="relative z-10 w-14 h-14 bg-[#1a73e8] rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg border-4 border-white transition-transform group-hover:scale-110">
                                <item.icon className="w-7 h-7" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4 px-2 !text-black">
                                {item.title}
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed px-2 pb-4 !text-slate-500">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
