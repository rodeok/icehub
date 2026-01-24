
import { Search, ArrowRight, Filter } from "lucide-react";

const categories = ["All", "Blogs", "Activities", "Events", "Updates"];

const blogPosts = [
    {
        tag: "Insight",
        title: "5 Essential Skills Every Entrepreneur Needs",
        excerpt: "Discover the core competencies that separate successful entrepreneurs from the rest in today's competitive landscape.",
        date: "March 15, 2024",
        tagColor: "bg-blue-50 text-blue-600",
    },
    {
        tag: "Event",
        title: "Startup Pitch Night Success Stories",
        excerpt: "Recap of our latest pitch night featuring groundbreaking startups and their journey to success.",
        date: "March 12, 2024",
        tagColor: "bg-green-50 text-green-600",
    },
    {
        tag: "Workshop",
        title: "AI & Machine Learning Bootcamp",
        excerpt: "Join our intensive 3-day bootcamp to master the fundamentals of AI and machine learning applications.",
        date: "March 10, 2024",
        tagColor: "bg-purple-50 text-purple-600",
    },
    {
        tag: "Update",
        title: "New Mentorship Program Launch",
        excerpt: "Connect with industry leaders and experienced entrepreneurs through our enhanced mentorship initiative.",
        date: "March 8, 2024",
        tagColor: "bg-blue-50 text-blue-500",
    },
    {
        tag: "Innovation",
        title: "Prototyping Lab Now Open",
        excerpt: "State-of-the-art prototyping facilities are now available for all ICE Hub members to bring ideas to life.",
        date: "March 5, 2024",
        tagColor: "bg-orange-50 text-orange-500",
    },
    {
        tag: "Community",
        title: "Celebrating 1000 Members!",
        excerpt: "A milestone achievement as our community reaches 1000 active members driving innovation forward.",
        date: "March 1, 2024",
        tagColor: "bg-pink-50 text-pink-500",
    },
];

export default function BlogMain() {
    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <section className="bg-[#f0f7ff] py-20 px-4 relative overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-blue-200/50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-blue-200/40 rounded-full blur-3xl opacity-60"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 font-primary">
                        Blogs & Activities
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl font-medium">
                        Discover insights, stories, and updates from the ICE Hub community.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-[-60px] relative z-20">
                {/* Featured Card */}
                <div className="bg-[#1a73e8] rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl overflow-hidden relative mb-20 group">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative z-10">
                            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                Featured
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight !text-white">
                                Building the Future of Innovation
                            </h2>
                            <p className="!text-white/80 text-lg mb-8 max-w-lg leading-relaxed">
                                Explore how ICE Hub is transforming the entrepreneurial landscape through
                                cutting-edge programs and community initiatives.
                            </p>
                            <button className="bg-white text-blue-600 px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-slate-50 transition-all transform group-hover:scale-105">
                                Read More
                            </button>
                        </div>

                        <div className="relative">
                            <div className="aspect-video w-full bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-inner">
                                <div className="h-full w-full flex items-center justify-center text-white/20">
                                    <span className="text-lg font-bold">Featured Image</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background Highlight */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-400/10 skew-x-[-15deg] translate-x-12 translate-y-[-20%] pointer-events-none"></div>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${cat === "All"
                                    ? "bg-[#1a73e8] text-white shadow-md shadow-blue-100"
                                    : "bg-white text-slate-500 border border-slate-200 hover:border-blue-300"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full bg-white border border-slate-200 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Blog Post Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Image Placeholder */}
                            <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                                <div className="h-full w-full flex items-center justify-center text-slate-300 font-bold group-hover:scale-110 transition-transform duration-500">
                                    Blog Image
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest mb-4 w-fit ${post.tagColor}`}>
                                    {post.tag}
                                </span>

                                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                                    {post.excerpt}
                                </p>

                                <div className="flex justify-between items-center mt-auto pt-6 border-t border-slate-50">
                                    <span className="text-slate-400 text-[11px] font-semibold">{post.date}</span>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-1 shadow-sm">
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="mt-20 flex justify-center">
                    <button className="bg-slate-100 text-slate-600 px-10 py-4 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all shadow-sm">
                        Load More Posts
                    </button>
                </div>
            </div>
        </div>
    );
}
