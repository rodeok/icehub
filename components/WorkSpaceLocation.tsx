
import { MapPin } from "lucide-react";

export default function WorkSpaceLocation() {
    return (
        <section className="bg-[#f3f4f6]/50 py-20 px-4 md:px-8 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Address Info */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
                            Our Workspace Location
                        </h2>

                        <div className="bg-white rounded-3xl p-6 md:p-8 flex items-center gap-6 shadow-sm border border-slate-100 max-w-xl">
                            <div className="w-14 h-14 bg-[#1a73e8] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-100">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                No. 290 Old Onitsha Road, Bethel Building,<br />
                                Uruagu, Nnewi, Anambra State
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Map Placeholder */}
                    <div className="relative">
                        <div className="aspect-[4/3] w-full bg-slate-200 rounded-[2.5rem] shadow-sm flex items-center justify-center overflow-hidden">
                            {/* Visual indicator of a map / site location */}
                            <div className="text-slate-400 flex flex-col items-center gap-3">
                                <MapPin size={48} strokeWidth={1} />
                                <span className="text-sm font-semibold uppercase tracking-wider">Map View</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
