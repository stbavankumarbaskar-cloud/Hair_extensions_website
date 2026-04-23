"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Award, Heart, ShieldCheck, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 opacity-40">
             <img 
               src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop" 
               alt="Luxury Hair Background" 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-4 tracking-tight">Our Story</h1>
            <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          </div>
        </section>

        {/* Brand Mission */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-8">Empowering Elegance, One Strand at a Time</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  Founded with a passion for authentic beauty, One Love Hair was born from the desire to provide women across the globe with access to the highest quality, ethically sourced hair extensions.
                </p>
                <p>
                  We believe that hair is more than just an accessory—it's an expression of confidence, personality, and power. Our journey began in the heart of India, where we discovered the unparalleled quality of raw temple hair.
                </p>
                <p>
                  Today, we are proud to be a trusted name for luxury hair, committed to transparency, quality, and the empowerment of our customers.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1974&auto=format&fit=crop" 
                   alt="Premium Hair Quality" 
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-amber-500 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <div className="text-4xl font-bold mb-1">10+</div>
                <div className="text-sm uppercase tracking-widest font-bold">Years of Excellence</div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-16">The One Love Standards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Unmatched Quality</h3>
                <p className="text-slate-500 leading-relaxed">We never compromise. Every bundle is hand-picked and inspected to ensure cuticle alignment and zero shedding.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Ethical Sourcing</h3>
                <p className="text-slate-500 leading-relaxed">Our hair is sourced with respect and transparency, ensuring fair practices at every step of the supply chain.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Customer Obsession</h3>
                <p className="text-slate-500 leading-relaxed">Your satisfaction is our north star. We provide personalized support to help you find your perfect match.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-slate-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <Award className="w-16 h-16 text-amber-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 italic">Ready to experience the best?</h2>
            <p className="text-xl text-slate-400 mb-12">Join thousands of women who have found their confidence with One Love Hair.</p>
            <Link href="/products" className="bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase tracking-widest py-5 px-12 rounded-xl transition-all shadow-2xl">
              Shop The Collection
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
