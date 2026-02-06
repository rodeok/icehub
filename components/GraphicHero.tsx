import Link from "next/link";
import Image from "next/image";

export default function BackHero() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight !text-black sm:text-5xl md:text-6xl" style={{ color: '#000' }}>
                            Mastering Graphic Design: Visual Communication & Creativity


                        </h1>

                        <p className="mt-8 text-lg leading-8 !text-black max-w-xl" style={{ color: '#000' }}>
                            Unlock your creative potential and build a stunning portfolio with our hands-on Graphic Design program. Learn industry-standard software, master design principles, and receive personalized mentorship to launch your career as a professional designer.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <span className="inline-flex items-center rounded-full border border-blue-600 px-6 py-2 text-sm font-medium text-blue-600">
                                In-Person Class
                            </span>
                            <span className="inline-flex items-center rounded-full border border-blue-600 px-6 py-2 text-sm font-medium text-blue-600">
                                Hands-on Learning
                            </span>
                            <span className="inline-flex items-center rounded-full border border-blue-600 px-6 py-2 text-sm font-medium text-blue-600">
                                Real-World Projects
                            </span>
                        </div>

                        <div className="mt-10">
                            <Link
                                href="/enroll?category=graphics-design"
                                className="inline-block bg-[#1a73e8] px-10 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/frontend1.png" // Placeholder path, user may need to provide actual image
                                alt="Developers working"
                                width={800}
                                height={600}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-[#f8f9fa] py-20 px-6 lg:px-8 mt-12">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight !text-black sm:text-4xl mb-12" style={{ color: '#000' }}>
                        Course Overview
                    </h2>

                    <div className="space-y-8 text-lg leading-8 !text-black" style={{ color: '#000' }}>
                        <p>
                            Our Graphic Design course is structured to transform aspiring creatives into industry-ready professionals. We emphasize practical design projects, visual thinking, and collaborative creative problem-solving.
                            <br />
                            This program dives deep into the core principles of graphic design, covering everything from visual fundamentals and layout to branding, typography, and production. You will learn how to translate ideas into compelling visuals, define clear design goals, explore creative concepts, and deliver polished designs that meet both client needs and business objectives.
                            <br />
                            Our curriculum is constantly updated to reflect the latest trends and technologies in the design industry, ensuring you gain relevant and in-demand skills.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}