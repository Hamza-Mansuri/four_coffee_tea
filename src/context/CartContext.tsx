'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string; // The product string id
  title: string;
  flavor: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  originalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isLoggedIn } = useAuth();

  const fetchBackendCart = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cart', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.items) {
          // Map backend items to frontend CartItem format
          const mappedItems: CartItem[] = data.items.map((i: any) => ({
            id: i.product.id,
            title: i.product.title,
            flavor: i.product.subtitle || '',
            price: i.product.price,
            originalPrice: i.product.originalPrice || i.product.price,
            quantity: i.quantity,
            image: i.product.images[0] || ''
          }));
          setCartItems(mappedItems);
        }
      }
    } catch (e) {
      console.error('Error fetching backend cart', e);
    }
  };

  // Load from local storage or backend
  useEffect(() => {
    if (isLoggedIn) {
      fetchBackendCart().then(() => setIsLoaded(true));
    } else {
      const savedCart = localStorage.getItem('gomzi_cart_guest');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {}
      } else {
        setCartItems([]);
      }
      setIsLoaded(true);
    }
  }, [isLoggedIn]);

  // Save to local storage for guests only
  useEffect(() => {
    if (isLoaded && !isLoggedIn) {
      localStorage.setItem('gomzi_cart_guest', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded, isLoggedIn]);

  const addToCart = async (item: CartItem) => {
    // Optimistic update
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });

    // Sync with backend if logged in
    if (isLoggedIn) {
      const currentQuantity = cartItems.find(i => i.id === item.id)?.quantity || 0;
      await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: item.id, quantity: currentQuantity + item.quantity }),
        credentials: 'include'
      });
    }
  };

  const updateQuantity = async (id: string, delta: number) => {
    let newQuantity = 1;
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));

    if (isLoggedIn) {
      await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity: newQuantity }),
        credentials: 'include'
      });
    }
  };

  const removeItem = async (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));

    if (isLoggedIn) {
      await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (!isLoggedIn) {
      localStorage.removeItem('gomzi_cart_guest');
    }
  };

  if (!isLoaded) return null;

  const cartCount = cartItems.length;
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
