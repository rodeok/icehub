
import { Search, ArrowRight, Share2, Users, Handshake, Globe } from "lucide-react";
import Image from "next/image";

const filters = ["All Projects", "Completed", "Ongoing", "Community", "Tech", "Education"];

const projects = [
    {
        title: "Chowflex",
        description: "A real-world food ordering app project by Ice Hub, showcasing how young innovators use modern tech to solve everyday problems through practical, user-centered design.",
        tags: ["Ecommerce", "Completed"],
        image: "/images/ChowflexPage.png",
    },
    {
        title: "Brandyeast",
        description: "Helping brands grow online through strategic digital positioning, creative storytelling, and data-driven growth solutions that build visibility, engagement, and long-term impact.",
        tags: ["Community", "Ongoing"],
        image: "/images/BrandyeastLogo.png",
    },
    {
        title: "Download Tech Event",
        description: "A community-driven tech event designed to connect innovators, creatives, and local businesses, fostering collaboration, knowledge sharing, and growth within the local tech ecosystem.",
        tags: ["Tech", "Ongoing"],
        image: "/images/DownloadTechEvent.png",
    },
];

const impacts = [
    {
        icon: Share2,
        value: "42+",
        label: "Projects Completed"
    },
    {
        icon: Users,
        value: "2,500+",
        label: "Youth Impacted"
    },
    {
        icon: Handshake,
        value: "85+",
        label: "Community Partners"
    },
    {
        icon: Globe,
        value: "15+",
        label: "Cities Reached"
    }
];

export default function ProjectContent() {
    return (
        <div className="bg-[#fcfdfd] py-16 px-4 md:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto">

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${filter === "All Projects"
                                    ? "bg-[#1a73e8] text-white shadow-md shadow-blue-100"
                                    : "bg-white text-slate-500 border border-slate-200 hover:border-blue-300"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Image Placeholder */}
                            <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                                <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold group-hover:scale-110 transition-transform duration-500">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tag === "Completed" ? "bg-green-100 text-green-600" : "bg-blue-50 text-[#1a73e8]"
                                                }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-[#1a73e8] transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <button className="flex items-center gap-2 text-[#1a73e8] font-bold text-sm group/btn">
                                    View Details
                                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Impact Section */}
                <div className="text-center py-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Impact</h2>
                    <p className="text-slate-500 mb-16 font-medium">Measuring the difference we make in our community</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {impacts.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-[#1a73e8] mb-6">
                                    <stat.icon size={24} strokeWidth={2.5} />
                                </div>
                                <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{stat.value}</div>
                                <div className="text-slate-500 text-sm font-bold tracking-tight">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
