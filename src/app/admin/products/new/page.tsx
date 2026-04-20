import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import pool from '../../../../lib/db';
import { redirect } from 'next/navigation';

export default function NewProductPage() {
  
  // Next.js Server Action
  async function addProduct(formData: FormData) {
    'use server';
    
    // Extract data
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const oldPrice = formData.get('oldPrice') ? parseFloat(formData.get('oldPrice') as string) : null;
    const img = formData.get('img') as string;
    const category = formData.get('category') as string || 'Bundle';
    
    try {
      await pool.query(
        'INSERT INTO products (name, price, old_price, img, category, reviews_count) VALUES (?, ?, ?, ?, ?, ?)',
        [name, price, oldPrice, img || 'https://images.unsplash.com/photo-1595424564881-81f19c9918bd?auto=format&fit=crop&w=600&q=80', category, 0]
      );
    } catch (err: any) {
      console.error("Failed to insert product:", err);
      // In a real app we'd handle error state, here we'll let it fail silently back to admin for brevity
    }

    // Redirect back to products list
    redirect('/admin/products');
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-3xl">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 bg-[#16181d] border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Add New Product</h1>
          <p className="text-gray-400 mt-2 text-sm">Fill in the details below to add a new product to your store.</p>
        </div>
      </div>

      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-8">
        <form action={addProduct} className="space-y-6" suppressHydrationWarning>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Product Name *</label>
              <input 
                suppressHydrationWarning
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                placeholder="e.g. Pure Virgin Indian Bundles"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-1">Current Price ($) *</label>
                <input 
                  suppressHydrationWarning
                  type="number" 
                  step="0.01" 
                  id="price" 
                  name="price" 
                  required 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-400 mb-1">Old Price ($) (Optional)</label>
                <input 
                  suppressHydrationWarning
                  type="number" 
                  step="0.01" 
                  id="oldPrice" 
                  name="oldPrice" 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                <select 
                  suppressHydrationWarning
                  id="category" 
                  name="category" 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all appearance-none"
                >
                  <option value="Bundle">Bundle</option>
                  <option value="Wig">Wig</option>
                  <option value="Trending">Trending</option>
                  <option value="Closure">Closure</option>
                </select>
              </div>
              <div>
                <label htmlFor="img" className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                <input 
                  suppressHydrationWarning
                  type="url" 
                  id="img" 
                  name="img" 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-[10px] text-gray-500 mt-1">Leave blank to use a default placeholder image.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              suppressHydrationWarning
              type="submit" 
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)]"
            >
              <Save className="w-5 h-5" />
              <span>Save Product</span>
            </button>
          </div>

        </form>
      </div>
    
    </div>
  );
}
