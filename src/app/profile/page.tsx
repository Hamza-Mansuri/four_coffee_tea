'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, ShoppingBag, ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { clearCart } = useCart();
  
  // Local state for the form so it can be edited
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthDate: user?.birthDate || '',
    uid: user?.uid || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    country: user?.country || '',
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    logout();
    clearCart();
    router.push('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar */}
        <div className="w-full md:w-80 bg-white rounded-3xl p-8 shadow-sm h-fit">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-3xl font-light mb-4 tracking-wider">
              {formData.firstName[0]}{formData.lastName[0]}
            </div>
            <h2 className="text-xl font-medium text-gray-900">{formData.firstName} {formData.lastName}</h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">Welcome back <span className="text-lg">👋</span></p>
          </div>

          <nav className="space-y-2">
            <Link href="/profile" className="flex items-center gap-4 px-6 py-4 bg-black text-white rounded-2xl font-medium transition-all">
              <User className="w-5 h-5" />
              Profile
            </Link>
            <Link href="#" className="flex items-center gap-4 px-6 py-4 text-gray-600 hover:bg-gray-50 rounded-2xl font-medium transition-all">
              <ShoppingBag className="w-5 h-5" />
              Orders
            </Link>
            <Link href="/cart" className="flex items-center gap-4 px-6 py-4 text-gray-600 hover:bg-gray-50 rounded-2xl font-medium transition-all">
              <ShoppingCart className="w-5 h-5" />
              Cart
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-2xl font-medium transition-all mt-4"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900">Profile Information</h1>
            <button className="px-6 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-md">
              Update Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            
            <div className="relative">
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">First Name</label>
            </div>

            <div className="relative">
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">Last Name</label>
            </div>

            <div className="relative">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">Email</label>
            </div>

            <div className="relative">
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">Phone Number</label>
            </div>

            <div className="relative">
              <input 
                type="text" 
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">Birth Date</label>
            </div>

            <div className="relative">
              <input 
                type="text" 
                name="uid"
                value={formData.uid}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">UID</label>
            </div>

            <div className="relative">
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">Address</label>
            </div>

            <div className="relative">
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">City</label>
            </div>

            <div className="relative">
              <input 
                type="text" 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">State</label>
            </div>

            <div className="relative">
              <input 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">Country</label>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
