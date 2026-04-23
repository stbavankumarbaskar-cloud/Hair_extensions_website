"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, DollarSign, PieChart, ShieldCheck } from 'lucide-react';

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-24 bg-amber-600 text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1595475243692-3b65bb2a8f6c?q=80&w=2069&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Affiliate Background"
              />
           </div>
           <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Partner With Us</h1>
              <p className="text-white/90 text-xl mb-12 italic max-w-2xl mx-auto">Join the One Love Hair Affiliate Program and earn commission by sharing your love for premium raw hair.</p>
              <button className="bg-white text-amber-600 hover:bg-zinc-100 font-bold uppercase tracking-widest py-5 px-12 rounded-xl transition-all shadow-xl">
                Apply to Program
              </button>
           </div>
        </section>

        {/* Perks */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="text-center p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
                 <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">High Commissions</h3>
                 <p className="text-slate-500 text-sm">Earn up to 10% commission on every successful referral.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
                 <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <PieChart className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">30-Day Cookie</h3>
                 <p className="text-slate-500 text-sm">Our tracking cookie lasts 30 days, giving you more time to earn.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
                 <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">Exclusive Deals</h3>
                 <p className="text-slate-500 text-sm">Get access to special discount codes for your followers.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
                 <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">Trusted Partner</h3>
                 <p className="text-slate-500 text-sm">Join a globally recognized brand for premium hair luxury.</p>
              </div>
           </div>
        </section>

        {/* Program Details */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-200">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-[40px] p-12 md:p-20 shadow-2xl shadow-zinc-200/50 border border-zinc-100 flex flex-col lg:flex-row items-center gap-16">
                 <div className="lg:w-1/2">
                    <h2 className="text-4xl font-serif font-bold text-zinc-900 mb-8 leading-tight">Become a Brand Ambassador</h2>
                    <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
                       Are you a stylist, influencer, or hair enthusiast? We're looking for partners who are as obsessed with quality as we are. 
                       By joining our program, you'll gain access to marketing tools, professional dashboards, and dedicated support.
                    </p>
                    <ul className="space-y-4 mb-10 text-zinc-700 font-medium">
                       <li className="flex items-center gap-3"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Personalized referral link</li>
                       <li className="flex items-center gap-3"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Monthly payouts via PayPal or Bank Transfer</li>
                       <li className="flex items-center gap-3"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Real-time tracking of sales and earnings</li>
                    </ul>
                    <button className="bg-zinc-900 hover:bg-black text-white font-bold uppercase tracking-widest py-5 px-12 rounded-xl transition-all">
                       Start Earning Today
                    </button>
                 </div>
                 <div className="lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop" 
                      className="w-full h-full object-cover"
                      alt="Affiliate Partner"
                    />
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
