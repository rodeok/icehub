import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const Skit = () => {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-8 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            <span className="text-[#0052CC]">SKIT Program</span>: specialized
            <br />
            Knowledge & Innovation Training
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg">
            SKIT is a specialized summer bootcamp program designed for children
            with unique learning needs. Kids will be introduced to the foundations
            of computer basics, coding, design, and robotics in a supportive and
            creative learning environment.
          </p>

          <a
            href="#"
            className="inline-flex items-center text-[#0052CC] font-semibold hover:underline"
          >
            Learn More
            <ArrowUpRight size={16} className="ml-1" />
          </a>
        </div>

        {/* RIGHT IMAGE COLLAGE */}
        <div className="relative w-full h-[520px] md:h-[600px] flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg h-full">

            {/* 1️⃣ Top-left — Perfect Circle */}
            <div className="absolute top-0 left-0 w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl z-20">
              <Image
                src="/images/1.png"
                alt="Kids learning robotics"
                fill
                className="object-cover"
              />
            </div>

            {/* 2️⃣ Bottom-left — Rounded blob (cut corner) */}
            <div className="absolute bottom-12 left-6 md:left-0 w-52 h-52 md:w-60 md:h-60 overflow-hidden shadow-lg z-10 rounded-[32px] rounded-tr-[8px]">
              <Image
                src="/images/2.png"
                alt="Kid with laptop"
                fill
                className="object-cover"
              />
            </div>

            {/* 3️⃣ Right — Tall capsule / arch */}
            <div className="absolute top-0 right-0 w-48 h-[420px] md:w-60 md:h-[520px] overflow-hidden shadow-2xl z-30 rounded-t-full rounded-b-full">
              <Image
                src="/images/3.png"
                alt="Student coding"
                fill
                className="object-cover"
              />
            </div>

            {/* 4️⃣ Bottom-right — Soft rectangle */}
            <div className="absolute bottom-0 right-10 md:right-0 w-44 h-32 md:w-56 md:h-40 overflow-hidden shadow-lg z-20 rounded-2xl">
              <Image
                src="/images/4.png"
                alt="Students learning together"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Skit;
