'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface PerfectForItem {
  title: string;
  desc: string;
}

interface ProductPerfectForProps {
  image: string;
  items: PerfectForItem[];
}

export default function ProductPerfectFor({ image, items }: ProductPerfectForProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-12 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Accordion text */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Gomzi Supplement by RAG is perfect for:
            </h2>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              From peak performance to everyday wellness, Gomzi Supplement by RAG brings balanced nutrition into every moment of your life.
            </p>

            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0 pb-2">
                  <button
                    className="w-full text-left flex justify-between items-center py-2 focus:outline-none group"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="text-base font-semibold text-gray-800 group-hover:text-accent transition-colors">
                      {item.title}
                    </span>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-accent' : ''}`}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl sticky top-8">
            <Image
              src={image}
              alt="Perfect for your daily routine"
              fill
              className={`object-cover ${image.includes('atta') ? 'object-bottom' : 'object-center'}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
