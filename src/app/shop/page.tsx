'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 'mocha',
    category: 'Coffee',
    title: 'Mocha Feast',
    description: 'Rich chocolate and coffee flavor packed with nutrients to fuel your workouts.',
    backgroundImg: '/assets/images/mocha_feast.webp',
    foregroundImg: '/assets/images/mocha-480.webp',
    price: '₹1200',
    originalPrice: '₹1500',
  },
  {
    id: 'atta',
    category: 'Atta',
    title: 'Atta Feast',
    description: 'A premium wholesome daily flour blend for balanced nutrition and sustained energy.',
    backgroundImg: '/assets/images/atta_feast.webp',
    foregroundImg: '/assets/images/atta-480.webp',
    price: '₹450',
    originalPrice: '₹600',
  },
  {
    id: 'tea',
    category: 'Tea',
    title: 'Chai Feast',
    description: 'Authentic Indian chai flavor combined with essential vitamins and minerals.',
    backgroundImg: '/assets/images/elaichi_glass.webp',
    foregroundImg: '/assets/images/tea-480.webp',
    price: '₹950',
    originalPrice: '₹1200',
  }
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'coffee', name: 'Coffee' },
  { id: 'tea', name: 'Tea' },
  { id: 'atta', name: 'Atta' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const filteredProducts = activeCategory === 'All Products' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#fdfbf7] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Shop</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
              <ul className="space-y-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  const count = cat.name === 'All Products' 
                    ? products.length 
                    : products.filter(p => p.category === cat.name).length;
                  
                  return (
                    <li key={cat.id}>
                      <button 
                        onClick={() => setActiveCategory(cat.name)}
                        className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-colors flex justify-between items-center ${
                          isActive 
                            ? 'bg-black text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span>({count})</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-3xl overflow-hidden shadow-md flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  
                  <Link href={`/products/${product.id}`} className="block relative h-64 w-full overflow-hidden cursor-pointer">
                    {/* Background Image */}
                    <Image
                      src={product.backgroundImg}
                      alt={`${product.title} background`}
                      fill
                      className="object-cover opacity-80"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                    
                    {/* Foreground Image */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="relative w-full h-full">
                        <Image
                          src={product.foregroundImg}
                          alt={product.title}
                          fill
                          className="object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                  </Link>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    
                    {/* 5 Stars */}
                    <div className="flex gap-1 mb-2 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>

                    {/* Price and MRP */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-gray-900">{product.price}</span>
                      <del className="text-sm font-semibold text-gray-400">{product.originalPrice}</del>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                      {product.description}
                    </p>
                    
                    <Link 
                      href={`/products/${product.id}`}
                      className="w-full py-3 bg-[#8b4329] text-white text-sm font-semibold rounded-xl text-center transition-colors hover:bg-[#733621]"
                    >
                      ADD TO CART
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg font-medium">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
