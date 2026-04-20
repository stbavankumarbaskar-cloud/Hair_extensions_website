"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col items-center justify-center font-sans">
      
      <div className="bg-white p-10 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] w-full max-w-[460px] flex flex-col items-center mb-8">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center mb-8">
          <svg className="w-12 h-12 text-[#CAA45D] mb-1" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 4.5C8 1.5 3.5 4.5 3.5 9c0 4.5 8.5 9.5 8.5 9.5s8.5-5 8.5-9.5C20.5 4.5 16 1.5 12 4.5Z" opacity="0.9"/>
             <path d="M12 18.5C12 18.5 11 14 9 10" stroke="white" strokeWidth="1.2" fill="none" />
             <path d="M12 18.5C12 18.5 13 14 15 10" stroke="white" strokeWidth="1.2" fill="none" />
             <path d="M12 18.5L12 9" stroke="white" strokeWidth="1.2" fill="none" />
          </svg>
          <span className="font-serif text-[9px] tracking-[0.2em] text-[#CAA45D]">ONE LOVE HAIR</span>
        </Link>

        {/* Headings */}
        <div className="w-full text-left mb-6">
          <h1 className="text-[28px] font-semibold text-gray-900 mb-1">Sign in</h1>
          <p className="text-[15px] text-gray-500">Sign in or create an account</p>
        </div>

        {/* Shop Pay Button */}
        <button onClick={() => setIsShopModalOpen(true)} className="w-full bg-[#5a31f4] hover:bg-[#4d28d6] transition text-white py-4 rounded-md font-bold text-[15px] mb-6 shadow-sm">
          Continue with shop
        </button>

        {/* OR Divider */}
        <div className="w-full flex items-center text-gray-400 text-[13px] mb-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <div className="px-4">or</div>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Email Input */}
        <div className="w-full mb-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full border border-blue-500 rounded-md p-[14px] text-[15px] outline-none shadow-[0_0_0_1px_rgba(59,130,246,1)]"
            autoFocus
          />
        </div>

        {/* Continue Button */}
        <Link href="/checkout" className="w-full bg-[#005bd3] hover:bg-[#004bb0] transition text-white py-[14px] rounded-md font-bold text-[15px] mb-6 text-center shadow-sm block">
          Continue
        </Link>

        {/* Checkbox */}
        <div className="w-full flex items-start gap-3 mb-8">
          <input type="checkbox" className="w-5 h-5 mt-[2px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
          <span className="text-[14px] text-gray-700">Email me with news and offers</span>
        </div>

        {/* Terms */}
        <p className="text-[12px] text-gray-500 text-center">
          By continuing, you agree to our <a href="#" className="underline hover:text-gray-700">Terms of service</a>
        </p>

      </div>

      {/* Footer Link */}
      <a href="#" className="text-blue-600 hover:underline text-[13px] font-medium">Privacy policy</a>

      {/* Shop Pay Modal Overlay */}
      {isShopModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button onClick={() => setIsShopModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="p-8 flex flex-col items-center text-center">
              
              {/* Logos */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 bg-[#5a31f4] rounded-full flex items-center justify-center text-white font-bold text-xl tracking-tighter">
                  shop
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=100&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-[22px] font-bold text-gray-900 mb-1">Sign in to Shop</h2>
              <p className="text-[14px] text-gray-600 mb-8">To continue to <span className="font-bold text-gray-900">One Love Hair GmbH</span></p>

              {/* Input */}
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full border border-gray-300 rounded-full px-5 py-[14px] text-[15px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition mb-4"
                autoFocus
              />

              {/* Continue Button */}
              <button className="w-full bg-[#5a31f4] hover:bg-[#4d28d6] transition text-white py-[14px] rounded-full font-bold text-[15px] mb-4">
                Continue
              </button>

              {/* Passkey Button */}
              <button className="w-full bg-[#f1f1f1] hover:bg-[#e5e5e5] transition text-gray-900 py-[14px] rounded-full font-bold text-[15px] mb-6 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                Use a passkey
              </button>

              {/* Disclaimer */}
              <p className="text-[11px] text-gray-500 leading-relaxed mb-6">
                By continuing, you agree to Shop's <a href="#" className="underline">terms</a>, <a href="#" className="underline">privacy policy</a>, and to sharing your email, name, and avatar with One Love Hair GmbH. See their <a href="#" className="underline">terms</a> and <a href="#" className="underline">privacy policy</a>.
              </p>

              {/* Language Selector */}
              <button className="text-[12px] text-gray-500 flex items-center gap-1 hover:text-gray-700">
                English
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
