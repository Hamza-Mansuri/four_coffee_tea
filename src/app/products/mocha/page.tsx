import React from 'react';
import { productsData } from '@/data/products';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import ProductPerfectFor from '@/components/product/ProductPerfectFor';
import ProductTestimonials from '@/components/product/ProductTestimonials';
import ProductFAQ from '@/components/product/ProductFAQ';

export default function MochaProductPage() {
  const product = productsData['mocha'];

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Image Gallery & Zoom */}
          <div className="w-full h-auto">
            <ProductGallery images={product.images} />
          </div>

          {/* Right Column: Details, Cart, Accordions */}
          <div className="w-full">
            <ProductDetails product={product} />
          </div>

        </div>

      </div>
      
      {/* Perfect For Section */}
      <ProductPerfectFor 
        image={product.perfectForImage} 
        items={product.perfectForItems} 
      />

      {/* Testimonials Section */}
      <ProductTestimonials testimonials={product.testimonials} />

      {/* FAQ Section */}
      <ProductFAQ image={product.faqImage} faqs={product.faqs} />
    </div>
  );
}
