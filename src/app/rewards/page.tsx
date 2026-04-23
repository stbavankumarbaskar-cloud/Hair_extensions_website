"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Gift, Star, Zap, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent"></div>
           </div>
           
           <div className="max-w-4xl mx-auto px-4 relative z-10">
              <Gift className="w-16 h-16 text-amber-500 mx-auto mb-8" />
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Love Rewards</h1>
              <p className="text-amber-100/70 text-xl mb-12 italic">Join our loyalty program and earn points every time you shop luxury hair.</p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase tracking-widest py-5 px-12 rounded-xl transition-all shadow-2xl">
                Join Now
              </button>
           </div>
        </section>

        {/* How it Works */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">How It Works</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                {
                  icon: <Zap className="w-10 h-10 text-amber-600" />,
                  title: "Earn Points",
                  desc: "Get 1 point for every ₹100 spent. Points are added automatically to your account."
                },
                {
                  icon: <Star className="w-10 h-10 text-amber-600" />,
                  title: "Reach Tiers",
                  desc: "The more you shop, the higher you climb. Unlock exclusive benefits in Silver, Gold, and Platinum tiers."
                },
                {
                  icon: <ShoppingBag className="w-10 h-10 text-amber-600" />,
                  title: "Redeem Rewards",
                  desc: "Convert points into discount vouchers or use them for free shipping and exclusive gifts."
                }
              ].map((step, idx) => (
                <div key={idx} className="text-center group">
                  <div className="bg-amber-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Benefits Table */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-200">
           <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100">
                 <div className="bg-zinc-900 py-6 px-8 text-white font-bold text-center uppercase tracking-[0.2em]">Membership Benefits</div>
                 <div className="divide-y divide-zinc-100">
                    <div className="flex justify-between p-6 items-center">
                       <span className="font-bold text-slate-700">Early Access to New Drops</span>
                       <div className="bg-green-100 text-green-700 p-1.5 rounded-full"><Star className="w-4 h-4 fill-current" /></div>
                    </div>
                    <div className="flex justify-between p-6 items-center">
                       <span className="font-bold text-slate-700">Exclusive Birthday Gift</span>
                       <div className="bg-green-100 text-green-700 p-1.5 rounded-full"><Star className="w-4 h-4 fill-current" /></div>
                    </div>
                    <div className="flex justify-between p-6 items-center">
                       <span className="font-bold text-slate-700">Double Points Days</span>
                       <div className="bg-green-100 text-green-700 p-1.5 rounded-full"><Star className="w-4 h-4 fill-current" /></div>
                    </div>
                    <div className="flex justify-between p-6 items-center">
                       <span className="font-bold text-slate-700">Priority Customer Support</span>
                       <div className="bg-green-100 text-green-700 p-1.5 rounded-full"><Star className="w-4 h-4 fill-current" /></div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
