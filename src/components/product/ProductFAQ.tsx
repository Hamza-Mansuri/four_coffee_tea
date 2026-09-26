'use client';

import React from 'react';
import Image from 'next/image';

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  image: string;
  faqs: FAQItem[];
}

export default function ProductFAQ({ image, faqs }: ProductFAQProps) {
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
                <div key={index} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-accent/30 transition-all">
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
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
