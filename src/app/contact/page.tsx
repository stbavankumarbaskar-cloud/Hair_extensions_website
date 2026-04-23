"use client";
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Header */}
        <section className="py-20 bg-zinc-50 border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Contact Us</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Have a question about our products? We're here to help you find your perfect match.</p>
          </div>
        </section>

        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                    <p className="text-slate-500">support@onelovehair.com</p>
                    <p className="text-slate-400 text-sm mt-1">We typically reply within 24 hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                    <p className="text-slate-500">+91 98765 43210</p>
                    <p className="text-slate-400 text-sm mt-1">Mon-Sat, 10am - 6pm IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Our Studio</h3>
                    <p className="text-slate-500">123 Luxury Lane, Fashion District</p>
                    <p className="text-slate-500">New Delhi, 110001, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-slate-500">Monday - Friday: 09:00 - 18:00</p>
                    <p className="text-slate-500">Saturday: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all appearance-none">
                    <option>Product Inquiry</option>
                    <option>Order Status</option>
                    <option>Shipping Question</option>
                    <option>Return Request</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
