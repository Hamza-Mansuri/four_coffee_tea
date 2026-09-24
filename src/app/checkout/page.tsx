'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const { cartItems, subtotal, originalTotal } = useCart();
  const savings = originalTotal - subtotal;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      
      {/* Left Column: Form */}
      <div className="w-full md:w-[55%] bg-white p-8 lg:p-12 xl:p-16 overflow-y-auto">
        <div className="max-w-2xl mx-auto md:ml-auto md:mr-16">
          
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">Contact</h2>
          <div className="mb-10 relative">
            <input 
              type="email" 
              defaultValue="hamzamansuri7103@gmail.com" 
              className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors"
            />
            <label className="absolute left-4 top-2 text-xs font-bold text-gray-500">Email</label>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">Delivery</h2>
          <div className="space-y-4 mb-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input type="text" placeholder="First name" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-500 shadow-sm font-medium transition-colors" />
              </div>
              <div className="relative">
                <input type="text" placeholder="Last name" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-500 shadow-sm font-medium transition-colors" />
              </div>
            </div>
            <input type="text" placeholder="Address" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-500 shadow-sm font-medium transition-colors" />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-500 shadow-sm font-medium transition-colors" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <select className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-gray-700 bg-white appearance-none shadow-sm font-medium transition-colors">
                  <option>State</option>
                  <option>Gujarat</option>
                  <option>Maharashtra</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
              </div>
              <div className="relative">
                <select className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-gray-700 bg-white appearance-none shadow-sm font-medium transition-colors">
                  <option>City</option>
                  <option>Surat</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Postal code" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-500 shadow-sm font-medium transition-colors" />
              <div className="relative border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 shadow-sm">
                <label className="block text-xs font-bold text-gray-500 mb-0.5">Country / Region</label>
                <div className="font-bold text-gray-900">IN India</div>
              </div>
            </div>

            <div className="relative">
              <input type="tel" placeholder="Phone" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-500 shadow-sm font-medium transition-colors" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <input type="checkbox" id="save-info" className="w-5 h-5 rounded text-black focus:ring-black border-gray-300" />
              <label htmlFor="save-info" className="text-gray-700 font-medium">Save this information for next time</label>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Payment</h2>
          <p className="text-gray-500 text-sm font-medium mb-6">All transactions are secure and encrypted.</p>
          
          <div className="border border-gray-300 rounded-2xl overflow-hidden mb-8 shadow-sm">
            <div 
              className={`p-6 flex items-center justify-between cursor-pointer border-b border-gray-200 transition-colors ${paymentMethod === 'online' ? 'bg-[#f4f8fd]' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => setPaymentMethod('online')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'online' ? 'border-[#1976d2]' : 'border-gray-300'}`}>
                  {paymentMethod === 'online' && <div className="w-2.5 h-2.5 bg-[#1976d2] rounded-full" />}
                </div>
                <span className="font-bold text-gray-900 text-lg">Online Payment</span>
              </div>
              <span className="text-[#1976d2] font-extrabold text-xl italic tracking-tight">Razorpay</span>
            </div>
            
            {paymentMethod === 'online' && (
              <div className="p-10 bg-[#f4f8fd] text-center text-gray-600 text-sm flex flex-col items-center justify-center border-b border-gray-200">
                <svg className="w-10 h-10 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                <span className="font-medium">You'll be redirected to razorpay to complete your purchase</span>
              </div>
            )}

            <div 
              className={`p-6 flex items-center justify-between cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'bg-[#f4f8fd]' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => setPaymentMethod('cod')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'border-[#1976d2]' : 'border-gray-300'}`}>
                  {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-[#1976d2] rounded-full" />}
                </div>
                <span className="font-bold text-gray-900 text-lg">Cash on Delivery</span>
              </div>
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
          </div>

          <button className="w-full py-5 bg-[#1976d2] hover:bg-[#1565c0] text-white rounded-xl font-bold text-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0">
            Pay Now
          </button>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold text-[#1976d2]">
            <a href="#" className="hover:underline">Refund policy</a>
            <a href="#" className="hover:underline">Shipping</a>
            <a href="#" className="hover:underline">Privacy policy</a>
            <a href="#" className="hover:underline">Terms of service</a>
            <a href="#" className="hover:underline">Cancellations</a>
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="w-full md:w-[45%] bg-[#f5f5f5] p-8 lg:p-12 xl:p-16 border-l border-gray-200">
        <div className="max-w-md mx-auto md:ml-12 md:mr-auto sticky top-12">
          
          <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
            <img src="/assets/images/logo.webp" alt="Gomzi" className="h-10 w-auto" />
          </div>

          <div className="space-y-6 mb-8">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center p-2 shadow-sm">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs font-bold text-gray-500 mt-0.5">{item.flavor}</p>
                    {item.originalPrice > item.price && (
                      <p className="text-xs font-bold text-[#22c55e] mt-1">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <del className="text-xs text-gray-400 font-bold block">₹{item.originalPrice * item.quantity}</del>
                  <span className="font-extrabold text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mb-8 pt-6 border-t border-gray-300">
            <input 
              type="text" 
              placeholder="Discount code or gift card" 
              className="flex-1 px-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-500 shadow-sm font-medium transition-colors"
            />
            <button className="px-6 py-4 bg-gray-200 text-gray-600 font-extrabold rounded-xl hover:bg-gray-300 transition-colors">
              Apply
            </button>
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-300">
            <div className="flex justify-between items-center text-sm font-medium text-gray-600">
              <span>Subtotal · {cartItems.length} item</span>
              <span className="font-bold text-gray-900">₹{subtotal}</span>
            </div>
            
            <div className="flex justify-between items-end pt-4">
              <div>
                <span className="text-2xl font-extrabold text-gray-900 block mb-1">Total</span>
                <span className="text-xs text-gray-500 font-medium">Free Delivery</span>
              </div>
              <div className="text-right">
                <del className="text-sm text-gray-400 font-bold block mb-1">₹{originalTotal}</del>
                <span className="text-3xl font-extrabold text-gray-900 tracking-tight">₹{subtotal}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[#b07b31] font-bold text-sm uppercase tracking-wider bg-[#fffaf0] p-3 rounded-lg border border-[#f5e6d3]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            TOTAL SAVINGS ₹{savings}
          </div>

        </div>
      </div>

    </div>
  );
}
