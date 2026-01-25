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

        {/* RIGHT IMAGE COLLAGE */}
        <div className="relative flex justify-center lg:justify-end items-center h-[550px] md:h-[650px]">
          <div className="relative w-full max-w-[550px] h-full flex items-center">

            <div className="grid grid-cols-2 gap-4 w-full h-fit">
              <div className="space-y-4 pt-10">
                {/* 1️⃣ Top-left — Quarter Circle / Leaf Shape */}
                <div className="relative w-full aspect-square rounded-tr-[100px] rounded-bl-[100px] rounded-br-[100px] overflow-hidden shadow-md">
                  <Image
                    src="/images/1.png"
                    alt="Kids learning robotics"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 2️⃣ Bottom-left — Inverted Quarter Circle / Leaf Shape */}
                <div className="relative w-full aspect-square rounded-tl-[100px] rounded-bl-[100px] rounded-br-[100px] overflow-hidden shadow-md">
                  <Image
                    src="/images/2.png"
                    alt="Kid with laptop"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {/* 3️⃣ Right Top — Arch Shape */}
                <div className="relative w-full h-[400px] rounded-t-full overflow-hidden shadow-lg">
                  <Image
                    src="/images/3.png"
                    alt="Student coding"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 4️⃣ Right Bottom — Soft Rectangle */}
                <div className="relative w-full h-[150px] rounded-[12px] overflow-hidden shadow-md">
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
        </div>

      </div>
    </section>
  );
};

export default Skit;
