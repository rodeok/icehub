import Link from "next/link";
import Image from "next/image";

export default function FrontHero() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight !text-black sm:text-5xl md:text-6xl" style={{ color: '#000' }}>
                            Mastering Front-End
                            <br />
                            Web Development
                        </h1>

                        <p className="mt-8 text-lg leading-8 !text-black max-w-xl" style={{ color: '#000' }}>
                            Dive into the world of web development with our intensive in-person Front-End Web Development course.
                            This program is designed to eqip you with the essential skills to build dynamic, responsive,
                            and user-friendly websites. Through hands-on projects, expert mentorship, and curriculum focused
                            on modern frameworks and tools, you'll gain practical experience that prepares you for a
                            successful career in tech.
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
                                href="/apply"
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
                        About the Front-End Web Development Course
                    </h2>

                    <div className="space-y-8 text-lg leading-8 !text-black" style={{ color: '#000' }}>
                        <p>
                            Our Front-End Development course focuses on practical, project-based learning. You'll work on
                            real-world applications from day one, building a robust portfolio that showcases your abilities
                            to potential employers.
                        </p>
                        <p>
                            Our small class sizes ensure personalized attention, fostering a collaborative and supportive
                            learning environment. We emphasize not just coding, but also problem-solving, debugging,
                            and best practices in UI/UX to ensure you produce high-quality, maintainable code.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}