'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, ShoppingBag, ShoppingCart, LogOut, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { clearCart } = useCart();
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    uid: ''
  });

  // Redirect if not logged in & initialize form
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        uid: user._id || ''
      });
    }
  }, [isLoggedIn, user, router]);

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

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone
        })
      });
      if (res.ok) {
        alert('Profile updated successfully!');
        window.location.reload(); // Refresh to let auth context sync
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update profile');
      }
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar */}
        <div className="w-full md:w-80 bg-white rounded-3xl p-8 shadow-sm h-fit">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-3xl font-light mb-4 tracking-wider uppercase">
              {formData.name ? formData.name.charAt(0) : 'U'}
            </div>
            <h2 className="text-xl font-medium text-gray-900">{formData.name}</h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">Welcome back <span className="text-lg">👋</span></p>
          </div>

          <nav className="space-y-2">
            <Link 
              href="/profile"
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition-all bg-black text-white"
            >
              <User className="w-5 h-5" />
              Profile
            </Link>
            <Link 
              href="/orders"
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition-all text-gray-600 hover:bg-gray-50"
            >
              <ShoppingBag className="w-5 h-5" />
              My Orders
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
        <div className="flex-1 bg-white rounded-3xl p-8 sm:p-10 shadow-sm min-h-[500px]">
          
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900">Profile Information</h1>
            <button 
              onClick={handleUpdateProfile}
              disabled={updating}
              className="px-6 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-md disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Save Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="relative md:col-span-2">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black peer shadow-sm transition-colors text-gray-900"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">Full Name</label>
            </div>

            <div className="relative">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 peer shadow-sm text-gray-500 bg-gray-50 cursor-not-allowed"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">Email Address (Read-only)</label>
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

            <div className="relative md:col-span-2">
              <input 
                type="text" 
                name="uid"
                value={formData.uid}
                disabled
                className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 peer shadow-sm text-gray-500 bg-gray-50 cursor-not-allowed text-sm font-mono"
              />
              <label className="absolute left-4 top-2 text-xs font-bold text-gray-400">Unique Customer ID (Read-only)</label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
