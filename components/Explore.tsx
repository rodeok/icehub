import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const courses = [
    {
        title: "Front-End Web Development",
        description: "Build responsive, user-friendly websites using HTML, CSS, JavaScript, and modern frameworks to kickstart your tech career.",
        image: "/images/frontend.png",
        link: "#"
    },
    {
        title: "Back-End Development",
        description: "Learn to build powerful, scalable server-side applications using Python, Node.js, and databases that drive modern web platforms.",
        image: "/images/backend.png",
        link: "#"
    },
    {
        title: "Product (UI/UX) Design",
        description: "Learn to design intuitive, user-centered digital products using tools like Figma and design principles that make great user experiences.",
        image: "/images/product.png",
        link: "#"
    },
    {
        title: "Mobile-App Development",
        description: "Learn to create functional and engaging mobile apps for Android and iOS using modern frameworks and real-world projects.",
        image: "/images/mobile.png",
        link: "#"
    },
    {
        title: "Data Analytics",
        description: "Master the art of turning data into insights using tools like Excel, SQL, and Power BI to make smarter business decisions.",
        image: "/images/data.png",
        link: "#"
    },
    {
        title: "Graphic Design",
        description: "Learn to create stunning visuals and brand identities using tools like Photoshop, Illustrator, and Canva.",
        image: "/images/graphics.png", // Fallback reuse due to rate limit
        link: "#"
    },
    {
        title: "Cybersecurity",
        description: "Learn to protect systems and networks using modern cybersecurity tools, techniques, and real-world security projects.",
        image: "/images/cyber.png", // Fallback reuse due to rate limit
        link: "#"
    }
];

const Explore = () => {
    return (
        <div className="w-full bg-white py-20 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Explore Our <span className="text-[#0052CC]">Courses</span>
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                        Join our specialized programs crafted to make you job-ready. Each course combines real-world projects,
                        hands-on exercises, and expert mentorship to help you build the confidence and skills needed to excel in your career.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                    {course.description}
                                </p>
                                <a href={course.link} className="inline-flex items-center text-[#0052CC] text-sm font-semibold hover:underline mt-auto">
                                    Learn More
                                    <ArrowUpRight size={16} className="ml-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explore;
