'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: `How do I apply for a program?`,
    answer: ` You can easily apply on the website by selecting your prefered program, or you can also walk into icehub, nnewi, to register in person and get personalized guidance`
  },
  {
    question: `How much is the tuition?`,
    answer: `Our tution fees vary depending on the program you are applying for the duration`
  },
  {
    question: `Are your classes physical or virtual?`,
    answer: `Programs at ICEHUB can be either physical,virtual, or blended classes you can choose anyone that suit your schedule and location`
  },
  {
    question: `Will I receive a certificate upon graduation?`,
    answer: `Yes! Upon successful completion of your program, you will receive a recognized ICEHUB CERTIFICATE that validated your skills and knowledge`
  },
  {
    question: `Will I get a job after my training?`,
    answer: `75% of our graduates secure jobs or internships within 3 months of completing their training.`
  },
  {
    question: `Do you offer co-working space?`,
    answer: `Yes, We do! Icehub provides a modern co-working space with internet access,power, and a supportive community.`
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-5xl mx-auto px-4 pt-10 pb-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-semibold mb-12"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="relative rounded-xl bg-white shadow-sm border border-blue-100 overflow-hidden gpu"
          >
            {/* Radial gradient blue line */}
            <div
              className="absolute bottom-0 left-0 w-full h-[3px]"
              style={{
                background:
                  'radial-gradient(50% 50% at 50% 50%, #0D55BA 0%, rgba(87, 89, 172, 0.1) 100%)',
              }}
            />

            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full flex items-center justify-between px-6 py-6 text-left"
            >
              <div className="flex items-center gap-4">
                {/* Number box */}
                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-md bg-[#0D55BA] text-white font-semibold">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
              </div>

              <div className="flex-shrink-0 transition-transform duration-300">
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-700" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-700" />
                )}
              </div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: openIndex === index ? 'auto' : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0 ml-14">
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
