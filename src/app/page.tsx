"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, Star, ChevronLeft, ChevronRight, User, ChevronDown, ChevronUp } from 'lucide-react';
import CartDrawer from '../components/CartDrawer';
import Header from '../components/Header';
import Footer from '../components/Footer';

const REVIEWS = [
  {
    id: 1,
    text: "I love working with One love hair. The owners are kind and knowledgeable. The hair is beautiful and amazing quality. Thank you for being consistent in providing long lasting hair.",
    name: "Nicole",
    company: "One Love Hair GmbH",
    rating: 5,
  },
  {
    id: 2,
    text: "The clip-in extensions are fantastic. They blend seamlessly with my natural hair and the quality is absolutely top-notch.",
    name: "Sarah",
    company: "Verified Customer",
    rating: 5,
  },
  {
    id: 3,
    text: "Exceptional customer service and gorgeous products. I will definitely be repurchasing from them again. Highly recommended!",
    name: "Jessica",
    company: "Salon Owner",
    rating: 5,
  }
];

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbReviews, setDbReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/frontpage')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.products && data.products.length > 0) setDbProducts(data.products);
          if (data.reviews && data.reviews.length > 0) setDbReviews(data.reviews);
        }
      })
      .catch(err => console.error("DB Fetch Error:", err));
  }, []);

  const displayReviews = dbReviews.length > 0 ? dbReviews : REVIEWS;
  const currentReview = displayReviews[currentReviewIdx] || displayReviews[0];


  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleNextReview = () => {
    setCurrentReviewIdx((prev) => (prev + 1) % displayReviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIdx((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main>
        {/* Hero Section */}
        <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
           <img 
            src="https://images.unsplash.com/photo-1562322140-8baeececf3ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Hair Salon" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay animate-[scale_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center transform transition-all duration-700 translate-y-0 opacity-100">
             <div className="w-24 h-1 bg-amber-500 mb-8 mx-auto"></div>
            <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-6 drop-shadow-lg leading-tight uppercase tracking-tight">
              Love Your Hair with <span className="text-amber-400 font-style-italic inline-block drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">Love Hair</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-4 font-light drop-shadow">
              100% Brazilian human hair bundles & wigs
            </p>
            <p className="text-base md:text-xl text-amber-200 mb-10 font-semibold italic drop-shadow-md">
              Buy 3 Get 1 Free | Up to 40% Off Bundles & Wigs | Best Value for Money
            </p>
            <button suppressHydrationWarning className="bg-amber-600 hover:bg-amber-700 text-white transition-all transform hover:scale-105 duration-300 font-bold uppercase tracking-wider py-4 px-10 rounded shadow-[0_0_20px_rgba(217,119,6,0.4)]">
              Shop 100% Human Hair Bundles & Wigs
            </button>
          </div>
        </div>

        {/* Premium Virgin Hair Extension */}
        <section className="py-20 px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[28px] font-serif font-bold text-[#1a202c] mb-2 tracking-tight">Premium Virgin Hair Extension</h2>
              <div className="w-16 h-[3px] bg-[#e65c00]"></div>
            </div>
            <a href="#" className="hidden sm:inline-block text-[#e65c00] font-semibold hover:underline border-b-2 border-transparent transition">View All →</a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-3">
            {(dbProducts.length > 0 ? dbProducts.filter(p => p.category === 'Bundle') : [
              { id: 1, name: "Love Hair 3 Bundles 9A Grade Brazilian Human Hair Water Wave", price: "$86.00", oldPrice: "$120.00", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80", reviews: 124 },
              { id: 2, name: "Queen Hair 10A Brazilian Hair Straight 3 Bundles Virgin Human Hair", price: "$75.00", oldPrice: "$95.00", img: "https://images.unsplash.com/photo-1595424564881-81f19c9918bd?auto=format&fit=crop&w=600&q=80", reviews: 89 },
              { id: 3, name: "Love Hair Body Wave 3 Bundles With Closure Brazilian Human Hair", price: "$98.50", oldPrice: "$140.00", img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80", reviews: 312 },
              { id: 4, name: "Loose Deep Wave 3 Bundles With Frontal 100% Unprocessed Virgin Hair", price: "$112.00", oldPrice: "$160.00", img: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=600&q=80", reviews: 67 },
               { id: 5, name: "Peruvian Straight Hair 4 Bundles Deal Virgin Human Hair Weave", price: "$105.00", oldPrice: "$150.00", img: "https://images.unsplash.com/photo-1694438312015-h00QRko_Ekc?auto=format&fit=crop&w=600&q=80", reviews: 45 },
               { id: 6, name: "Malaysian Curly Hair 3 Bundles Kinky Curly Virgin Human Hair", price: "$92.00", oldPrice: "$130.00", img: "https://images.unsplash.com/photo-1616428789366-a3d5e21fb2b9?auto=format&fit=crop&w=600&q=80", reviews: 290 },
               { id: 7, name: "Indian Deep Wave 3 Bundles With 4x4 Lace Closure Human Hair", price: "$118.00", oldPrice: "$170.00", img: "https://images.unsplash.com/photo-1584297141812-019d82253c85?auto=format&fit=crop&w=600&q=80", reviews: 156 },
               { id: 8, name: "Brazilian Water Wave 4 Bundles Wet and Wavy Human Hair", price: "$125.00", oldPrice: "$180.00", img: "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?auto=format&fit=crop&w=600&q=80", reviews: 88 }
            ]).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="mt-8 text-center sm:hidden">
             <button suppressHydrationWarning className="border-2 border-amber-600 text-amber-700 px-6 py-2 uppercase font-semibold text-sm hover:bg-amber-600 hover:text-white transition">View All Products</button>
          </div>
        </section>

        {/* Truth / Virgin Hair Wigs */}
        <section className="py-20 px-2 sm:px-4 lg:px-6 bg-gray-50 border-t border-b border-gray-100">
           <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[28px] font-serif font-bold text-[#1a202c] mb-2 tracking-tight">Truth / Virgin Hair Wigs</h2>
              <div className="w-16 h-[3px] bg-[#e65c00]"></div>
            </div>
             <a href="#" className="hidden sm:inline-block text-[#e65c00] font-semibold hover:underline border-b-2 border-transparent transition">View All Wigs →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-3">
            {(dbProducts.length > 0 ? dbProducts.filter(p => p.category === 'Wig') : [
              { id: 1, name: "Loose Deep Wave wig 13x4 Lace Front Human Hair Wigs", price: "$120.00", oldPrice: "$180.00", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80", reviews: 215 },
              { id: 2, name: "Body Wave Lace Front Wigs Human Hair 180% Density", price: "$135.00", oldPrice: "$195.00", img: "https://images.unsplash.com/photo-1694438312015-h00QRko_Ekc?auto=format&fit=crop&w=600&q=80", reviews: 84 },
              { id: 3, name: "Water Wave Headband Wig Human Hair Glueless Wigs", price: "$85.00", oldPrice: "$115.00", img: "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?auto=format&fit=crop&w=600&q=80", reviews: 49 },
              { id: 4, name: "Highlight Lace Front Wigs Human Hair Ombre Straight Wig", price: "$145.00", oldPrice: "$210.00", img: "https://images.unsplash.com/photo-1584297141812-019d82253c85?auto=format&fit=crop&w=600&q=80", reviews: 132 },
               { id: 5, name: "Bone Straight 13x6 HD Lace Front Wig Free Part", price: "$155.00", oldPrice: "$230.00", img: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=600&q=80", reviews: 93 },
               { id: 6, name: "Kinky Straight Headband Wig for Black Women", price: "$75.00", oldPrice: "$99.00", img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80", reviews: 110 },
               { id: 7, name: "Short Bob Wig Lace Front Human Hair Wigs", price: "$68.00", oldPrice: "$85.00", img: "https://images.unsplash.com/photo-1595424564881-81f19c9918bd?auto=format&fit=crop&w=600&q=80", reviews: 420 },
               { id: 8, name: "Blonde 613 Lace Front Wig Body Wave Transparent Lace", price: "$140.00", oldPrice: "$200.00", img: "https://images.unsplash.com/photo-1560963683-162e24d35eef?auto=format&fit=crop&w=600&q=80", reviews: 315 },
               { id: 9, name: "Deep Wave Lace Closure Wig 4x4 Pre Plucked With Baby Hair", price: "$110.00", oldPrice: "$150.00", img: "https://images.unsplash.com/photo-1531685250784-523c9213197f?auto=format&fit=crop&w=600&q=80", reviews: 75 }
            ]).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="mt-8 text-center sm:hidden">
             <button suppressHydrationWarning className="border-2 border-amber-600 text-amber-700 px-6 py-2 uppercase font-semibold text-sm hover:bg-amber-600 hover:text-white transition">View All Wigs</button>
          </div>
        </section>

        {/* Trending Wigs */}
         <section className="py-20 px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[28px] font-serif font-bold text-[#1a202c] mb-2 tracking-tight">Trending Wigs</h2>
              <div className="w-16 h-[3px] bg-[#e65c00]"></div>
            </div>
             <a href="#" className="hidden sm:inline-block text-[#e65c00] font-semibold hover:underline border-b-2 border-transparent transition">Shop Trending →</a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
            {(dbProducts.length > 0 ? dbProducts.slice(0, 4) : [
              { id: 1, name: "Loose Deep Wave wig", price: "$120.00", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 400 },
              { id: 2, name: "Love Hair Body Wave", price: "$135.00", img: "https://images.unsplash.com/photo-1616428789366-a3d5e21fb2b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 200 },
              { id: 3, name: "Straight Lace Front wig", price: "$145.00", img: "https://images.unsplash.com/photo-1595424564881-81f19c9918bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", reviews: 150 },
              { id: 4, name: "Curly Bob wig", price: "$85.00", img: "https://images.unsplash.com/photo-1512401777085-c49195e340fa?auto=format&fit=crop&q=80&w=400", reviews: 80 }
            ]).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Hot Search Words */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
           <h2 className="text-2xl font-serif font-bold text-center mb-8">Hot search words</h2>
           <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
             {[
               "Love hair water wave 3 bundles", "Queen hair 10a brazilian hair", "Love hair body wave", 
               "Loose deep wave bundle details", "Water wave bundle with closure", "Best human hair wigs",
               "Glueless headband wigs", "HD lace front wig", "Pre plucked lace closure wig"
             ].map((tag, idx) => (
               <span key={idx} className="bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-900 px-4 py-2 rounded-full cursor-pointer transition text-sm font-medium border border-gray-200 hover:border-amber-300 shadow-sm">
                 {tag}
               </span>
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
            
            <div className="flex justify-center mt-8 space-x-6">
              <button suppressHydrationWarning aria-label="Previous Review" onClick={handlePrevReview} className="text-black hover:text-teal-600 transition p-2 cursor-pointer">
                <ChevronLeft className="w-5 h-5 mx-2" strokeWidth={2} />
              </button>
              <button suppressHydrationWarning aria-label="Next Review" onClick={handleNextReview} className="text-black hover:text-teal-600 transition p-2 cursor-pointer">
                <ChevronRight className="w-5 h-5 mx-2" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-14 text-center">
              <p className="text-[13px] font-semibold text-gray-800 mb-6 tracking-wide">Trusted Swiss Payment Partners</p>
              <div className="flex flex-wrap justify-center items-center gap-3">
                 {/* Mocking the payment badges with styled divs */}
                 <div className="bg-[#006fcf] text-white text-[10px] font-bold px-[6px] py-[3px] rounded-[3px] shadow-sm">AMEX</div>
                 <div className="bg-white border border-gray-200 text-black text-[11px] font-bold px-[6px] py-[3px] rounded-[3px] shadow-sm flex items-center"><svg className="w-3 h-3 mr-[2px]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.16 2.31-.93 3.57-.84 1.5.07 2.65.65 3.33 1.62-2.82 1.62-2.31 5.37.5 6.42-.58 1.6-1.57 3.32-2.48 4.97zm-3.7-14.73c.7-1.07 1.15-2.4 1.01-3.66-1.39.09-2.8.84-3.57 1.83-.69.88-1.2 2.23-1.03 3.5 1.54.1 2.87-.66 3.59-1.67z"/></svg>Pay</div>
                 <div className="bg-white border text-[#004e9a] border-gray-200 text-[10px] font-bold px-[6px] py-[3px] rounded-[3px] shadow-sm flex line-through decoration-yellow-400 decoration-2">Bancontact</div>
                 <div className="bg-white border text-gray-600 border-gray-200 text-[11px] font-bold px-[6px] py-[3px] rounded-[3px] shadow-sm tracking-tighter"><span className="text-blue-500">G</span> <span className="text-red-500">P</span><span className="text-yellow-500">a</span><span className="text-green-500">y</span></div>
                 <div className="bg-[#ffb3c7] text-black text-[10px] font-bold px-[6px] py-[3px] rounded-[3px] shadow-sm tracking-tight">Klarna.</div>
                 <div className="bg-white border border-gray-200 flex items-center justify-center px-[8px] py-[6px] rounded-[3px] shadow-sm">
                   <div className="w-[10px] h-[10px] rounded-full bg-red-500 -mr-1 mix-blend-multiply opacity-90"></div>
                   <div className="w-[10px] h-[10px] rounded-full bg-yellow-500 mix-blend-multiply opacity-90"></div>
                 </div>
                 <div className="bg-white border text-[#003087] border-gray-200 text-[10px] font-bold px-[6px] py-[3px] rounded-[3px] shadow-sm italic">PayPal</div>
                 <div className="bg-[#5a31f4] text-white border-gray-200 text-[11px] font-bold px-[6px] py-[3px] rounded-[3px] shadow-sm tracking-tight">shop</div>
                 <div className="bg-black text-white text-[10px] font-bold px-[6px] py-[3px] rounded-[3px] shadow-sm tracking-widest">TWINT</div>
                 <div className="bg-white border text-[#007b85] border-gray-200 text-[10px] font-bold px-[6px] py-[3px] rounded-[3px] shadow-sm italic flex items-center"><span className="text-red-600 mr-auto font-sans not-italic font-bold tracking-tighter">Union</span>Pay</div>
                 <div className="bg-white border text-[#1434cb] border-gray-200 text-[12px] font-bold px-[6px] py-[3px] rounded-[3px] shadow-sm italic leading-none">VISA</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-2 sm:px-4 lg:px-6 bg-white w-full">
          <h2 className="text-[26px] font-sans font-bold text-gray-900 mb-8 border-b-2 border-transparent">Frequently asked questions</h2>
          <div className="space-y-0 text-[15px] font-sans">
            {FAQS.map((faq, idx) => (
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
        </section>

        {/* Black Info Bar */}
        <div className="bg-[#2D2D2D] text-white py-3 text-center flex flex-col md:flex-row justify-between items-center px-4 md:px-32 text-xs font-bold tracking-wide mt-4">
           <div className="py-1 w-full md:w-auto md:flex-1">Fast Delivery</div>
           <div className="py-1 w-full md:w-auto md:flex-1 border-t border-b border-gray-600 md:border-t-0 md:border-b-0">Free shipping</div>
           <div className="py-1 w-full md:w-auto md:flex-1">Extended return period</div>
        </div>
      </main>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const queryParams = new URLSearchParams({
    name: product.name,
    price: product.price,
    img: product.img,
  });
  if (product.oldPrice) {
    queryParams.append('oldPrice', product.oldPrice);
  }

  return (
    <Link href={`/product?${queryParams.toString()}`} className="group cursor-pointer flex flex-col h-full bg-transparent">
      <div className="relative aspect-[3/4.2] bg-white overflow-hidden mb-3">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
        {/* Sale Tag */}
        {product.oldPrice && (
          <div className="absolute bottom-3 left-3 bg-white text-gray-800 text-[10px] tracking-wide px-3 py-1 rounded-full shadow-sm font-medium">
            Sale
          </div>
        )}
        
        {/* Quick Add icon */}
        <div className="absolute bottom-3 right-3 bg-white text-gray-800 w-8 h-8 rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <ShoppingCart className="w-[14px] h-[14px]" strokeWidth={2.5}/>
        </div>
        
        {/* Arrows (hover) */}
        <div className="absolute top-1/2 left-3 -translate-y-1/2 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronLeft className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
        </div>
        <div className="absolute top-1/2 right-3 -translate-y-1/2 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronRight className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="flex flex-col flex-grow pt-1 px-1">
        {/* Product Name */}
        <h3 className="text-[14px] text-[#2c2c2c] mb-[6px] leading-relaxed font-sans transition group-hover:opacity-80">
          {product.name} • Buy Now Pay Later
        </h3>
        
        <div className="mt-auto">
            {/* Price */}
            <div className="flex items-center space-x-[6px]">
                <span className="text-[12px] font-semibold text-[#3a3a3a]">{product.price}</span>
                {product.oldPrice && (
                    <span className="text-[11px] text-[#9a9a9a] line-through">{product.oldPrice}</span>
                )}
            </div>
        </div>
      </div>
    </Link>
  );
}
