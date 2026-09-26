'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

interface PerfectForItem {
  title: string;
  desc: string;
}

interface ProductPerfectForProps {
  image: string;
  items: PerfectForItem[];
  claims?: any;
}

export default function ProductPerfectFor({ image, items, claims }: ProductPerfectForProps) {
  return (
    <section className="w-full py-12 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Accordion text */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Gomzi Naturals is perfect for:
            </h2>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              From peak performance to everyday wellness, Gomzi Naturals brings balanced nutrition into every moment of your life.
            </p>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-accent/30 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Claims section added below the accordion */}
            {claims && (
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Claims We Can Use</h3>
                
                {claims.nutritional && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-accent mb-3">Nutritional Claims</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {claims.nutritional.map((claim: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">{claim}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {claims.functional && (
                  <div>
                    <h4 className="text-lg font-semibold text-accent mb-3">Functional & Formulation</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {claims.functional.map((claim: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                          <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">{claim}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Side: Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl sticky top-8">
            <Image
              src={image}
              alt="Perfect for your daily routine"
              fill
              className={`object-cover ${image?.includes('atta') ? 'object-bottom' : 'object-center'}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
