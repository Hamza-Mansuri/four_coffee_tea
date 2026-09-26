import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/assets/images/logo.webp" alt="Gomzi" className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Premium, everyday functional nutrition and natural superfoods designed for a balanced lifestyle. Welcome to Gomzi Naturals.
            </p>
            <div className="text-sm text-gray-400 space-y-1.5 flex flex-col">
              <p className="font-semibold text-gray-300">Gomzi Lifesciences LLP</p>
              
              <a href="tel:+918320077993" className="hover:text-accent transition-colors">
                +91 8320077993
              </a>
              
              <a href="https://wa.me/+918320077993" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
                WhatsApp: Chat with us
              </a>
              
              <a href="mailto:info@gomzilifesciences.in" className="hover:text-accent transition-colors">
                info@gomzilifesciences.in
              </a>
              
              <a href="https://maps.google.com/maps?q=21.189452,72.73386" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors leading-snug pt-1">
                443, 444, 445, 1st Floor, RJD Textile Park, At.Ichchhapor, Hazira Road, Surat, Gujarat 394510
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-bold mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-accent transition-colors">All products</Link></li>
              <li><Link href="/products/atta" className="hover:text-accent transition-colors">Atta Feast</Link></li>
              <li><Link href="/products/mocha" className="hover:text-accent transition-colors">Mocha Feast</Link></li>
              <li><Link href="/products/tea" className="hover:text-accent transition-colors">Chai Feast</Link></li>
            </ul>
          </div>

          {/* Our Story */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Story</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-bold mb-6">Help</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-accent transition-colors">Shipping Information</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Returns</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm text-center md:text-left">
            <Link href="/" className="hover:text-accent transition-colors">
              &copy; 2026 Gomzi Naturals. All Rights Reserved
            </Link>
          </div>
          <div className="flex gap-4">
            {/* Social / Payment placeholder if needed */}
            <span className="text-gray-500 text-sm">Follow Us | We Accept</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
