'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { logoBase64 } from './logoBase64';

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const { cartItems, subtotal, originalTotal, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const savings = originalTotal - subtotal;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: ''
  });

  const [toastMessage, setToastMessage] = useState('');

  // Pre-fill user data once loaded
  useEffect(() => {
    if (user) {
      setAddress(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/checkout');
    }
  }, [isLoggedIn, router]);

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!address.name.trim()) newErrors.name = 'Full Name is required';
    if (!address.street.trim()) newErrors.street = 'Street Address is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State is required';
    
    if (!address.zipCode.trim()) {
      newErrors.zipCode = 'Postal Code is required';
    } else if (!/^\d{6}$/.test(address.zipCode)) {
      newErrors.zipCode = 'Must be a valid 6-digit Indian PIN code';
    }

    if (!address.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(address.phone)) {
      newErrors.phone = 'Must be a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) return alert('Your cart is empty');
    if (!validateForm()) return;

    setLoading(true);
    document.body.style.overflow = 'auto'; // ensure scrolling isn't stuck if razorpay fails

    try {
      // 1. Create order on our backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          orderItems: cartItems.map(item => ({
            name: item.title,
            quantity: item.quantity,
            price: item.price,
            product: item.id
          })),
          shippingAddress: address,
          itemsPrice: subtotal,
          shippingPrice: 0,
          totalPrice: subtotal
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create order');

      // 2. Initialize Razorpay popup
      const options = {
        key: data.key_id, // Safely grabbed from backend .env!
        amount: data.amount,
        currency: data.currency,
        name: 'Gomzi Naturals',
        description: 'Premium Superfoods Checkout',
        image: logoBase64,
        order_id: data.razorpayOrderId,
        handler: async function (response: any) {
          // 3. Verify payment on success
          try {
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/payment/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: data.orderId
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              clearCart(); // Empty the cart on successful payment
              setToastMessage('Payment Successful! Thank you for your order.');
              setTimeout(() => {
                router.push('/profile');
              }, 2000);
            } else {
              alert('Payment verification failed: ' + verifyData.message);
            }
          } catch (err) {
            console.error(err);
            alert('Error verifying payment');
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            document.body.style.overflow = 'auto';
          }
        },
        prefill: {
          name: address.name,
          email: user?.email,
          contact: address.phone
        },
        theme: {
          color: '#1976d2'
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      
      paymentObject.on('payment.failed', function (response: any){
        alert('Payment Failed: ' + response.error.description);
        setLoading(false);
        document.body.style.overflow = 'auto';
      });

      paymentObject.open();

    } catch (error: any) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      document.body.style.overflow = 'auto';
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white relative">
      
      {/* SUCCESS TOAST */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-6 py-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center gap-3 font-bold text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            {toastMessage}
          </div>
        </div>
      )}

      {/* Left Column: Form */}
      <div className="w-full md:w-[55%] bg-white p-8 lg:p-12 xl:p-16 overflow-y-auto">
        <div className="max-w-2xl mx-auto md:ml-auto md:mr-16">
          
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">Contact</h2>
          <div className="mb-10 relative">
            <input 
              type="email" 
              defaultValue={user?.email || ''} 
              disabled
              className="w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 peer shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <label className="absolute left-4 top-2 text-xs font-bold text-gray-500">Email Address (Read-Only)</label>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">Delivery Address</h2>
          <div className="space-y-4 mb-10">
            
            {/* Full Name */}
            <div>
              <input 
                type="text" 
                placeholder="Full Name (Read-Only)" 
                value={address.name}
                readOnly
                className="w-full px-4 py-4 rounded-xl border border-gray-300 shadow-sm font-medium bg-gray-50 text-gray-500 cursor-not-allowed" 
              />
            </div>
            
            {/* Street Address */}
            <div>
              <input 
                type="text" 
                placeholder="Street Address (Flat, House no., Building, Company, Apartment)" 
                value={address.street}
                onChange={(e) => setAddress({...address, street: e.target.value})}
                className={`w-full px-4 py-4 rounded-xl border focus:outline-none focus:ring-1 shadow-sm font-medium transition-colors ${errors.street ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:border-black focus:ring-black'}`} 
              />
              {errors.street && <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.street}</p>}
            </div>
            
            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="City" 
                  value={address.city}
                  list="city-suggestions"
                  onChange={(e) => setAddress({...address, city: e.target.value})}
                  className={`w-full px-4 py-4 rounded-xl border focus:outline-none focus:ring-1 shadow-sm font-medium transition-colors ${errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:border-black focus:ring-black'}`} 
                />
                <datalist id="city-suggestions">
                  <option value="Surat" />
                  <option value="Ahmedabad" />
                  <option value="Mumbai" />
                  <option value="Pune" />
                  <option value="Delhi" />
                  <option value="Bengaluru" />
                  <option value="Hyderabad" />
                </datalist>
                {errors.city && <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.city}</p>}
              </div>
              
              <div>
                <input 
                  type="text" 
                  placeholder="State" 
                  value={address.state}
                  list="state-suggestions"
                  onChange={(e) => setAddress({...address, state: e.target.value})}
                  className={`w-full px-4 py-4 rounded-xl border focus:outline-none focus:ring-1 shadow-sm font-medium transition-colors ${errors.state ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:border-black focus:ring-black'}`} 
                />
                <datalist id="state-suggestions">
                  <option value="Gujarat" />
                  <option value="Maharashtra" />
                  <option value="Delhi" />
                  <option value="Karnataka" />
                  <option value="Tamil Nadu" />
                  <option value="Rajasthan" />
                  <option value="Punjab" />
                </datalist>
                {errors.state && <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.state}</p>}
              </div>
            </div>

            {/* Postal Code and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Postal Code (6 digits)" 
                  value={address.zipCode}
                  maxLength={6}
                  onChange={(e) => setAddress({...address, zipCode: e.target.value.replace(/\D/g, '')})}
                  className={`w-full px-4 py-4 rounded-xl border focus:outline-none focus:ring-1 shadow-sm font-medium transition-colors ${errors.zipCode ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:border-black focus:ring-black'}`} 
                />
                {errors.zipCode && <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.zipCode}</p>}
              </div>
              
              <div className="relative border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 shadow-sm cursor-not-allowed">
                <label className="block text-xs font-bold text-gray-500 mb-0.5">Country</label>
                <div className="font-bold text-gray-900 flex items-center gap-2">
                  <span>🇮🇳</span> India
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <div className="relative flex">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 font-bold text-sm">
                  +91
                </span>
                <input 
                  type="tel" 
                  placeholder="Phone Number (10 digits)" 
                  value={address.phone}
                  maxLength={10}
                  onChange={(e) => setAddress({...address, phone: e.target.value.replace(/\D/g, '')})}
                  className={`flex-1 px-4 py-4 rounded-r-xl border focus:outline-none focus:ring-1 shadow-sm font-medium transition-colors ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:border-black focus:ring-black'}`} 
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.phone}</p>}
              <p className="text-xs text-gray-400 mt-1 px-1 font-medium">In case we need to contact you about your order</p>
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
                <span className="font-medium">You'll be redirected to razorpay to complete your purchase</span>
              </div>
            )}
          </div>

          <button 
            onClick={handlePayment}
            disabled={loading || cartItems.length === 0}
            className="w-full py-5 bg-[#1976d2] hover:bg-[#1565c0] text-white rounded-xl font-bold text-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing Secure Payment...' : 'Pay Now'}
          </button>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="w-full md:w-[45%] bg-[#f5f5f5] p-8 lg:p-12 xl:p-16 border-l border-gray-200">
        <div className="max-w-md mx-auto md:ml-12 md:mr-auto sticky top-12">
          
          <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
            <img src="/assets/images/logo.webp" alt="Gomzi" className="h-10 w-auto" />
          </div>

          <div className="space-y-6 mb-8">
            {cartItems.map(item => {
              let displayImage = item.image;
              if (item.id === 'atta') displayImage = '/assets/images/atta-480.webp';
              else if (item.id === 'mocha') displayImage = '/assets/images/mocha-480.webp';
              else if (item.id === 'tea' || item.id === 'chai') displayImage = '/assets/images/tea-480.webp';
              
              return (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center p-2 shadow-sm relative overflow-hidden">
                      <Image src={displayImage} alt={item.title} fill className="object-contain p-1" sizes="64px" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs font-bold text-gray-500 mt-0.5">{item.flavor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              </div>
              );
            })}
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-300">
            <div className="flex justify-between items-center text-sm font-medium text-gray-600">
              <span>Subtotal · {cartItems.length} item(s)</span>
              <span className="font-bold text-gray-900">₹{subtotal}</span>
            </div>
            
            <div className="flex justify-between items-end pt-4">
              <div>
                <span className="text-2xl font-extrabold text-gray-900 block mb-1">Total</span>
                <span className="text-xs text-gray-500 font-medium">Free Delivery</span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-gray-900 tracking-tight">₹{subtotal}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}
