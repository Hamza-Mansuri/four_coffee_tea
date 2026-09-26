import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function WhyGomzi() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
              Why Gomzi Naturals?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Gomzi Naturals is built on the legacy of RAG and years of real-world expertise in health and fitness education. Our flagship offerings—such as <strong>Chai Feast</strong>, <strong>Mocha Feast</strong>, and <strong>Atta Feast</strong>—bring you the finest ingredients from instant tea and coffee blends to nutritious daily essentials without any hidden compromises.
            </p>
            
            {/* Features List */}
            <ul className="space-y-4 mb-10 text-left mx-auto lg:mx-0 max-w-md">
              {[
                '15+ Years of Industry Experience',
                'Developed by Lecturers & Health Educators',
                'Science-Backed Formulations',
                '100% Transparent Ingredients',
                'No Amino Spiking or Hidden Blends',
                'Trusted by Coaches, Dietitians & Fitness Professionals'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="https://fggroup.in/fgiit/fitness-courses" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3.5 bg-foreground text-white font-medium rounded-full hover:bg-black transition-colors duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Education Site
              </Link>
              <Link 
                href="https://www.instagram.com/chirag_pandey16/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3.5 bg-white text-foreground border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors duration-300"
              >
                <InstagramIcon className="w-4 h-4 mr-2" />
                Open Founder Profile
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/assets/images/all_feast.webp"
              alt="Gomzi Supplement Product Range"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}
