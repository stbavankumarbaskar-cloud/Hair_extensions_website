"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, Star, ChevronLeft, ChevronRight, User, ChevronDown, ChevronUp, ShieldCheck, Truck, Heart, Award } from 'lucide-react';
import CartDrawer from '../components/CartDrawer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const FAQS = [
  { question: "Why Choose One Love Hair GmbH?", answer: "We provide top-quality raw Indian hair that is ethically sourced, thoroughly inspected, and completely unprocessed to ensure maximum durability and natural blend." },
  { question: "What is your Return Policy ?", answer: "We accept returns and exchanges within 14 days of delivery, provided the hair has not been altered, washed, or worn. Custom orders are final sale." },
  { question: "When will I get my order?", answer: "Standard shipping typically takes 3-5 business days. International orders may take 7-14 business days depending on customs processing." },
  { question: "Where are your products manufactured?", answer: "Our raw hair represents authentic Indian origin, sourced directly from selective temples and manufactured in our dedicated quality-controlled facilities." },
  { question: "How much does shipping cost?", answer: "Domestic shipping is typically calculated at checkout based on location. We often offer free shipping on orders over a certain threshold." },
  { question: "Can Your Raw Hair Be Colored or Bleached?", answer: "Yes! Since our hair is 100% raw and unprocessed, it takes bleach and color exceptionally well. We recommend having a professional colorist perform these services." },
  { question: "What is Raw Hair and why its expensive", answer: "Raw hair is completely unprocessed and chemical-free, meaning all cuticles are intact and aligned. The meticulous sourcing and exceptional longevity make it a premium investment." },
  { question: "Why Do We Only Sell Indian Hair?", answer: "Indian hair perfectly mimics the natural texture of diverse hair types, remaining lightweight, bouncy, and highly versatile for styling." },
  { question: "What Payment Methods Do You Accept?", answer: "We accept major credit cards (Visa, MasterCard, Amex), PayPal, Klarna, Shop Pay, TWINT, and Apple Pay." },
  { question: "Do You Offer Financing Options?", answer: "Yes, we partner with Klarna and Shop Pay to offer convenient buy-now, pay-later installment options at checkout." },
  { question: "Do You Have a Wholesale Program?", answer: "Absolutely. We offer competitive wholesale pricing for verifiable salon owners and businesses. Please contact our wholesale department for more information." }
];

export default function Home() {

  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbReviews, setDbReviews] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);
  const [randomTrending, setRandomTrending] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/frontpage')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.products) setDbProducts(data.products);
          if (data.reviews) setDbReviews(data.reviews);
          if (data.banners) setBanners(data.banners);
          if (data.faqs) setFaqs(data.faqs);
        }
      })
      .catch(err => console.error("DB Fetch Error:", err));
  }, []);

  // Set random trending products when dbProducts changes
  useEffect(() => {
    if (dbProducts.length > 0) {
      const shuffled = [...dbProducts].sort(() => 0.5 - Math.random());
      setRandomTrending(shuffled.slice(0, 4));
    }
  }, [dbProducts]);

  // Interval for banner slider
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBannerIdx(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const displayReviews = dbReviews;
  const currentReview = displayReviews[currentReviewIdx];


  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleNextReview = () => {
    setCurrentReviewIdx((prev) => (prev + 1) % displayReviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIdx((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
  };

  // Auto-slide reviews
  useEffect(() => {
    if (displayReviews.length <= 1) return;
    const timer = setInterval(() => {
      handleNextReview();
    }, 5000);
    return () => clearInterval(timer);
  }, [displayReviews.length]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />

      <main>
        {/* Hero Section - Dynamic Banners */}
        <div className="relative h-[450px] md:h-[650px] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
          {banners.length > 0 ? (
            banners.map((banner, idx) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentBannerIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
              >
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
                  <div className="w-16 h-1 bg-amber-500 mb-6 mx-auto animate-pulse"></div>
                  <h2 className="text-4xl md:text-7xl font-serif text-white font-bold mb-4 uppercase tracking-tight drop-shadow-2xl">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-amber-100 mb-10 font-bold italic drop-shadow-md">
                    {banner.subtitle}
                  </p>
                  <Link
                    href={banner.link_url || '/products'}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-black uppercase tracking-widest py-4 px-12 rounded-xl transition-all transform hover:scale-105 shadow-2xl shadow-amber-900/40 text-xs"
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="relative z-10 text-center px-4">
              <h1 className="text-4xl md:text-6xl font-serif text-white font-black">LOVE HAIR</h1>
              <p className="text-amber-400 mt-4 font-bold">Premium Extensions & Wigs</p>
            </div>
          )}

          {/* Dots Navigation */}
          {banners.length > 1 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBannerIdx(idx)}
                  className={`w-12 h-1.5 rounded-full transition-all ${idx === currentBannerIdx ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Premium Virgin Hair Extension */}
        <section className="py-20 px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[28px] font-serif font-bold text-[#1a202c] mb-2 tracking-tight">New Arrivals</h2>
              <p className="text-gray-500 text-sm italic">Discover our latest premium additions</p>
              <div className="w-16 h-[3px] bg-[#e65c00] mt-2"></div>
            </div>
            <Link href="/products" className="hidden sm:inline-block text-[#e65c00] font-semibold hover:underline border-b-2 border-transparent transition">Shop Newest →</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {dbProducts.slice(0, 8).length > 0 ? (
              dbProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-gray-400">Loading our latest collection...</div>
            )}
          </div>
        </section>

        {/* Trending Collections */}
        <section className="py-20 px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[28px] font-serif font-bold text-[#1a202c] mb-2 tracking-tight">Trending Collections</h2>
              <div className="w-16 h-[3px] bg-[#e65c00]"></div>
            </div>
            <Link href="/products" className="hidden sm:inline-block text-[#e65c00] font-semibold hover:underline border-b-2 border-transparent transition">Shop All →</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {randomTrending.length > 0 ? (
              randomTrending.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-gray-400 font-medium">Picking the best for you...</div>
            )}
          </div>
        </section>

        {/* Hot Search Words */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
          <h2 className="text-2xl font-serif font-bold text-center mb-8">Hot search words</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Premium Indian Raw Hair", "HD Lace Frontal Wigs", "Clip-in Hair Extensions",
              "Deep Wave Bundles", "Seamless Tape-ins", "Glueless Body Wave Wigs",
              "Keratin Bond Extensions", "Lace Closure Indian Hair",
              "Blonde Human Hair Wigs", "Luxury Hair Weave"
            ].map((tag, idx) => (
              <Link
                key={idx}
                href={`/products?category=${encodeURIComponent(tag)}`}
                className="bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-900 px-4 py-2 rounded-full cursor-pointer transition text-sm font-medium border border-gray-200 hover:border-amber-300 shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-[32px] font-sans text-center text-gray-900 mb-3 tracking-tight">Reviews from Our Customers</h2>

            <div className="flex items-center justify-center space-x-2 text-[15px] mb-10">
              <div className="flex text-black mr-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-[18px] h-[18px] fill-current" />)}
              </div>
              <span className="font-semibold text-gray-900">5.00</span>
              <div className="flex items-center text-gray-700">
                <Star className="w-3 h-3 fill-current mx-[2px] opacity-70" />
                <span>(34)</span>
              </div>
              <div className="flex items-center text-teal-600 ml-2 font-medium">
                <svg className="w-[18px] h-[18px] mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="M22 4 12 14.01l-3-3"></path></svg>
                <span className="text-black">Verified</span>
              </div>
            </div>

            {displayReviews.length > 0 ? (
              <div className="bg-[#f8f9fa] px-8 py-10 rounded-sm flex flex-col items-center max-w-4xl mx-auto min-h-[320px] justify-center transition-all duration-300">
                <div className="text-teal-600 text-[60px] font-serif leading-[0.5] mb-8 font-bold">
                  ”
                </div>
                <p className="text-[19px] leading-relaxed text-center text-gray-900 mb-8 font-sans max-w-[800px] min-h-[85px]">
                  {currentReview.text}
                </p>

                <div className="flex justify-center text-teal-600 mb-6 space-x-[2px]">
                  {[...Array(currentReview.rating)].map((_, i) => <Star key={i} className="w-[26px] h-[26px] fill-current" />)}
                </div>

                <div className="text-center">
                  <div className="font-bold text-gray-900 text-[15px] mb-1">{currentReview.name}</div>
                  <a href="#" className="text-gray-900 underline text-[15px] hover:text-teal-700 transition">{currentReview.company}</a>
                </div>
              </div>
            ) : (
              <div className="bg-[#f8f9fa] px-8 py-20 rounded-sm text-center text-gray-400 font-medium">
                Be the first to share your experience with our products!
              </div>
            )}

            {displayReviews.length > 0 && (
              <div className="flex justify-center mt-8 space-x-6">
                <button suppressHydrationWarning aria-label="Previous Review" onClick={handlePrevReview} className="text-black hover:text-teal-600 transition p-2 cursor-pointer">
                  <ChevronLeft className="w-5 h-5 mx-2" strokeWidth={2} />
                </button>
                <button suppressHydrationWarning aria-label="Next Review" onClick={handleNextReview} className="text-black hover:text-teal-600 transition p-2 cursor-pointer">
                  <ChevronRight className="w-5 h-5 mx-2" strokeWidth={2} />
                </button>
              </div>
            )}

            <div className="mt-14 text-center">
              <p className="text-[13px] font-semibold text-gray-800 mb-6 tracking-wide">Trusted Indian Payment Partners</p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                {/* UPI */}
                <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 group hover:border-blue-400 transition-colors">
                  <div className="flex flex-col leading-none">
                    <span className="text-[10px] font-black text-blue-600 italic">UPI</span>
                    <div className="flex gap-0.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">UNIFIED PAYMENTS INTERFACE</span>
                </div>

                {/* RuPay */}
                <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm flex items-center group hover:border-orange-400 transition-colors">
                  <span className="text-[14px] font-black italic tracking-tighter">
                    <span className="text-orange-500">Ru</span><span className="text-blue-700">Pay</span>
                  </span>
                </div>

                {/* GPay */}
                <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 group hover:border-red-400 transition-colors">
                   <span className="text-[13px] font-bold text-gray-600 tracking-tighter">
                    <span className="text-blue-500">G</span> <span className="text-red-500">P</span><span className="text-yellow-500">a</span><span className="text-green-500">y</span>
                   </span>
                </div>

                {/* PhonePe */}
                <div className="bg-[#5f259f] text-white px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                   <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#5f259f] rounded-full"></div>
                   </div>
                   <span className="text-[11px] font-bold tracking-tight">PhonePe</span>
                </div>

                {/* Paytm */}
                <div className="bg-[#00baf2] text-white px-3 py-1.5 rounded-lg shadow-sm flex items-center">
                   <span className="text-[12px] font-black italic">Paytm</span>
                </div>

                {/* Visa */}
                <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm flex items-center">
                   <span className="text-[14px] font-black italic text-[#1434cb]">VISA</span>
                </div>

                {/* Mastercard */}
                <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm flex items-center justify-center">
                  <div className="flex -space-x-2">
                    <div className="w-4 h-4 rounded-full bg-red-500 opacity-90"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-90"></div>
                  </div>
                </div>

                {/* Net Banking */}
                <div className="bg-slate-800 text-white px-3 py-1.5 rounded-lg shadow-sm flex items-center">
                   <span className="text-[10px] font-bold uppercase tracking-widest">Net Banking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Why Choose One Love Hair?</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
              <p className="text-slate-500 mt-6 max-w-2xl mx-auto font-medium italic text-sm md:text-base">Experience the ultimate luxury of authentic raw hair that transforms your look with natural elegance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: <ShieldCheck />, 
                  title: "100% Authentic Raw", 
                  desc: "Completely unprocessed hair directly from temples, ensuring every cuticle is aligned and intact." 
                },
                { 
                  icon: <Award />, 
                  title: "Premium Longevity", 
                  desc: "Our high-grade hair lasts for years with proper care, maintaining its natural bounce and shine." 
                },
                { 
                  icon: <Heart />, 
                  title: "Ethically Sourced", 
                  desc: "We prioritize fair practices, ensuring every bundle is sourced ethically and transparently." 
                },
                { 
                  icon: <Truck />, 
                  title: "Pan-India Shipping", 
                  desc: "Fast and secure delivery to your doorstep across India, with real-time tracking for peace of mind." 
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                    <div className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white w-full">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[28px] font-serif font-bold text-gray-900 mb-10 text-center">Frequently asked questions</h2>
            <div className="space-y-0 text-[15px] font-sans">
              {(faqs.length > 0 ? faqs : FAQS).map((faq, idx) => (
                <div key={idx} className="border-b border-gray-100">
                  <button suppressHydrationWarning
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center py-5 text-left text-gray-800 hover:text-black focus:outline-none transition-colors group"
                  >
                    <span className="font-medium pr-8">{faq.question}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-[500px] mb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-600 text-[14px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Black Info Bar */}
        <div className="bg-slate-900 text-white py-6">
           <div className="max-w-7xl mx-auto px-4 md:px-8">
             <div className="flex flex-wrap justify-between items-center gap-6 md:gap-4 text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase">
                <div className="flex items-center gap-3 flex-1 justify-center min-w-[150px]">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>100% Raw Indian Hair</span>
                </div>
                <div className="flex items-center gap-3 flex-1 justify-center min-w-[150px] border-l border-white/10">
                  <Heart className="w-4 h-4 text-amber-500" />
                  <span>Ethically Sourced</span>
                </div>
                <div className="flex items-center gap-3 flex-1 justify-center min-w-[150px] border-l border-white/10">
                  <Truck className="w-4 h-4 text-amber-500" />
                  <span>Pan-India Fast Shipping</span>
                </div>
                <div className="flex items-center gap-3 flex-1 justify-center min-w-[150px] border-l border-white/10">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Premium Quality Verified</span>
                </div>
             </div>
           </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}


