'use client';

import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[#fdfbf7] min-h-screen pt-12 lg:pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’d love to hear from you. Reach out to us for any queries, support, or just to say hello!
          </p>
        </div>

        {/* Contact Info & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-xl overflow-hidden mb-20">
          
          {/* Company Details */}
          <div className="p-10 lg:p-14 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Gomzi Lifesciences LLP</h2>
            
            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                  <Phone className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Contact Number</h3>
                  <a href="tel:+918320077993" className="text-gray-600 hover:text-accent transition-colors">+91 8320077993</a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">WhatsApp</h3>
                  <a href="https://wa.me/+918320077993" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition-colors">
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                  <Mail className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Email Address</h3>
                  <a href="mailto:info@gomzilifesciences.in" className="text-gray-600 hover:text-accent transition-colors">
                    info@gomzilifesciences.in
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                  <MapPin className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    443, 444, 445, 1st Floor, RJD Textile Park,<br />
                    At.Ichchhapor, Hazira Road,<br />
                    Surat, Gujarat 394510
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="h-[400px] lg:h-auto w-full relative bg-gray-200">
            <iframe 
              src="https://maps.google.com/maps?q=21.189452,72.73386&hl=en&z=15&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}
