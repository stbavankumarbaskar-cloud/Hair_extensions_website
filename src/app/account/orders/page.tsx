"use client";
import React from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div className="max-w-[720px]">
      <h1 className="text-[32px] font-bold text-gray-900 mb-8">Orders</h1>

      <div className="bg-white border border-gray-200 rounded-[24px] p-24 shadow-sm flex flex-col items-center justify-center text-center">
         <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
         <p className="text-gray-500 font-medium mb-8">Go to store to place an order.</p>
         <Link 
          href="/" 
          className="h-[54px] px-8 bg-black text-white rounded-full font-bold flex items-center justify-center hover:opacity-80 transition-all active:scale-95 shadow-lg"
         >
           Shop now
         </Link>
      </div>
    </div>
  );
}
