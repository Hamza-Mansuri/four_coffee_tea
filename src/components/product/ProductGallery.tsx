'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainImage = images[currentIndex];
  
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play carousel every 2 seconds unless hovering
  useEffect(() => {
    if (isZooming) return; // Pause on hover
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    
    return () => clearInterval(timer);
  }, [images.length, isZooming]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '250%',
      backgroundRepeat: 'no-repeat'
    });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6">
      
      {/* Thumbnails (Carousel replacement) */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar">
        {images.map((img, idx) => {
          const isMainPackagedImage = img.includes('-480');
          return (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-gray-50 ${currentIndex === idx ? 'border-accent' : 'border-transparent hover:border-gray-300'}`}
            >
              <Image 
                src={img} 
                alt={`Thumbnail ${idx}`} 
                fill 
                className={isMainPackagedImage ? "object-contain p-1" : "object-cover"} 
              />
            </button>
          );
        })}
      </div>

      {/* Main Image with Zoom */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden cursor-crosshair border border-gray-100 flex-grow"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => { setIsZooming(false); setZoomStyle({}); }}
        onMouseMove={handleMouseMove}
      >
        {images.map((img, idx) => {
          const isMainPackagedImage = img.includes('-480');
          return (
            <Image 
              key={idx}
              src={img}
              alt={`Product Main Image ${idx}`}
              fill
              className={`transition-opacity duration-700 ease-in-out ${isMainPackagedImage ? 'object-contain p-8' : 'object-cover'} ${
                isZooming 
                  ? 'opacity-0' 
                  : currentIndex === idx 
                    ? 'opacity-100 z-10' 
                    : 'opacity-0 z-0'
              }`}
              priority={idx === 0}
            />
          );
        })}
        {/* Zoomed Background overlay */}
        {isZooming && (
          <div 
            className="absolute inset-0 z-20 pointer-events-none"
            style={zoomStyle}
          />
        )}
      </div>

    </div>
  );
}
