"use client";
import React, { useState, Suspense } from 'react';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { ShoppingCart, Search, Menu, ChevronDown, ChevronUp, Star, ChevronLeft, ChevronRight, User, Heart, Lock } from 'lucide-react';

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans tracking-tight">Loading product details...</div>}>
      <ProductDetails />
    </Suspense>
  );
}

function ProductDetails() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || "Glam Kinky Curly Raw Indian Remy Hair Extensions • Buy Now Pay Later";
  const priceStr = searchParams.get('price') || "CHF 155.00";
  const oldPriceStr = searchParams.get('oldPrice');
  const img = searchParams.get('img') || "https://images.unsplash.com/photo-1595424564881-81f19c9918bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 155.00;
  const currencySymbol = priceStr.replace(/[0-9.]/g, '').trim() || 'CHF';

  const [selectedSize, setSelectedSize] = useState('40 CM');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['40 CM', '45 CM', '50 CM', '55 CM', '60 CM', '65 CM', '70 CM'];
  const colors = ['Black', 'Brown'];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Top Header Placeholder */}
      <div className="bg-[#2a2a2a] text-white text-sm text-center py-2.5 font-bold tracking-wide">
        Welcome to One Love Hair® GmbH Switzerland
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fdfdfd] border-b border-gray-100">
        <div className="w-full px-4 lg:px-8">
          <div className="flex justify-between items-center h-[90px] lg:h-[110px]">
             {/* Left Area: Logo + Nav */}
             <div className="flex items-center">
                 {/* Logo */}
                 <div className="flex flex-col items-center flex-shrink-0 cursor-pointer mr-6 lg:mr-10 mt-1">
                   <div className="text-[#CAA45D] mb-[4px]">
                      {/* Tree/Heart stylized logo */}
                      <svg className="w-10 h-10 lg:w-[48px] lg:h-[48px]" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M12 4.5C8 1.5 3.5 4.5 3.5 9c0 4.5 8.5 9.5 8.5 9.5s8.5-5 8.5-9.5C20.5 4.5 16 1.5 12 4.5Z" opacity="0.9"/>
                         <path d="M12 18.5C12 18.5 11 14 9 10" stroke="white" strokeWidth="1.2" fill="none" />
                         <path d="M12 18.5C12 18.5 13 14 15 10" stroke="white" strokeWidth="1.2" fill="none" />
                         <path d="M12 18.5L12 9" stroke="white" strokeWidth="1.2" fill="none" />
                         <circle cx="8" cy="8" r="1.2" fill="white" />
                         <circle cx="16" cy="8" r="1.2" fill="white" />
                         <circle cx="12" cy="6" r="1.2" fill="white" />
                         <circle cx="10" cy="11" r="1" fill="white" />
                         <circle cx="14" cy="11" r="1" fill="white" />
                      </svg>
                   </div>
                   <span className="font-serif font-medium text-[8px] lg:text-[10px] tracking-[0.2em] text-[#CAA45D]">ONE LOVE HAIR</span>
                 </div>

                 {/* Desktop Navigation */}
                 <nav className="hidden xl:flex items-center space-x-6 lg:space-x-[24px] mt-2">
                   <a href="/" className="text-[#1a202c] hover:text-[#CAA45D] font-medium text-sm lg:text-[14px] transition-colors">Home</a>
                   <a href="#" className="text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[14px] transition-colors">Premium Hair Extensions</a>
                   <a href="#" className="text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[14px] transition-colors">Premium Clip-In Hair Extensions</a>
                   <a href="#" className="text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[14px] transition-colors">Premium Keratin Bond Extensions</a>
                   <a href="#" className="text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[14px] transition-colors">More</a>
                 </nav>
             </div>

             {/* Right Area: Action Icons */}
            <div className="flex items-center space-x-5 lg:space-x-[20px] text-[#2c3e50] mt-2">
              <div className="hidden sm:flex items-center cursor-pointer text-[13px] font-normal hover:text-[#CAA45D] transition">
                 CHF / EN <ChevronDown className="w-[14px] h-[14px] ml-[2px] opacity-70" strokeWidth={2}/>
              </div>
              <div className="hidden sm:flex items-center cursor-pointer text-[13px] font-normal hover:text-[#CAA45D] transition">
                 Search
              </div>
              
              <div className="hidden sm:flex items-center cursor-pointer text-[13px] font-normal hover:text-[#CAA45D] transition">
                 Account
              </div>

               <div className="flex items-center cursor-pointer hover:text-[#CAA45D] transition">
                 <span className="hidden sm:inline text-[13px] font-normal text-[#1a202c]">Cart</span>
              </div>
              <Menu className="w-6 h-6 xl:hidden cursor-pointer text-gray-800" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12 relative">
        
        {/* Reviews Side Badge */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#333] text-white py-3 px-2 rounded-l-md cursor-pointer writing-vertical-rl flex items-center justify-center shadow-lg z-40 transform rotate-180 hover:bg-black transition-colors">
           <Star className="w-4 h-4 mb-2 fill-current" />
           <span className="text-sm font-semibold tracking-wider font-sans [writing-mode:vertical-rl]">Reviews</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
          
          {/* Left: Product Media */}
          <div className="w-full lg:w-[55%] flex flex-col md:flex-row gap-4">
            
            {/* Gallery Thumbnails (hidden on mobile, visible on medium+ screens) */}
            <div className="hidden md:flex flex-col gap-4 w-[100px] flex-shrink-0">
               <div className="border-2 border-black rounded p-1 cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1595424564881-81f19c9918bd?auto=format&fit=crop&w=200&q=80" alt="Thumbnail 1" className="w-full aspect-square object-cover" />
               </div>
               <div className="border border-gray-200 rounded p-1 cursor-pointer hover:border-gray-400 transition-colors">
                  <img src="https://images.unsplash.com/photo-1616428789366-a3d5e21fb2b9?auto=format&fit=crop&w=200&q=80" alt="Thumbnail 2" className="w-full aspect-square object-cover" />
               </div>
               <div className="border border-gray-200 rounded p-1 cursor-pointer hover:border-gray-400 transition-colors">
                  <img src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=200&q=80" alt="Thumbnail 3" className="w-full aspect-square object-cover" />
               </div>
               <div className="border border-gray-200 rounded p-1 cursor-pointer hover:border-gray-400 transition-colors opacity-50 relative">
                  <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=200&q=80" alt="Thumbnail 4" className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-lg bg-white/60">+3</div>
               </div>
            </div>

            {/* Main Image */}
            <div className="w-full relative aspect-[4/5] md:aspect-auto bg-[#f8f9fa] rounded-none md:rounded-lg overflow-hidden flex-grow">
               <img 
                 src={img} 
                 alt={name} 
                 className="w-full h-full object-cover"
               />
            </div>
            
            {/* Mobile Thumbnails */}
            <div className="flex md:hidden gap-3 overflow-x-auto pb-2 custom-scrollbar">
               <div className="w-[80px] flex-shrink-0 border-2 border-black rounded p-1">
                  <img src="https://images.unsplash.com/photo-1595424564881-81f19c9918bd?auto=format&fit=crop&w=200&q=80" alt="Thumbnail 1" className="w-full aspect-square object-cover" />
               </div>
               <div className="w-[80px] flex-shrink-0 border border-gray-200 rounded p-1">
                  <img src="https://images.unsplash.com/photo-1616428789366-a3d5e21fb2b9?auto=format&fit=crop&w=200&q=80" alt="Thumbnail 2" className="w-full aspect-square object-cover" />
               </div>
               <div className="w-[80px] flex-shrink-0 border border-gray-200 rounded p-1">
                  <img src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=200&q=80" alt="Thumbnail 3" className="w-full aspect-square object-cover" />
               </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-[45%] flex flex-col font-sans lg:py-4">
            
            {/* Title */}
            <h1 className="text-3xl md:text-[38px] font-bold text-gray-900 leading-tight tracking-tight mb-4">
              {name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline space-x-3 mb-8">
              <span className="text-xl md:text-[22px] font-semibold text-gray-900">{priceStr}</span>
              {oldPriceStr && (
                  <span className="text-lg md:text-[18px] text-gray-400 line-through">{oldPriceStr}</span>
              )}
            </div>
            
            <div className="w-full h-[1px] bg-gray-200 mb-8"></div>

            {/* Size Options */}
            <div className="mb-6">
              <div className="text-gray-900 font-medium mb-3">Size</div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-md border text-sm font-medium transition-all ${
                      selectedSize === size 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-gray-800 border-gray-200 hover:border-gray-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Indicator */}
            <div className="mb-6">
               <p className="text-gray-700 font-medium">Weight <span className="font-normal text-gray-500">100 Grams</span></p>
            </div>

            {/* Color Options */}
            <div className="mb-8">
              <div className="text-gray-900 font-medium mb-3">Color</div>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-[120px] py-2.5 rounded-md border text-sm font-medium transition-all ${
                      selectedColor === color 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-gray-800 border-gray-200 hover:border-gray-800'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-md h-[54px] w-full sm:w-[120px]">
                 <button 
                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
                   className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                 >
                   -
                 </button>
                 <div className="flex-1 text-center font-medium">{quantity}</div>
                 <button 
                   onClick={() => setQuantity(quantity + 1)}
                   className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                 >
                   +
                 </button>
              </div>

              {/* Add to Cart Button */}
              <button className="flex-1 h-[54px] bg-black hover:bg-[#222] text-white flex items-center justify-center space-x-2 rounded-md transition-all font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg">
                <Lock className="w-4 h-4" />
                <span>Add to cart - {currencySymbol} {(numericPrice * quantity).toFixed(2)}</span>
              </button>
            </div>
            
            {/* Express Checkout options placeholder */}
            <button className="w-full h-[54px] bg-[#5a31f4] hover:bg-[#4d2ad1] text-white flex items-center justify-center rounded-md font-bold text-lg mb-8 transition-colors shadow-md">
               Shop Pay
            </button>

            {/* Product description / Accordions */}
            <div className="mt-4 border-t border-gray-200 divide-y divide-gray-200 text-sm">
                <details className="group py-4" open>
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-base">
                        <span>Description</span>
                        <span className="transition group-open:rotate-180">
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        </span>
                    </summary>
                    <div className="text-gray-600 mt-3 leading-relaxed">
                        <p className="mb-2">Experience the luxury of our Glam Kinky Curly Raw Indian Remy Hair. Sourced ethically from temples in India, this 100% raw and unprocessed hair delivers unmatched volume and texture.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>100% Unprocessed Raw Indian Hair</li>
                            <li>Cuticles aligned in one direction</li>
                            <li>Can be dyed, bleached, and heat-styled</li>
                            <li>Lasts 3-5 years with proper care</li>
                        </ul>
                    </div>
                </details>
                <details className="group py-4">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-base">
                        <span>Shipping & Returns</span>
                        <span className="transition group-open:rotate-180">
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        </span>
                    </summary>
                    <div className="text-gray-600 mt-3 leading-relaxed">
                        Orders process within 1-3 business days. Free shipping on all orders over CHF 200. We offer a 14-day return policy for unused and unwashed extensions.
                    </div>
                </details>
            </div>

          </div>
        </div>
      </main>

       {/* Footer */}
       <footer className="bg-zinc-900 text-white pt-20 pb-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center mb-6">
                <div className="flex flex-col items-center justify-center border-2 border-[#CAA45D] rounded-full w-10 h-10 mr-2">
                   <span className="text-[#CAA45D] font-serif font-bold text-sm">LH</span>
                </div>
                <span className="font-serif font-semibold text-xl tracking-wider text-white">LOVE HAIR</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6 max-w-sm">
                Premium 100% human hair extensions, wigs, and bundles. Guaranteed luxury & quality.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-zinc-400 hover:text-[#CAA45D] transition">Shop All</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#CAA45D] transition">Human Hair Wigs</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#CAA45D] transition">Hair Bundles</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-zinc-400 hover:text-[#CAA45D] transition">About Us</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#CAA45D] transition">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
             <p>&copy; {new Date().getFullYear()} LOVE HAIR Extension Store. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
