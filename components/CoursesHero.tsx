import Link from "next/link";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function CoursesHero() {
    return (
        <section className="relative w-full overflow-hidden bg-white pt-32 pb-16 lg:pt-40 lg:pb-24">
            {/* Background Decorative Element */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-blue-50/50 -z-10 skew-x-[-15deg] translate-x-1/2" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid gap-16 lg:grid-cols-2 items-center">

                    {/* Left Column: Text Content */}
                    <div className="max-w-2xl">
                        {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0D55BA] text-sm font-bold mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D55BA]"></span>
                            </span>
                            Explore Our Programs
                        </div> */}

                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight text-black leading-[1.1]">
                            <span className="whitespace-nowrap">Master the Digital</span> <br />
                            World with Our <br />
                            <span className="text-[#0D55BA]">Expert Led</span> <br />
                            Courses
                        </h1>

                        <p className="mt-8 text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl font-medium">
                            From frontend development to cybersecurity, gain the skills that industry leaders demand. Join a community of innovators and start your transformation today.
                        </p>

                        <div className="mt-10 flex flex-row items-center gap-5 w-fit">
                            <Link
                                href="/register"
                                className="group inline-flex items-center justify-center gap-3 h-14 bg-[#07357A] px-10 text-base font-bold text-white shadow-xl hover:bg-[#05285d] transition-all rounded-xl whitespace-nowrap"
                            >
                                Get Started
                                <HiArrowNarrowRight className="text-2xl transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="#courses-list"
                                className="inline-flex items-center justify-center h-14 px-10 text-base font-bold text-[#07357A] border-2 border-[#07357A]/10 hover:border-[#07357A] transition-all rounded-xl whitespace-nowrap"
                            >
                                View All Courses
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: AI Image */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] w-full rounded-[40px] overflow-hidden shadow-2xl group border-8 border-white">
                            <Image
                                src="/images/courseshero.png"
                                alt="Modern tech learning at Ice Hub"
                                fill
                                priority
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Overlay tag */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20">
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center overflow-hidden">
                                                <Image src={`/images/${i}.png`} alt="student" width={40} height={40} className="object-cover h-full w-full" />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Join Over</p>
                                        <p className="text-sm font-extrabold text-[#0D55BA]">1,000+ Success Stories</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background shapes */}
                        <div className="absolute -top-10 -right-10 h-40 w-40 bg-[#0D55BA]/5 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-blue-400/10 rounded-full blur-3xl -z-10" />
                    </div>

                </div>
            </div>
        </section>
    );
}
