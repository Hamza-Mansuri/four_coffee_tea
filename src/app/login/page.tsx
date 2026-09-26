'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, checkAuth } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // --- VALIDATION ---
    if (!isLoginMode) {
      if (!name.trim()) {
        return setError('Full Name is required');
      }
      if (!/^\d{10}$/.test(phone)) {
        return setError('Please enter a valid 10-digit phone number');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return setError('Please enter a valid email address');
      }
      if (password.length < 8) {
        return setError('Password must be at least 8 characters long');
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      }
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return setError('Please enter a valid email address');
      }
      if (!password) {
        return setError('Password is required');
      }
    }
    // ------------------

    setLoading(true);
    const redirectUrl = searchParams.get('redirect') || '/profile';

    try {
      if (isLoginMode) {
        // Login Flow
        const success = await login(email, password);
        if (success) {
          router.push(redirectUrl);
        } else {
          setError('Invalid email or password');
        }
      } else {
        // Register Flow
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, phone }),
          credentials: 'include' // Important for cookies
        });

        const data = await res.json();
        
        if (res.ok) {
          await checkAuth(); // Update global auth context
          router.push(redirectUrl);
        } else {
          setError(data.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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

        <h1 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">
          {isLoginMode ? 'Welcome back' : 'Create Account'}
        </h1>
        <p className="text-gray-500 mb-8 font-medium">
          {isLoginMode ? 'Login to continue' : 'Sign up to get started'}
        </p>

        {/* Google Login */}
        <button 
          type="button"
          onClick={() => alert('Google Sign-In logic will be connected when Client ID is provided.')}
          className="w-full py-3.5 border-2 border-gray-100 rounded-xl font-bold text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-200 transition-all mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-[2px] bg-gray-100"></div>
          <span className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">OR</span>
          <div className="flex-1 h-[2px] bg-gray-100"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLoginMode && (
            <>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name" 
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-gray-50 focus:bg-white font-medium"
                required
              />
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                placeholder="Phone Number (10 digits)" 
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-gray-50 focus:bg-white font-medium"
                required
              />
            </>
          )}

          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address" 
            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-gray-50 focus:bg-white font-medium"
            required
          />
          
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-gray-50 focus:bg-white font-medium"
              required
            />
            {isLoginMode && (
              <div className="flex justify-end mt-2">
                <button type="button" className="text-sm font-semibold text-gray-500 hover:text-black transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium px-1">{error}</p>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-black text-white rounded-xl font-extrabold text-lg hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : isLoginMode ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError('');
              }}
              className="text-black font-extrabold hover:underline"
            >
              {isLoginMode ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

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
