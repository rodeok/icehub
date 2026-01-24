import { CheckCircle2 } from 'lucide-react';

export default function PrepReady() {
    return (
        <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-blue-600 to-blue-700 text-white">
            {/* Decorative circles */}
            <div className="absolute -left-40 bottom-0 w-[420px] h-[420px] rounded-full bg-white/10" />
            <div className="absolute -right-40 top-0 w-[420px] h-[420px] rounded-full bg-white/10" />


            <div className="relative max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-medium">
                    🚀 Limited Spots Available
                </span>


                <h2 className="mt-8 text-4xl md:text-5xl font-bold !text-white">
                    Ready to Start Your Tech Journey?
                </h2>


                <p className="mt-6 text-lg !text-white/80">
                    Join hundreds of young people building their digital future through
                    NextGen Prep.
                </p>
                <button className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 font-semibold text-blue-700 shadow-lg transition hover:scale-105 active:scale-95">
                    Register Here →
                </button>


                <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
                    <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 fill-white text-blue-600" />
                        No Prior Experience Needed
                    </span>
                    <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 fill-white text-blue-600" />
                        Flexible Learning Schedule
                    </span>
                    <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 fill-white text-blue-600" />
                        Certificate Upon Completion
                    </span>
                </div>
            </div>
        </section>
    );
}