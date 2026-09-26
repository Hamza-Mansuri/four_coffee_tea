'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { isLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' }
  ];

  // Dummy search products for demo
  const allProducts = [
    { id: 'mocha', name: 'Mocha Feast', keywords: 'coffee chocolate cocoa caffeine drink energy beverage' },
    { id: 'atta', name: 'Atta Feast', keywords: 'flour wheat roti chapati daily nutrition baking bread' },
    { id: 'tea', name: 'Chai Feast', keywords: 'tea chai masala milk sweet immunity spices ginger cardamom beverage' }
  ];

  const searchResults = searchQuery.trim() 
    ? allProducts.filter(p => {
        const query = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(query) || p.keywords.includes(query);
      })
    : [];

  const handleProfileClick = () => {
    setIsMobileMenuOpen(false);
    if (isLoggedIn) {
      router.push('/profile');
    } else {
      router.push('/login?redirect=/profile');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      router.push(`/products/${searchResults[0].id}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="w-full bg-foreground text-white text-center py-2 text-xs font-medium tracking-widest uppercase">
        Free Shipping On Qualifying Orders
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo (Left) */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img src="/assets/images/logo.webp" alt="Gomzi" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`relative text-sm font-medium transition-colors py-2 ${isActive ? 'text-foreground' : 'text-gray-500 hover:text-accent'}`}
                >
                  {link.name}
                  {/* Underline for active state */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Utilities (Right) */}
          <div className="flex items-center space-x-5">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-400 hover:text-foreground transition-colors hidden sm:block"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={handleProfileClick}
              className="text-gray-400 hover:text-foreground transition-colors hidden sm:block"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              className="text-gray-400 hover:text-foreground transition-colors relative"
              onClick={() => window.dispatchEvent(new Event('open-cart'))}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
            <button 
              className="text-gray-400 hover:text-foreground transition-colors md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive 
                      ? 'bg-accent/10 text-accent' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-accent'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Mobile Utilities (Search & User) */}
            <div className="flex gap-6 pt-4 mt-2 px-4 border-t border-gray-100">
               <button 
                 onClick={() => {
                   setIsMobileMenuOpen(false);
                   setIsSearchOpen(true);
                 }}
                 className="flex items-center gap-2 text-gray-500 hover:text-accent font-medium"
               >
                 <Search className="w-5 h-5" />
                 <span>Search</span>
               </button>
               <button 
                 onClick={handleProfileClick}
                 className="flex items-center gap-2 text-gray-500 hover:text-accent font-medium"
               >
                 <User className="w-5 h-5" />
                 <span>Account</span>
               </button>
            </div>
          </div>
        </div>
      )}
    </header>

    {/* Search Modal overlay */}
    {isSearchOpen && (
      <div className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm flex items-start justify-center pt-20 px-4 transition-opacity">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center p-4 border-b border-gray-100">
            <Search className="w-6 h-6 text-gray-400 ml-2" />
            <input 
              type="text" 
              autoFocus
              placeholder="Search products..." 
              className="w-full px-4 py-3 text-lg focus:outline-none font-medium text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
          
          {searchQuery.trim() !== '' && (
            <div className="max-h-[60vh] overflow-y-auto">
              {searchResults.length > 0 ? (
                <ul className="py-2">
                  {searchResults.map(product => (
                    <li key={product.id}>
                      <Link 
                        href={`/products/${product.id}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-900">{product.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No products found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
}
