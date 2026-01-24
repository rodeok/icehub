import Link from "next/link";

export default function NextGenHero() {
    return (
        <section className="relative w-full overflow-hidden bg-[#f8faff] py-12 lg:py-24">
            {/* Background Decorative Elements */}
            <div className="absolute left-[-5%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 items-center">

                    {/* Left Column: Text Content */}
                    <div className="max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                            Empowering <br />
                            Secondary School <br />
                            Leavers & <span className="text-[#1a73e8]">JAMB</span> <br />
                            <span className="text-[#1a73e8]">Candidates</span> for a <br />
                            Future of <br />
                            Excellence
                        </h1>

                        <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-lg">
                            Join our exclusive 6-month in-demand tech skill training
                            programme designed to equip young people with essential
                            digital skills, clarity, and confidence for their future career.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/register"
                                className="inline-flex justify-center items-center rounded-md bg-[#1a73e8] px-8 py-3.5 text-base font-bold text-white shadow-lg hover:bg-blue-600 transition-colors"
                                style={{ backgroundColor: '#1a73e8' }}
                            >
                                Register Now <span className="ml-2">→</span>
                            </Link>
                            <Link
                                href="/program-details"
                                className="inline-flex justify-center items-center rounded-md bg-white px-6 py-3.5 text-base font-bold text-[#1a73e8] border-2 border-[#1a73e8] hover:bg-blue-50 transition-colors"
                                style={{ color: '#1a73e8', borderColor: '#1a73e8' }}
                            >
                                Learn More About the Program
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Card Placeholder */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[500px] aspect-square bg-white rounded-[40px] shadow-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            {/* This is the white card shown in the design. 
                   It can hold an image or video later. */}
                            <div className="w-full h-full bg-slate-50/10"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
