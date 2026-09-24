import React from 'react';
import Link from 'next/link';

export default function ParallaxBanner() {
  return (
    <section 
      className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/images/all_feast.webp')" }}
    >
      <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay for text readability */}
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Uncompromised Quality.
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-10 font-light leading-relaxed">
          Experience the pure, unadulterated power of our premium instant blends. Crafted for exceptional taste, engineered for peak performance and everyday wellness.
        </p>
        
        <Link 
          href="/products"
          className="inline-flex items-center justify-center px-8 py-4 bg-[#b4975a] text-white font-semibold rounded-full hover:bg-[#967d4a] transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Discover The Range
        </Link>
      </div>
    </section>
  );
}
