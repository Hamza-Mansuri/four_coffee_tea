import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Rahul S.',
    review: 'The Mocha Feast is incredible! Gives me the perfect energy boost before my workouts.',
    dp: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 2,
    name: 'Priya K.',
    review: 'Atta Feast has changed my daily routine. It is so wholesome and easy to digest.',
    dp: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'Amit V.',
    review: 'Chai Feast tastes just like authentic Indian chai but with so much added nutrition.',
    dp: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 4,
    name: 'Neha M.',
    review: 'I love how clean the ingredients are. No hidden blends, just pure nutrition.',
    dp: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 5,
    name: 'Vikram D.',
    review: 'Perfect taste and perfect results. Highly recommend these blends to everyone.',
    dp: 'https://i.pravatar.cc/150?img=12',
  }
];

export default function Testimonials() {
  // Duplicate for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Don't think twice, your body will thank you!
        </h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        <div className="animate-marquee flex gap-6 py-4 whitespace-nowrap">
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="inline-flex flex-col w-[350px] p-8 bg-gray-50 rounded-2xl shadow-sm border border-gray-100 flex-shrink-0"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 text-lg mb-6 whitespace-normal flex-grow italic">
                "{testimonial.review}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <Image 
                    src={testimonial.dp}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <span className="text-sm text-gray-500">Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
