const BlogsHeader = () => {
    return (
        <section className="relative w-full bg-[#EEF4FB] pt-32 pb-20 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute left-12 top-6 w-20 h-20 rounded-full bg-blue-100 opacity-60" />
            <div className="absolute right-16 top-10 w-24 h-24 rounded-full bg-blue-100 opacity-60" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                    Blogs & Activities
                </h1>
                <p className="mt-3 text-gray-500 text-sm md:text-base">
                    Discover insights, stories, and updates from the ICE Hub community.
                </p>
            </div>
        </section>
    );
};

export default BlogsHeader;
