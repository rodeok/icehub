export default function SkitReady() {
    return (
        <section className="relative overflow-hidden">
            <div className="relative bg-gradient-to-br from-[#1E63E9] to-[#1B3FBF] px-6 py-24 text-center text-white">

                {/* Decorative circles */}
                <div className="pointer-events-none absolute left-[-120px] top-[-80px] h-[300px] w-[300px] rounded-full bg-white/10" />
                <div className="pointer-events-none absolute right-[-140px] bottom-[-100px] h-[360px] w-[360px] rounded-full bg-white/10" />

                {/* Badge */}
                <div className="mb-6 flex justify-center">
                    <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur !text-white">
                        🚀 Join Us Today
                    </span>
                </div>

                {/* Heading */}
                <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl !text-white">
                    Ready to Get Started?
                </h1>

                {/* Subheading */}
                <p className="mx-auto mt-4 max-w-2xl text-base !text-white/90 md:text-lg">
                    Give your child or teen an exciting introduction to the world of
                    technology. Limited spots available!
                </p>

                {/* CTA */}
                <div className="mt-8">
                    <button className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#1E63E9] shadow-lg transition hover:scale-105 hover:shadow-xl">
                        Register Now →
                    </button>
                </div>

                {/* Stats */}
                <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8">
                    <div>
                        <p className="text-2xl font-bold !text-white">500+</p>
                        <p className="mt-1 text-sm !text-white/80">Happy Students</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold !text-white">50+</p>
                        <p className="mt-1 text-sm !text-white/80">Projects Completed</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold !text-white">95%</p>
                        <p className="mt-1 text-sm !text-white/80">Satisfaction Rate</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
