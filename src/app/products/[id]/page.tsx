import React from 'react';
import { notFound } from 'next/navigation';
import { productsData } from '@/data/products';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import ProductExtendedInfo from '@/components/product/ProductExtendedInfo';
import { CheckCircle } from 'lucide-react';

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

        {/* Extended Product Info (Full Width) */}
        <ProductExtendedInfo product={product} />

        {/* BOTTOM SECTION for "Perfect For" and "Claims" */}
        {(product.perfectForItems || product.claims) && (
          <div className="mt-24 pt-16 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              {/* Perfect For */}
              {product.perfectForItems && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">This Premix is Perfect For:</h2>
                  <div className="space-y-6">
                    {product.perfectForItems.map((item: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Claims */}
              {product.claims && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Claims We Can Use:</h2>
                  
                  {product.claims.nutritional && (
                    <div className="mb-10 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="text-xl font-bold text-accent mb-6 border-b pb-2">Nutritional Claims</h3>
                      <ul className="space-y-4">
                        {product.claims.nutritional.map((claim: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                            <span className="text-green-500 shrink-0"><CheckCircle className="w-5 h-5" /></span>
                            {claim}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.claims.functional && (
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="text-xl font-bold text-accent mb-6 border-b pb-2">Functional & Formulation</h3>
                      <ul className="space-y-4">
                        {product.claims.functional.map((claim: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                            <span className="text-blue-500 shrink-0"><CheckCircle className="w-5 h-5" /></span>
                            {claim}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
