'use client';

import React, { useState } from 'react';
import { Minus, Plus, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductDetailsProps {
  product: any;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
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

  return (
    <div className="flex flex-col">
      {/* Breadcrumb / Title Area */}
      <nav className="text-sm text-gray-500 mb-4 flex gap-2">
        <a href="/" className="hover:text-accent transition-colors">Home</a>
        <span>›</span>
        <a href="/shop" className="hover:text-accent transition-colors">Products</a>
        <span>›</span>
        <span className="text-gray-900 font-medium">{product.title}</span>
      </nav>

      <h1 className="text-4xl font-extrabold text-foreground mb-3">{product.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{product.subtitle}</p>

      {/* NEW PRICE & CART ROW */}
      <div className="flex flex-wrap items-center gap-6 mb-8 border-b pb-8">
        <div className="flex flex-col">
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">{product.price}</span>
            <span className="text-xl text-gray-400 line-through mb-1">{product.originalPrice}</span>
          </div>
          <span className="text-green-600 font-medium text-sm mt-1 inline-block px-2 py-1 bg-green-50 rounded-md w-fit border border-green-200">
            {product.stockStatus}
          </span>
        </div>
        
        <div className="flex-1 flex flex-wrap sm:flex-nowrap items-center gap-4 sm:ml-auto justify-start sm:justify-end">
          <div className="flex items-center border border-gray-300 rounded-full bg-white h-12 shrink-0">
            <button 
              className="w-12 h-full flex items-center justify-center text-gray-600 hover:text-foreground"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
            <button 
              className="w-12 h-full flex items-center justify-center text-gray-600 hover:text-foreground"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            className="h-12 px-8 bg-accent text-white font-bold rounded-full hover:bg-[#967d4a] transition-all transform hover:scale-[1.02] shadow-lg uppercase tracking-wide shrink-0"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* NON-DROPDOWN OPEN SECTIONS */}
      <div className="space-y-8">
        
        {/* Description & Ingredients */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">Description</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          
          {product.ingredients && (
            <div className="mt-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Ingredients</h4>
              <p className="text-gray-600 leading-relaxed">{product.ingredients}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
