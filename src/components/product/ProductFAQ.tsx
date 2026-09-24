'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  image: string;
  faqs: FAQItem[];
}

export default function ProductFAQ({ image, faqs }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Accordion text */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Got questions? We've got answers. Discover everything you need to know about this product.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-sm">
                  <button
                    className="w-full text-left flex justify-between items-center px-5 py-4 focus:outline-none bg-white"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="text-base font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-accent' : ''}`}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-4 pt-1">
                      <p className="text-sm text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl sticky top-8">
            <Image
              src={image}
              alt="Frequently Asked Questions"
              fill
              className={`object-cover ${image.includes('attap3') ? 'object-bottom' : 'object-center'}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
