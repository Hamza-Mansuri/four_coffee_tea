'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, ShoppingBag, ShoppingCart, LogOut, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function OrdersPage() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { clearCart } = useCart();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Fetch orders
  useEffect(() => {
    if (isLoggedIn) {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/payment/myorders`, {
            credentials: 'include'
          });
          if (res.ok) {
            const data = await res.json();
            setOrders(data);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    logout();
    clearCart();
    router.push('/');
  };

  const getMainImage = (name: string) => {
    if (name.toLowerCase().includes('atta')) return '/assets/images/atta-480.webp';
    if (name.toLowerCase().includes('mocha')) return '/assets/images/mocha-480.webp';
    if (name.toLowerCase().includes('chai') || name.toLowerCase().includes('tea')) return '/assets/images/tea-480.webp';
    return null;
  };

  return (
    <div className="bg-[#f5f6f8] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar */}
        <div className="w-full md:w-80 bg-white rounded-3xl p-8 shadow-sm h-fit">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-3xl font-light mb-4 tracking-wider uppercase">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <h2 className="text-xl font-medium text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">Welcome back <span className="text-lg">👋</span></p>
          </div>

          <nav className="space-y-2">
            <Link 
              href="/profile"
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition-all text-gray-600 hover:bg-gray-50"
            >
              <User className="w-5 h-5" />
              Profile
            </Link>
            <Link 
              href="/orders"
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition-all bg-black text-white"
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
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-10">My Orders</h1>
          
          {loadingOrders ? (
            <div className="flex justify-center py-20 text-gray-500 font-bold">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-6 font-medium">When you place an order, it will appear here.</p>
              <Link href="/products" className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: any) => (
                <div key={order._id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Order Placed</p>
                      <p className="font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
                      <p className="font-bold text-gray-900">₹{order.totalPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Order ID</p>
                      <p className="font-mono text-sm text-gray-600">{order._id}</p>
                    </div>
                    <div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.isPaid ? 'PAID' : 'PENDING'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.orderItems.map((item: any, idx: number) => {
                        const img = getMainImage(item.name) || (item.product?.images?.[0]);
                        return (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center p-2 relative overflow-hidden">
                            {img ? (
                              <img src={img} alt={item.name} className="object-contain w-full h-full" />
                            ) : (
                              <Package className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{item.name}</h4>
                            <p className="text-sm font-medium text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="font-extrabold text-gray-900">
                            ₹{item.price * item.quantity}
                          </div>
                        </div>
                      )})}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
