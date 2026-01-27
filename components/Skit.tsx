import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const Skit = () => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h2 className="text-[32px] md:text-[40px] font-bold leading-tight text-black">
            <span className="text-[#0D55BA]">SKIT Program</span>:specialized
            <br />
            Knowledge & Innovation Training
          </h2>

          <p className="text-[#333] text-base md:text-[17px] leading-relaxed max-w-lg font-medium">
            SKIT is a specialized summer bootcamp program designed for children
            with unique learning needs. Kids will be introduced to the foundations
            of computer basics, coding, design, and robotics in a supportive and
            creative learning environment.
          </p>

          <a
            href="/programmes/skit"
            className="inline-flex items-center text-[#0D55BA] font-bold text-base hover:underline group"
          >
            Learn More
            <FiArrowUpRight className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* RIGHT IMAGE COLLAGE – UPDATED TO MATCH DESIGN */}
        <div className="relative flex justify-center lg:justify-end items-center h-[660px]">
          <div className="relative w-[600px] h-full">

            {/* Image 1 – flat top, rounded bottom */}
            <div className="absolute left-0 top-[12.86px] w-[271.6px] h-[260.24px] overflow-hidden rounded-b-[150px] shadow-md">
              <Image
                src="/images/1.png"
                alt="Kids learning robotics"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 2 – bottom-left rectangle */}
            <div className="absolute left-[40.06px] top-[292.6px] w-[219.54px] h-[296.14px] overflow-hidden rounded-md shadow-md">
              <Image
                src="/images/2.png"
                alt="Kid with laptop"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 3 – rounded top, flat bottom */}
            <div className="absolute left-[291.77px] top-0 w-[271px] h-[485px] overflow-hidden rounded-t-[150px] shadow-lg">
              <Image
                src="/images/3.png"
                alt="Student coding"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 4 – bottom-right soft rectangle */}
            <div className="absolute left-[291.77px] top-[505px] w-[271px] h-[152px] overflow-hidden rounded-[4px] shadow-md">
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
