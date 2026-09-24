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
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Premium Sports Nutrition Supplements manufactured with international quality standards.
            </p>
            <div className="text-sm text-gray-400 space-y-2">
              <p>+91 98752 70200</p>
              <p><a href="mailto:info@ragnutrition.com" className="hover:text-accent transition-colors">info@ragnutrition.com</a></p>
              <p className="mt-4 leading-relaxed">
                G-23-TIME SQUARE, Gaurav Path Road,<br />
                TP 10 Main Rd, opp. Shree Bharti Residency,<br />
                Surat, Gujarat 394510
              </p>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-bold mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-accent transition-colors">All products</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Atta Feast</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Mocha Feast</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Chai Feast</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Vitamins</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Everyday Essentials</Link></li>
            </ul>
          </div>

          {/* Our Story */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Story</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Careers</Link></li>
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
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; 2026 Gomzi Supplement by RAG. All Rights Reserved
          </p>
          <div className="flex gap-4">
            {/* Social / Payment placeholder if needed */}
            <span className="text-gray-500 text-sm">Follow Us | We Accept</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
