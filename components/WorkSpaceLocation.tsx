
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

                    {/* Right Column: Map View */}
                    <div className="relative">
                        <div className="aspect-[4/3] w-full bg-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.660299697033!2d6.892684973988238!3d6.041263093944397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104397a2734440ef%3A0xe5b226e48b96ad2b!2sICE%20INNOVATION%20HUB!5e0!3m2!1sen!2sng!4v1772040902844!5m2!1sen!2sng"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="ICE Innovation Hub Location"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
