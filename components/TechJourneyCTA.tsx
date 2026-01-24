export default function TechJourneyCTA() {
    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="relative flex min-h-[420px] items-center justify-center bg-gradient-to-br from-[#1E63E9] to-[#1B3FBF] px-6 text-white">

                {/* Decorative circles */}
                <div className="pointer-events-none absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-white/10" />
                <div className="pointer-events-none absolute right-[-160px] bottom-[-120px] h-[420px] w-[420px] rounded-full bg-white/10" />

                {/* Content */}
                <div className="relative z-10 max-w-4xl text-center">
                    {/* Heading */}
                    <h1 className="text-4xl font-extrabold leading-tight md:text-5xl !text-white">
                        Ready to Start Your Tech Journey?
                    </h1>

                    {/* Subheading */}
                    <p className="mx-auto mt-4 max-w-2xl text-base !text-white/90 md:text-lg">
                        No prior experience required. No complex requirements.
                        <br />
                        Just bring your curiosity and we&apos;ll handle the rest.
                    </p>

                    {/* CTA Button */}
                    <div className="mt-8">
                        <button className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-[#1E63E9] shadow-lg transition hover:scale-105 hover:shadow-xl">
                            Register Now →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
