'use client';

import React, { useState } from 'react';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductDetailsProps {
  product: any;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>('health');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      flavor: product.flavors ? product.flavors[0].name : 'Default',
      price: parseInt(product.price.replace(/[^0-9]/g, '')),
      originalPrice: parseInt(product.originalPrice.replace(/[^0-9]/g, '')),
      quantity,
      image: product.images[0]
    });
    window.dispatchEvent(new Event('open-cart'));
  };

  const sections = [
    { id: 'health', title: 'Health Benefits', content: product.healthBenefits },
    { id: 'desc', title: 'Description & Ingredients', content: product.description },
    { id: 'dir', title: 'Direction for use', content: product.directions },
    { id: 'storage', title: 'Storage Instructions', content: product.storage },
  ];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb / Title Area */}
      <nav className="text-sm text-gray-500 mb-4 flex gap-2">
        <a href="/" className="hover:text-accent">Home</a>
        <span>›</span>
        <span>Products</span>
        <span>›</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <h1 className="text-4xl font-extrabold text-foreground mb-3">{product.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{product.subtitle}</p>

      {/* Price */}
      <div className="flex items-end gap-4 mb-8 border-b pb-6">
        <span className="text-3xl font-bold text-gray-900">{product.price}</span>
        <span className="text-xl text-gray-400 line-through mb-1">{product.originalPrice}</span>
        <span className="text-green-600 font-medium text-sm mb-1 px-2 py-1 bg-green-50 rounded-md">
          {product.stockStatus}
        </span>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 border-b pb-10">
        <div className="flex items-center border border-gray-300 rounded-full bg-white h-14">
          <button 
            className="w-14 h-full flex items-center justify-center text-gray-600 hover:text-foreground"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
          <button 
            className="w-14 h-full flex items-center justify-center text-gray-600 hover:text-foreground"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <button 
          className="flex-1 h-14 bg-accent text-white font-bold rounded-full hover:bg-[#967d4a] transition-all transform hover:scale-[1.02] shadow-lg text-lg uppercase tracking-wide"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>

      {/* Accordions */}
      <div className="space-y-4 mb-8">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-sm">
            <button
              className="w-full px-5 py-3 flex justify-between items-center text-left font-semibold text-gray-900 bg-white"
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
            >
              {section.title}
              <ChevronDown 
                className={`w-4 h-4 text-gray-500 transition-transform ${openSection === section.id ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`px-5 overflow-hidden transition-all ease-in-out ${openSection === section.id ? 'max-h-96 py-3 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                {section.content}
              </p>
            </div>
          </div>
        ))}
        
        {/* Nutrition Facts Accordion */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-sm">
          <button
            className="w-full px-5 py-3 flex justify-between items-center text-left font-semibold text-gray-900 bg-white"
            onClick={() => setOpenSection(openSection === 'nutrition' ? null : 'nutrition')}
          >
            Nutrition Information
            <ChevronDown 
              className={`w-4 h-4 text-gray-500 transition-transform ${openSection === 'nutrition' ? 'rotate-180' : ''}`}
            />
          </button>
          <div className={`overflow-hidden transition-all ease-in-out ${openSection === 'nutrition' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <table className="w-full text-xs text-left bg-white">
              <tbody>
                {Object.entries(product.nutrition).map(([key, value], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-2 font-medium text-gray-700 border-t border-gray-100">{key}</td>
                    <td className="px-5 py-2 text-gray-600 text-right border-t border-gray-100 font-semibold">{value as React.ReactNode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
