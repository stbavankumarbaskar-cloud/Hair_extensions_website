"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const initialItems = [
  {
    id: 1,
    name: "Premium Wavy Clip-In Hair Extensions",
    variant: "Black, 55 CM, Wavy",
    price: 3432,
    originalPrice: 4739,
    qty: 1,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=120&h=120&fit=crop",
  }
];

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [items, setItems] = useState(initialItems);
  const [instructions, setInstructions] = useState(false);
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

  // Stop scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[60] shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0" style={{ fontFamily: "sans-serif" }}>

        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-xl font-semibold">Your Cart • ({totalQty})</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full flex items-center justify-center w-8 h-8">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

          {/* Banner */}
          <div className="bg-[#f2f2f2] text-center py-2 text-sm font-semibold border-t border-b border-gray-200">
            Pay by invoice available
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Your cart is empty</div>
          ) : (
            <div className="flex flex-col gap-4 mt-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 relative">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0 border border-gray-100" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="pr-6">
                        <p className="text-[13px] font-semibold text-gray-900 leading-snug">{item.name}</p>
                        <p className="text-[12px] text-gray-500 mt-1">{item.variant}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-gray-800 text-sm absolute right-0 top-0">
                        🗑️
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button onClick={() => updateQty(item.id, -1)} className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-sm"> − </button>
                        <span className="px-2 text-[13px] font-medium w-6 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-50 text-sm"> + </button>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <p className="text-[11px] text-gray-400 line-through m-0">{fmt(item.originalPrice)}</p>
                        <p className="text-[13px] font-semibold m-0">{fmt(item.price * item.qty)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Instructions */}
          <div className="border-t border-gray-100 pt-4 mt-2">
            <button
              onClick={() => setInstructions(!instructions)}
              className="w-full flex justify-center items-center text-[13px] text-gray-600 hover:text-black gap-1 font-medium"
            >
              Add special instructions
              <span style={{ transform: instructions ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
            </button>
            {instructions && (
              <textarea
                value={instructionText}
                onChange={(e) => setInstructionText(e.target.value)}
                placeholder="Add your note here..."
                className="w-full p-3 border border-gray-200 mt-3 rounded-md text-[13px] outline-none resize-none h-24 focus:ring-1 focus:ring-gray-300"
              />
            )}
          </div>

          <div className="text-center text-[13px] text-gray-500 italic mt-2">
            Need help choosing the right length or texture?
          </div>
          <a href="https://wa.me/41765395386" target="_blank" rel="noreferrer" className="text-center text-[13px] font-semibold text-[#25d366] flex items-center justify-center gap-1 hover:underline">
            Chat with us on WhatsApp 💬
          </a>

          <div className="text-center text-[11px] text-gray-600 space-y-1 mt-2">
            <p>Recommendation: 2-3 bundles for a full Natural look</p>
            <p>Returns accepted within 30 days for unused items only.</p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-[10px] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10">

          <Link href="/checkout" onClick={onClose} className="w-full bg-black text-white font-semibold py-3 rounded-md text-[15px] flex justify-center items-center gap-2 hover:bg-gray-900 transition">
            🔒 Checkout • {fmt(subtotal)}
          </Link>

          {/* Payment Icons */}
          <div className="flex gap-1 justify-center flex-wrap">
            {["VISA", "MC", "Apple Pay", "Klarna", "PayPal", "G Pay"].map((p) => (
              <span key={p} className="border border-gray-200 rounded px-[6px] py-[2px] text-[10px] text-gray-600 bg-gray-50 font-bold">{p}</span>
            ))}
          </div>

          {/* Shop Pay */}
          <button className="w-full bg-[#5a31f4] text-white rounded-md py-[10px] font-bold tracking-wider text-[15px] hover:bg-[#4d28d6] transition">
            shop
          </button>

          {/* PayPal */}
          <button className="w-full bg-[#ffc439] text-[#003087] rounded-md py-[10px] font-bold text-[15px] hover:bg-[#f2b934] transition italic">
            PayPal
          </button>

          <button className="w-full bg-black text-white rounded-md py-[10px] font-bold text-[15px] hover:bg-gray-900 transition flex items-center justify-center gap-1">
            <span className="text-blue-400">G</span> <span className="text-red-400">P</span><span className="text-yellow-400">a</span><span className="text-green-400">y</span>
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-gray-100">
            {[["🔒", "Secure Checkout"], ["🇨🇭", "Swiss Company"], ["📋", "Pay by Invoice & Klarna"], ["✨", "Premium Quality Hair"]].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2 text-[10px] text-gray-600 font-medium">
                <span className="text-[13px]">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </>
  );
}
