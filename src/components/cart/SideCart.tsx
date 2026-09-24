'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function SideCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, updateQuantity, removeItem, subtotal } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('open-cart', handleOpen);
    window.addEventListener('close-cart', handleClose);

    return () => {
      window.removeEventListener('open-cart', handleOpen);
      window.removeEventListener('close-cart', handleClose);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-[9998] backdrop-blur-[2px] transition-opacity" 
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[9999] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Cart 
            <span className="text-gray-500 text-sm font-semibold">({cartItems.length})</span>
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-5 pb-6 border-b border-gray-100 last:border-0 relative">
              <div className="relative w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 p-2">
                <Image src={item.image} alt={item.title} fill className="object-contain" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1 pr-6">{item.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{item.flavor}</p>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1.5 text-gray-500 hover:text-black hover:bg-gray-50">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1.5 text-gray-500 hover:text-black hover:bg-gray-50">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Absolute Price and Remove */}
              <div className="absolute top-0 right-0 flex flex-col items-end gap-2">
                <button onClick={() => removeItem(item.id)} className="text-red-300 hover:text-red-600 p-1">
                  <X className="w-4 h-4" />
                </button>
                <div className="mt-8 text-right">
                  <span className="font-bold text-gray-900 block mt-2">₹{item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-medium">
              Your cart is empty.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-gray-100 space-y-4 shadow-[0_-4px_20px_rgb(0,0,0,0.03)] z-10">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="font-bold text-gray-700">Subtotal</span>
            <span className="font-extrabold text-gray-900 text-xl">₹{subtotal}.00</span>
          </div>

          <button 
            onClick={() => {
              setIsOpen(false);
              if (isLoggedIn) {
                window.location.href = '/checkout';
              } else {
                window.location.href = '/login?redirect=/checkout';
              }
            }}
            className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
          >
            Checkout
          </button>
          
          <Link 
            href="/cart"
            onClick={() => setIsOpen(false)}
            className="w-full block py-4 bg-white border-2 border-gray-200 text-black text-center rounded-xl font-bold hover:border-black transition-colors"
          >
            View Cart
          </Link>
        </div>

      </div>
    </>
  );
}
