
import Link from "next/link";
import { Monitor, Smartphone, Cpu, Layout, ArrowRight } from "lucide-react";

const services = [
    {
        title: "Website Design & Development",
        description: "Custom, responsive websites built for performance, SEO, and user engagement",
        icon: Monitor,
        bgColor: "bg-[#eff6ff]", // Light blue
    },
    {
        title: "Mobile App Development",
        description: "Native iOS and Android apps with seamless functionality and beautiful interfaces.",
        icon: Smartphone,
        bgColor: "bg-[#f0f7ff]", // Very light blue
    },
    {
        title: "Custom Software Solutions",
        description: "Tailored enterprise software that solves complex business challenges efficiently.",
        icon: Cpu,
        bgColor: "bg-[#f5f3ff]", // Light purple
    },
    {
        title: "Digital Product Experiences",
        description: "End-to-end product design and development focused on user delight.",
        icon: Layout,
        bgColor: "bg-[#f0fdff]", // Light cyan
    },
];

export default function WebHero() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8 lg:py-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.1]">
                            Building High-Performing, <br />
                            <span className="text-[#1a73e8]">Scalable Design Solutions</span>
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
                            We design/build world-class websites, mobile apps, and custom software
                            solutions that accelerate growth, enhance efficiency, and elevate user experience.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center rounded-lg bg-[#1a73e8] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                            >
                                Request a Proposal
                            </Link>
                            <Link
                                href="#services"
                                className="inline-flex items-center rounded-lg border-2 border-[#1a73e8] bg-white px-8 py-3.5 text-base font-semibold text-[#1a73e8] transition hover:bg-blue-50"
                            >
                                Explore our Services
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Big grey placeholder card */}
                        <div className="aspect-square w-full rounded-[40px] bg-slate-200 lg:max-w-[550px] shadow-sm">
                            {/* Image placeholder content */}
                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                                <Monitor size={80} strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section id="services" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                        What We Do
                    </h2>
                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 leading-relaxed">
                        We specialize in building scalable, dynamic high-performing digital solutions
                        tailored to your business needs
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`${service.bgColor} rounded-3xl p-8 transition-transform hover:-translate-y-2 duration-300`}
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-[#1a73e8] shadow-sm">
                                <service.icon className="h-7 w-7" strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                {service.title}
                            </h3>
                            <p className="mt-4 text-sm leading-relaxed text-slate-600">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
