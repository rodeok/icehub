import { ArrowUpRight, BadgeCheck, BookOpen, Briefcase, HandHelping } from "lucide-react";
import Link from "next/link";

export default function Choose() {
    const cards = [
        {
            title: "Collaborative Learning",
            description:
                "Learn with passionate peers in a vibrant tech space that fosters teamwork and creativity.",
            icon: BookOpen,
            color: "bg-blue-600",
            accent: "border-blue-600",
        },
        {
            title: "Mentorship",
            description:
                "You'll be paired with experienced mentors who guide you through every stage of your learning",
            icon: HandHelping,
            color: "bg-green-600",
            accent: "border-green-600",
        },
        {
            title: "Job Opportunity",
            description:
                "75% of our graduates get employed within 3 months of completing their training. Students leave from learning to getting jobs.",
            icon: Briefcase,
            color: "bg-red-600",
            accent: "border-red-600",
        },
        {
            title: "Certification",
            description:
                "You will earn a recognized certificate at the end of your program that validates your skills and gives you a competitive edge in the job market.",
            icon: BadgeCheck,
            color: "bg-pink-600",
            accent: "border-pink-600",
        },
    ];

    return (
        <section className="bg-white py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold !text-black">
                    Why Choose <span className="text-blue-600">Ice Hub</span>
                </h2>
                <p className="!text-black max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                    8 compelling reasons why Ice Hub is the right place to kick
                    <br className="hidden md:block" /> start your tech journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="group relative bg-[#F3FBFF] p-8 py-12 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                    >
                        {/* Colored line accent at bottom left */}
                        <div
                            className={`absolute bottom-0 left-8 w-24 h-1 rounded-t-full ${card.color}`}
                        ></div>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${card.color} shadow-lg shadow-gray-200/50`}
                            >
                                <card.icon className="w-8 h-8" strokeWidth={2} />
                            </div>

                            <h3 className="text-2xl font-bold !text-black">{card.title}</h3>

                            <p className="!text-black text-sm md:text-base leading-relaxed max-w-sm">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300"
                >
                    Show 4 More <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
