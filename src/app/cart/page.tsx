"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight, Minus, Plus, X, ShieldCheck, Truck, RefreshCw } from "lucide-react";

const initialItems = [
  {
    id: 1,
    name: "Premium Wavy Clip-In Hair Extensions",
    variant: "Black / 55 CM / Wavy",
    details: "160 Grams 7 Sets",
    price: 3446,
    originalPrice: 4739,
    qty: 1,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop",
  },
  {
    id: 2,
    name: "Premium Keratin Bond Extensions",
    variant: "Dark Brown / 75 CM / Straight",
    details: "100 Grams 100 Strands",
    price: 5100,
    originalPrice: 6200,
    qty: 1,
    image: "https://images.unsplash.com/photo-1560869713-da86a9ec0744?w=800&h=800&fit=crop",
  },
];

export default function ElegantCartPage() {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState("");
  const [instructionText, setInstructionText] = useState("");

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const fmt = (n: number) => `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans selection:bg-[#CAA45D] selection:text-white pb-20">
      
      {/* Top Banner */}
      <div className="bg-[#111] text-white text-center py-[10px] text-[11px] tracking-[0.2em] uppercase font-medium">
        Complimentary worldwide shipping on orders over R$ 5,000
      </div>

      {/* Minimal Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 lg:px-12 h-[80px] flex items-center justify-between sticky top-0 z-40">
        <div className="flex-1">
           <Link href="/" className="text-sm font-medium tracking-wide hover:text-[#CAA45D] transition">RETURN TO SHOP</Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex flex-col items-center">
            <svg className="w-8 h-8 text-[#CAA45D] mb-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C8 1.5 3.5 4.5 3.5 9c0 4.5 8.5 9.5 8.5 9.5s8.5-5 8.5-9.5C20.5 4.5 16 1.5 12 4.5Z" opacity="0.9"/>
            </svg>
            <span className="font-serif text-[10px] tracking-[0.2em] text-[#CAA45D]">ONE LOVE HAIR</span>
          </Link>
        </div>
        <div className="flex-1 flex justify-end items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-gray-800" />
          <span className="text-sm font-medium">({totalQty})</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-4">Your Shopping Bag</h1>
          <div className="w-12 h-[1px] bg-[#CAA45D] mx-auto"></div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <p className="text-xl font-serif text-gray-600 mb-8">Your bag is currently empty.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-[#CAA45D] transition-colors duration-300">
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left: Cart Items */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              <div className="hidden lg:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-[11px] font-medium text-gray-400 tracking-wider uppercase">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="group grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-6 border-b border-gray-100 relative">
                  
                  {/* Remove Button (Mobile: Top Right, Desktop: Hover Left) */}
                  <button onClick={() => removeItem(item.id)} className="absolute top-6 right-0 sm:hidden text-gray-400 hover:text-black transition p-2">
                    <X className="w-5 h-5" />
                  </button>

                  <div className="sm:col-span-6 flex gap-6 items-center">
                    <div className="w-24 h-32 lg:w-32 lg:h-40 bg-gray-50 flex-shrink-0 overflow-hidden relative group-hover:shadow-md transition-shadow duration-300">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="flex flex-col">
                      <Link href="#" className="text-[15px] font-serif font-medium text-gray-900 leading-snug hover:text-[#CAA45D] transition mb-1">{item.name}</Link>
                      <p className="text-[12px] text-gray-500 mb-1">{item.variant}</p>
                      <p className="text-[12px] text-gray-400 mb-3">{item.details}</p>
                      <button onClick={() => removeItem(item.id)} className="text-[11px] uppercase tracking-wider text-gray-400 hover:text-red-500 transition w-max flex items-center gap-1">
                        <X className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-3 flex justify-start sm:justify-center items-center">
                    <div className="flex items-center border border-gray-200 bg-white">
                      <button onClick={() => updateQty(item.id, -1)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-[13px] font-medium">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-3 text-left sm:text-right flex flex-col justify-center">
                    <span className="text-gray-400 text-[12px] line-through mb-1">{fmt(item.originalPrice * item.qty)}</span>
                    <span className="text-[16px] font-medium text-gray-900">{fmt(item.price * item.qty)}</span>
                  </div>

                </div>
              ))}

              {/* Special Instructions */}
              <div className="pt-6">
                <p className="text-sm font-medium text-gray-900 mb-3">Add a note to your order</p>
                <textarea
                  value={instructionText}
                  onChange={(e) => setInstructionText(e.target.value)}
                  placeholder="Special instructions or gift message..."
                  className="w-full border border-gray-200 bg-white p-4 text-sm focus:outline-none focus:border-[#CAA45D] focus:ring-1 focus:ring-[#CAA45D] transition resize-none h-28"
                />
              </div>

            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 lg:p-10 border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] sticky top-[120px]">
                
                <h2 className="text-2xl font-serif text-gray-900 mb-8 pb-4 border-b border-gray-100">Order Summary</h2>

                <div className="space-y-4 text-sm text-gray-600 mb-8">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#CAA45D] font-medium">{subtotal >= 5000 ? "Complimentary" : "Calculated at checkout"}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-between items-end mb-8">
                  <span className="text-lg font-serif text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-medium text-gray-900">{fmt(subtotal >= 5000 ? subtotal : subtotal + 250)}</span>
                    <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">Taxes included</p>
                  </div>
                </div>

                <Link href="/checkout" className="block w-full bg-black text-white text-center py-5 text-sm font-medium tracking-widest uppercase hover:bg-[#CAA45D] transition-colors duration-300 mb-6">
                  Proceed to Checkout
                </Link>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-gray-500">
                     <ShieldCheck className="w-5 h-5 text-[#CAA45D]" strokeWidth={1.5} />
                     <span className="text-sm">Secure, encrypted checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                     <Truck className="w-5 h-5 text-[#CAA45D]" strokeWidth={1.5} />
                     <span className="text-sm">Complimentary worldwide shipping</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                     <RefreshCw className="w-5 h-5 text-[#CAA45D]" strokeWidth={1.5} />
                     <span className="text-sm">30-day elegant return policy</span>
                  </div>
                </div>

                {/* Promo Code Toggle */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-900 mb-3">Promo Code</p>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Enter your code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 border border-r-0 border-gray-200 bg-white p-3 text-sm focus:outline-none focus:border-[#CAA45D]"
                    />
                    <button className="bg-gray-100 px-6 text-sm font-medium hover:bg-gray-200 transition text-gray-700">
                      Apply
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}