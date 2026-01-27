'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  'How do I apply for a program?',
  'How much is the tuition?',
  'Are your classes physical or virtual?',
  'Will I receive a certificate upon graduation?',
  'Will I get a job after my training?',
  'Do you offer co-working space?',
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      <h2 className="text-center text-3xl font-semibold mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((question, index) => (
          <div
            key={index}
            className="relative rounded-xl bg-white shadow-sm border border-blue-100 overflow-hidden"
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
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#0D55BA] text-white font-semibold">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <span className="text-lg font-medium text-gray-900">
                  {question}
                </span>
              </div>

              <Plus className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
