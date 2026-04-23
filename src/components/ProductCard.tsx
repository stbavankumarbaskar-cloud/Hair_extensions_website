"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

import { useCart } from '@/lib/CartContext';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  let displayImg = product.img;
  try {
    const images = JSON.parse(product.img);
    if (Array.isArray(images) && images.length > 0) {
      displayImg = images[0];
    }
  } catch (e) {
    // Not JSON, use as is
  }

  const queryParams = new URLSearchParams({
    id: String(product.id),
    name: product.name,
    price: `₹${parseFloat(product.price || 0).toFixed(2)}`,
    img: product.img, // Send the full string (JSON or URL)
  });
  
  const oldPriceValue = product.oldPrice || product.old_price;
  if (oldPriceValue) {
    queryParams.append('oldPrice', `₹${parseFloat(oldPriceValue || 0).toFixed(2)}`);
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      variant: "Standard",
      price: product.price,
      originalPrice: product.old_price,
      qty: 1,
      image: displayImg
    });
  };

  return (
    <Link href={`/product?${queryParams.toString()}`} className="group cursor-pointer flex flex-col h-full bg-transparent">
      <div className="relative aspect-[3/4.2] bg-white overflow-hidden mb-3">
        <img 
          src={displayImg} 
          alt={product.name} 
          className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
          style={{ imageRendering: 'auto' }}
        />
        {/* Sale Tag */}
        {(product.oldPrice || product.old_price) && (
          <div className="absolute bottom-3 left-3 bg-white text-gray-800 text-[10px] tracking-wide px-3 py-1 rounded-full shadow-sm font-medium">
            Sale
          </div>
        )}
        
        {/* Quick Add icon */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 bg-white text-gray-800 w-8 h-8 rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-amber-500 hover:text-white"
        >
           <ShoppingCart className="w-[14px] h-[14px]" strokeWidth={2.5}/>
        </button>
        
        {/* Arrows (hover) */}
        <div className="absolute top-1/2 left-3 -translate-y-1/2 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronLeft className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
        </div>
        <div className="absolute top-1/2 right-3 -translate-y-1/2 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronRight className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="flex flex-col flex-grow pt-1 px-1">
        {/* Product Name */}
        <h3 className="text-[14px] text-[#2c2c2c] mb-[6px] leading-relaxed font-sans transition group-hover:opacity-80">
          {product.name} • Buy Now Pay Later
        </h3>
        
        <div className="mt-auto">
            {/* Price */}
             <div className="flex items-center space-x-[6px]">
                <span className="text-[12px] font-semibold text-[#3a3a3a]">
                   ₹{parseFloat(product.price || 0).toFixed(2)}
                </span>
                {(product.oldPrice || product.old_price) && (
                    <span className="text-[11px] text-[#9a9a9a] line-through">
                      ₹{parseFloat(product.oldPrice || product.old_price || 0).toFixed(2)}
                    </span>
                )}
            </div>
        </div>
      </div>
    </Link>
  );
}
