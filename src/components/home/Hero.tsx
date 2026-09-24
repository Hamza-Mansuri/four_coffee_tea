import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-background">
      {/* Subtle background treatments */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbf7] to-[#f4f1ea] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8 pt-8 lg:pt-0">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/2 pb-16 lg:py-0 flex flex-col justify-center text-center lg:text-left">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase mb-4">
            Scientifically Formulated
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground uppercase leading-[1.1] mb-6">
            Elevate Your <br className="hidden lg:block"/> Wellbeing
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
            Discover our premium range of scientifically-backed formulations designed to enhance your daily performance and vitality.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/shop" className="w-full sm:w-auto px-8 py-4 bg-[#2c3e2e] text-white font-medium tracking-wide uppercase hover:bg-[#1a251b] transition-colors duration-300 text-center">
              Shop Products
            </Link>
            <Link href="/shop" className="w-full sm:w-auto px-8 py-4 bg-transparent text-foreground border border-foreground font-medium tracking-wide uppercase hover:bg-gray-50 transition-colors duration-300 text-center">
              Explore Nutrition
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-center lg:justify-start space-x-8 opacity-70">
            <div className="flex flex-col items-center lg:items-start">
              <span className="font-bold text-foreground">100%</span>
              <span className="text-xs uppercase tracking-wider text-gray-500">Pure Actives</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="font-bold text-foreground">Tested</span>
              <span className="text-xs uppercase tracking-wider text-gray-500">Lab Certified</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="font-bold text-foreground">Vegan</span>
              <span className="text-xs uppercase tracking-wider text-gray-500">Cruelty Free</span>
            </div>
          </div>
        </div>

        {/* Right Side - Product Visual */}
        <div className="w-full lg:w-1/2 relative h-[50vh] min-h-[400px] lg:h-[80vh] lg:min-h-[600px] flex items-center justify-center">
          <Image
            src="/assets/images/hero-banner.webp"
            alt="Premium Health and Nutrition Products"
            fill
            className="object-contain lg:object-right object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        
      </div>
    </section>
  );
}
