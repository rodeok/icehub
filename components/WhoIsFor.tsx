import { GraduationCap, BookOpen, Lightbulb } from 'lucide-react';

const targets = [
    {
        icon: GraduationCap,
        title: "Secondary School Leavers",
        description: "Just finished secondary school and looking to build valuable skills before or during university."
    },
    {
        icon: BookOpen,
        title: "Students Preparing for JAMB",
        description: "Candidates preparing for university entrance who want to maximize their gap year productively."
    },
    {
        icon: Lightbulb,
        title: "Young People Figuring Out Their Next Step",
        description: "Anyone seeking clarity and direction while building practical skills for the future."
    }
];

export default function WhoIsFor() {
    return (
        <section className="bg-[#f8faff] py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        Who Is This <span className="text-[#1a73e8]">For</span> ?
                    </h2>
                    <div className="h-1.5 w-20 bg-[#1a73e8] mx-auto rounded-full mb-8"></div>

                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        NextGen Prep is designed for ambitious young people ready to take charge of their future.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {targets.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                        >
                            {/* Image Placeholder */}
                            <div className="w-full h-48 bg-gray-200 rounded-2xl mb-[-24px] relative z-0"></div>

                            {/* Icon */}
                            <div className="relative z-10 w-12 h-12 bg-[#1a73e8] rounded-xl flex items-center justify-center text-white text-2xl mb-6 shadow-md border-4 border-white">
                                <item.icon className="w-6 h-6" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4 px-2">
                                {item.title}
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed px-2 pb-4">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
