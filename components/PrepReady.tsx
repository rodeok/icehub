
import Link from 'next/link';
import { Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PrepReady() {
    return (
        <section className="relative w-full bg-[#1a73e8] py-24 overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 text-white text-sm font-medium mb-8 border border-white/10">
                    <Rocket className="w-4 h-4" />
                    <span>Limited Spots Available</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-6xl font-bold !text-white mb-6 leading-tight">
                    Ready to Start Your Tech <br />
                    Journey?
                </h2>

                {/* Subtext */}
                <p className="!text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Join hundreds of young people building their digital future through NextGen Prep.
                </p>

                {/* CTA Button */}
                <div className="mb-16">
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 bg-white text-[#1a73e8] px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:bg-slate-50 transition-colors transform hover:scale-105 duration-200"
                    >
                        Register Here
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Features / Benefits */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-white font-medium">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 fill-white text-[#1a73e8]" />
                        <span>No Prior Experience Needed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 fill-white text-[#1a73e8]" />
                        <span>Flexible Learning Schedule</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 fill-white text-[#1a73e8]" />
                        <span>Certificate Upon Completion</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
