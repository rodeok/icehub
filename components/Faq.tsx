'use client';

import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'How do I apply for a program?',
    answer: 'To apply for a program, visit our admissions page and complete the online application form. You will need to submit required documents and pay the application fee.'
  },
  {
    id: 2,
    question: 'How much is the tuition?',
    answer: 'Tuition fees vary by program. Please contact our admissions office or visit our website for detailed pricing information.'
  },
  {
    id: 3,
    question: 'Are your classes physical or virtual?',
    answer: 'We offer both physical and virtual classes to accommodate different learning preferences and schedules.'
  },
  {
    id: 4,
    question: 'Will I receive a certificate upon graduation?',
    answer: 'Yes, upon successful completion of your program, you will receive an official certificate of completion.'
  },
  {
    id: 5,
    question: 'Will I get a job after my training?',
    answer: 'We provide job placement assistance and career support, but employment cannot be guaranteed. We work closely with industry partners to help connect our graduates with opportunities.'
  },
  {
    id: 6,
    question: 'Do you offer co-working space?',
    answer: 'Yes, we offer co-working spaces for our students and alumni. Please contact us for availability and booking information.'
  }
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(13, 85, 186, 0.1) 0%, rgba(87, 89, 172, 0.02) 50%, transparent 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-12 !text-black">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded flex items-center justify-center font-semibold">
                    {String(faq.id).padStart(2, '0')}
                  </div>
                  <h3 className="!text-black font-medium text-lg">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <svg
                    className={`w-6 h-6 text-black transition-transform ${openId === faq.id ? 'rotate-45' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </button>

              {openId === faq.id && (
                <div className="px-6 pb-6 pt-0">
                  <div className="pl-16 !text-black leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}