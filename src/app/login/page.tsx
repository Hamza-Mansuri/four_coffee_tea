'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Smartphone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    setError('');
    const isEmailMode = authMode === 'password';
    let namePart = 'User';
    
    if (isEmailMode) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        setError('Please enter a valid email address');
        return;
      }
      namePart = inputValue.split('@')[0];
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(inputValue)) {
        setError('Phone number must be exactly 10 digits');
        return;
      }
      namePart = inputValue;
    }
    
    const firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const uid = Math.floor(Math.random() * 1000000000000).toString();

    login({
      email: isEmailMode ? inputValue : '-',
      phone: !isEmailMode ? inputValue : '-',
      firstName,
      lastName: '',
      uid
    }); // Set global auth state
    const redirectUrl = searchParams.get('redirect') || '/profile';
    router.push(redirectUrl);
  };

  return (
    <div className="min-h-screen bg-black/5 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-black/10 w-full max-w-[440px] p-8 md:p-10 relative">
        
        {/* Close Button Placeholder */}
        <button 
          onClick={() => router.back()}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">Welcome back</h1>
        <p className="text-gray-500 mb-8 font-medium">Login to continue</p>

        {/* Google Login */}
        <button className="w-full py-3.5 border-2 border-gray-100 rounded-xl font-bold text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-200 transition-all mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-[2px] bg-gray-100"></div>
          <span className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">OR</span>
          <div className="flex-1 h-[2px] bg-gray-100"></div>
        </div>

        {/* Tabs */}
        <div className="flex p-1.5 bg-gray-100 rounded-xl mb-8 relative">
          <button 
            type="button"
            onClick={() => { setAuthMode('password'); setError(''); setInputValue(''); }}
            className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all relative z-10 ${authMode === 'password' ? 'text-white' : 'text-gray-500 hover:text-black'}`}
          >
            <Lock className="w-4 h-4" /> Password
          </button>
          <button 
            type="button"
            onClick={() => { setAuthMode('otp'); setError(''); setInputValue(''); }}
            className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all relative z-10 ${authMode === 'otp' ? 'text-white' : 'text-gray-500 hover:text-black'}`}
          >
            <Smartphone className="w-4 h-4" /> OTP
          </button>
          
          {/* Active Tab Background Pill */}
          <div 
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-black rounded-lg shadow-sm transition-transform duration-300 ease-out z-0`}
            style={{ transform: authMode === 'password' ? 'translateX(0)' : 'translateX(100%)' }}
          ></div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <div className="relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setError(''); }}
                placeholder={authMode === 'password' ? "Email" : "Phone number"} 
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-gray-50 focus:bg-white font-medium"
                required
              />
            </div>
          </div>
          
          {authMode === 'password' && (
            <div>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-gray-50 focus:bg-white font-medium"
                  required
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm font-medium px-1">{error}</p>
          )}
          <button type="submit" className="w-full py-4 bg-black text-white rounded-xl font-extrabold text-lg hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 mt-4">
            Sign In
          </button>
        </form>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black/5" />}>
      <LoginContent />
    </Suspense>
  );
}
