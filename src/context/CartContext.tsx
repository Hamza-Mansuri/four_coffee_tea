'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  title: string;
  flavor: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  originalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isLoggedIn, user } = useAuth();

  // Load from local storage
  useEffect(() => {
    const cartKey = isLoggedIn && user?.uid ? `gomzi_cart_${user.uid}` : 'gomzi_cart_guest';
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {}
    } else {
        // Initial mock data if empty
        if (!isLoggedIn) {
          setCartItems([
              {
                id: 'mocha',
                title: 'Mass Gainer',
                flavor: 'Coffee',
                price: 1800,
                originalPrice: 2500,
                quantity: 1,
                image: '/assets/images/mocha-480.webp'
              },
              {
                id: 'mocha-2',
                title: 'Mass Gainer',
                flavor: 'Mango',
                price: 1800,
                originalPrice: 2500,
                quantity: 1,
                image: '/assets/images/mocha-480.webp'
              }
          ]);
        } else {
          setCartItems([]);
        }
    }
    setIsLoaded(true);
  }, [isLoggedIn, user?.uid]);

  // Save to local storage on change
  useEffect(() => {
    if (isLoaded) {
      const cartKey = isLoggedIn && user?.uid ? `gomzi_cart_${user.uid}` : 'gomzi_cart_guest';
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded, isLoggedIn, user?.uid]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  // Wait for load before rendering to avoid hydration mismatch
  if (!isLoaded) return null;

  const cartCount = cartItems.length; // Number of unique items
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, updateQuantity, removeItem, clearCart, cartCount, subtotal, originalTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
