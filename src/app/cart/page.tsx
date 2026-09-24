'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, subtotal, originalTotal } = useCart();
  const { isLoggedIn } = useAuth();
  const savings = originalTotal - subtotal;

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Cart Items */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3 tracking-tight">
              Your cart
              <span className="bg-[#8b4329] text-white text-sm w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm">
                {cartItems.length}
              </span>
            </h1>

            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between py-6 border border-gray-100 bg-white px-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] gap-6">
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="relative w-24 h-24 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{item.flavor}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-8 sm:gap-12">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-4 py-3 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-4 py-3 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price & Remove */}
                    <div className="text-right flex items-center gap-6">
                      <div>
                        <del className="text-sm font-semibold text-gray-400 block">₹{item.originalPrice * item.quantity}</del>
                        <span className="text-xl font-extrabold text-gray-900 tracking-tight">₹{item.price * item.quantity}</span>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-50 rounded-full hover:bg-red-50">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                </div>
              ))}

              {cartItems.length === 0 && (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </div>
                  <p className="text-gray-600 font-medium mb-6 text-lg">Your cart is empty.</p>
                  <Link href="/shop" className="inline-block py-3 px-8 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-50 p-8 sticky top-28">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Order summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-[#22c55e] font-bold text-lg bg-green-50/50 p-3 rounded-xl">
                  <span>Saving</span>
                  <span>-₹{savings}.00/-</span>
                </div>
                <div className="flex justify-between items-center text-xl font-extrabold text-gray-900 p-3">
                  <span>Subtotal</span>
                  <span>₹{subtotal}.00/-</span>
                </div>
              </div>

              {/* Fake Rating */}
              <div className="flex items-center gap-2 mb-8 justify-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_,i)=><svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>)}
                </div>
                <span className="text-xs text-gray-500 font-semibold tracking-wide">4.8 based on 245 Reviews</span>
              </div>

              <button 
                onClick={() => {
                  if (isLoggedIn) {
                    window.location.href = '/checkout';
                  } else {
                    window.location.href = '/login?redirect=/checkout';
                  }
                }}
                className="w-full block py-4 bg-black text-white text-center font-extrabold text-lg rounded-xl hover:bg-gray-800 transition-colors mb-4 shadow-lg shadow-black/20 hover:shadow-black/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Check out
              </button>
              
              <p className="text-[#22c55e] text-sm text-center font-bold flex items-center justify-center gap-1.5 bg-green-50 py-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Add another item to boost your discount!
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
