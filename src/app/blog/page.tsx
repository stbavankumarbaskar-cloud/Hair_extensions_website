"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Choose the Right Length for Your Hair Extensions",
    excerpt: "Everything you need to know about selecting the perfect length to match your style and natural hair.",
    image: "https://images.unsplash.com/photo-1595475243692-3b65bb2a8f6c?q=80&w=2069&auto=format&fit=crop",
    date: "Oct 12, 2023",
    author: "Style Expert"
  },
  {
    id: 2,
    title: "Raw Indian Hair vs. Virgin Hair: What's the Difference?",
    excerpt: "Demystifying the terminology of the hair industry. Learn why Raw Indian hair is the gold standard.",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop",
    date: "Oct 05, 2023",
    author: "One Love Team"
  },
  {
    id: 3,
    title: "Maintenance Tips for Long-Lasting Hair Extensions",
    excerpt: "Your guide to washing, styling, and storing your luxury extensions to ensure they last for years.",
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1974&auto=format&fit=crop",
    date: "Sep 28, 2023",
    author: "Beauty Consultant"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <section className="py-20 bg-zinc-950 text-white overflow-hidden relative">
           <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-800 rounded-full blur-[120px]"></div>
           </div>
           
           <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">The Hair Journal</h1>
              <p className="text-amber-100/60 max-w-2xl mx-auto text-lg italic">Expert advice, style guides, and the latest trends in luxury hair extensions.</p>
           </div>
        </section>

        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-6 relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 uppercase tracking-widest font-bold">
                   <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                   </div>
                   <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                   </div>
                </div>
                
                <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                
                <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest border-b-2 border-amber-500 pb-1 hover:border-black transition-all">
                  Read More
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Callout */}
        <section className="py-24 bg-zinc-50 border-t border-zinc-200">
           <div className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-serif font-bold mb-6">Never Miss a Trend</h2>
              <p className="text-slate-600 mb-10">Subscribe to our newsletter to receive the latest hair care tips and exclusive offers directly in your inbox.</p>
              <form className="flex flex-col sm:flex-row gap-4">
                 <input type="email" placeholder="Enter your email" className="flex-1 bg-white border border-slate-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                 <button className="bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-widest py-4 px-10 rounded-xl transition-all">Subscribe</button>
              </form>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
