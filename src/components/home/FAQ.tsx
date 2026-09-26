'use client';

import React from 'react';

const faqs = [
  {
    question: "Are your Feast products third-party tested?",
    answer: "Yes, all our products including Atta Feast, Mocha Feast, and Chai Feast undergo rigorous third-party testing to ensure the highest international quality standards."
  },
  {
    question: "Are your products suitable for beginners or daily consumption?",
    answer: "Absolutely! Our formulations are designed for everyday wellness and sustained energy, making them perfect for anyone from beginners to fitness enthusiasts."
  },
  {
    question: "What makes your Atta, Mocha, and Chai Feast different?",
    answer: "We blend authentic taste with functional nutrition. There's no amino spiking or hidden blends—just 100% transparent ingredients created by health educators."
  },
  {
    question: "Can I consume these daily?",
    answer: "Yes! Our products are crafted as daily essentials. You can incorporate them into your regular diet to fuel your wellness journey."
  },
  {
    question: "Are your products vegan?",
    answer: "Yes. Our plant-based formulations are suitable for vegan lifestyles, ensuring you get the best nutrition without compromise."
  }
];

export default function FAQ() {

  return (
    <section className="w-full py-16 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Accordion text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Got questions? We've got answers!
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Discover everything you need to know About Us, Health superfoods, and how they can fuel your wellness journey.
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
            <img
              src="/assets/images/homeFAQ.webp"
              alt="Frequently Asked Questions"
              className="w-full h-full object-contain object-center bg-white"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
