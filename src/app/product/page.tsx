"use client";
import React, { useState, Suspense } from 'react';
import Head from 'next/head';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShoppingCart, Search, Menu, ChevronDown, ChevronUp, Star, ChevronLeft, ChevronRight, User, Heart, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/lib/CartContext';

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans tracking-tight">Loading product details...</div>}>
      <ProductDetails />
    </Suspense>
  );
}

function ProductDetails() {
  const { addToCart, setIsCartOpen } = useCart();
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || "Glam Kinky Curly Raw Indian Remy Hair Extensions • Buy Now Pay Later";
  const id = searchParams.get('id') || "glam-kinky-curly"; 
  const priceStr = searchParams.get('price') || "₹ 15,500.00";
  const oldPriceStr = searchParams.get('oldPrice');
  const imgParam = searchParams.get('img');
  
  let productImages: string[] = [];
  try {
    if (imgParam) {
      const parsed = JSON.parse(imgParam);
      productImages = Array.isArray(parsed) ? parsed : [parsed];
    }
  } catch (e) {
    productImages = imgParam ? [imgParam] : ["https://images.unsplash.com/photo-1595424564881-81f19c9918bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"];
  }

  const [activeImage, setActiveImage] = useState(productImages[0]);
  const [selectedSize, setSelectedSize] = useState('40 CM');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);

  const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 15500.00;
  const currencySymbol = priceStr.replace(/[0-9.]/g, '').trim() || '₹';

  const handleAddToCart = () => {
    addToCart({
      id: `${id}-${selectedSize}-${selectedColor}`,
      name: name,
      variant: `${selectedColor}, ${selectedSize}`,
      price: numericPrice,
      originalPrice: oldPriceStr ? parseFloat(oldPriceStr.replace(/[^0-9.]/g, '')) : undefined,
      qty: quantity,
      image: activeImage,
    });
  };

  const sizes = ['40 CM', '45 CM', '50 CM', '55 CM', '60 CM', '65 CM', '70 CM'];
  const colors = ['Black', 'Brown'];

  const router = useRouter();
  const handleShopPay = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <CartDrawer />

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12 relative">
        
        {/* Reviews Side Badge */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#333] text-white py-3 px-2 rounded-l-md cursor-pointer writing-vertical-rl flex items-center justify-center shadow-lg z-40 transform rotate-180 hover:bg-black transition-colors">
           <Star className="w-4 h-4 mb-2 fill-current" />
           <span className="text-sm font-semibold tracking-wider font-sans [writing-mode:vertical-rl]">Reviews</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
          
          {/* Left: Product Media */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6">
            
            {/* Main Image */}
            <div className="w-full relative bg-white rounded-none md:rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center min-h-[400px] md:min-h-[700px] group/main">
               <img 
                 src={activeImage} 
                 alt={name} 
                 className="w-full h-full object-contain transition-all duration-700 group-hover/main:scale-[1.02]"
                 style={{ 
                   imageRendering: 'auto'
                 }}
               />
               <div className="absolute inset-0 bg-black/0 group-hover/main:bg-black/[0.01] transition-colors pointer-events-none"></div>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
               {productImages.map((img, idx) => (
                 <div 
                   key={idx} 
                   onClick={() => setActiveImage(img)}
                   className={`w-[100px] md:w-[120px] aspect-square flex-shrink-0 border-2 rounded-md p-1 cursor-pointer transition-all snap-start ${activeImage === img ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
                 >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-sm" />
                 </div>
               ))}
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
              <span className="text-xl md:text-[22px] font-semibold text-gray-900">₹ {numericPrice.toFixed(2)}</span>
              {oldPriceStr && (
                  <span className="text-lg md:text-[18px] text-gray-400 line-through">
                    ₹ {parseFloat(oldPriceStr.replace(/[^0-9.]/g, '') || "0").toFixed(2)}
                  </span>
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
              <button 
                onClick={handleAddToCart}
                className="flex-1 h-[54px] bg-black hover:bg-[#222] text-white flex items-center justify-center space-x-2 rounded-md transition-all font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg"
              >
                <Lock className="w-4 h-4" />
                <span>Add to cart - {currencySymbol} {(numericPrice * quantity).toFixed(2)}</span>
              </button>
            </div>
            
            {/* Express Checkout options */}
            <button 
              onClick={handleShopPay}
              className="w-full h-[54px] bg-[#5a31f4] hover:bg-[#4d2ad1] text-white flex items-center justify-center rounded-md font-bold text-lg mb-8 transition-colors shadow-md"
            >
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
                        Orders process within 1-3 business days. Free shipping on all orders over ₹ 2,000. We offer a 14-day return policy for unused and unwashed extensions.
                    </div>
                </details>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
