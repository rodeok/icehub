"use client";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Skit = () => {
  return (
    <section className="w-full bg-white pt-10 pb-4 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 gpu"
        >
          <h2 className="text-[32px] md:text-[40px] font-bold leading-tight text-black">
            <span className="text-[#0D55BA]">SKIT Program</span>: specialized
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
        </motion.div>

        {/* RIGHT IMAGE COLLAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center lg:justify-end items-center h-auto lg:h-[660px] gpu"
        >
          <div className="relative w-full max-w-[600px] aspect-[4/5] lg:h-full lg:aspect-auto">

            {/* Image 1 – flat top, rounded bottom */}
            <div className="absolute left-0 top-[2%] w-[45%] aspect-square overflow-hidden rounded-b-[100px] md:rounded-b-[150px] shadow-md z-10 transition-transform duration-500 hover:scale-105 gpu">
              <Image
                src="/images/1.png"
                alt="Kids learning robotics"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 2 – bottom-left rectangle */}
            <div className="absolute left-[7%] top-[45%] w-[37%] aspect-[3/4] overflow-hidden rounded-md shadow-md z-0 transition-transform duration-500 hover:scale-105 gpu">
              <Image
                src="/images/2.png"
                alt="Kid with laptop"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 3 – rounded top, flat bottom */}
            <div className="absolute left-[50%] top-0 w-[45%] aspect-[1/2] lg:h-[485px] lg:w-[271px] overflow-hidden rounded-t-[100px] md:rounded-t-[150px] shadow-lg z-20 transition-transform duration-500 hover:scale-105 gpu">
              <Image
                src="/images/3.png"
                alt="Student coding"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 4 – bottom-right soft rectangle */}
            <div className="absolute left-[50%] top-[75%] lg:top-[505px] w-[45%] h-[20%] lg:w-[271px] lg:h-[152px] overflow-hidden rounded-[4px] shadow-md z-10 transition-transform duration-500 hover:scale-105 gpu">
              <Image
                src="/images/4.png"
                alt="Students learning together"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skit;
