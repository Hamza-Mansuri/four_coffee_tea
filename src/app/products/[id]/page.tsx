import React from 'react';
import { notFound } from 'next/navigation';
import { productsData } from '@/data/products';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Await the params in Next.js 15+ or if using async components properly
  const { id } = await params;
  
  const product = productsData[id as keyof typeof productsData];

  if (!product) {
    notFound();
  }

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
    </div>
  );
}
