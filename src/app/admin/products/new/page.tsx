import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import pool from '@/lib/db';
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
    const stock = parseInt(formData.get('stock') as string) || 0;
    
    try {
      await pool.query(
        'INSERT INTO products (name, price, old_price, img, category, stock, reviews_count) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, price, oldPrice, img || 'https://images.unsplash.com/photo-1595424564881-81f19c9918bd?auto=format&fit=crop&w=600&q=80', category, stock, 0]
      );
    } catch (err: any) {
      console.error("Failed to insert product:", err);
    }

    // Redirect back to products list
    redirect('/admin/products');
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Add New Product</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Create a new hair extension or wig entry.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 max-w-4xl">
        <form action={addProduct} className="space-y-8" suppressHydrationWarning>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-700">Product Name *</label>
              <input 
                suppressHydrationWarning
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium"
                placeholder="e.g. Pure Virgin Indian Bundles"
              />
            </div>

            <div className="space-y-2">
               <label htmlFor="category" className="text-sm font-bold text-slate-700">Category</label>
                <select 
                  suppressHydrationWarning
                  id="category" 
                  name="category" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium bg-white"
                >
                  <option value="Bundle">Bundle</option>
                  <option value="Wig">Wig</option>
                  <option value="Trending">Trending</option>
                  <option value="Closure">Closure</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-bold text-slate-700">Current Price (₹) *</label>
                <input 
                  suppressHydrationWarning
                  type="number" 
                  step="0.01" 
                  id="price" 
                  name="price" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium"
                  placeholder="0.00"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="oldPrice" className="text-sm font-bold text-slate-700">Old Price (₹) (Optional)</label>
                <input 
                  suppressHydrationWarning
                  type="number" 
                  step="0.01" 
                  id="oldPrice" 
                  name="oldPrice" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium"
                  placeholder="0.00"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="stock" className="text-sm font-bold text-slate-700">Stock Level *</label>
                <input 
                  suppressHydrationWarning
                  type="number" 
                  id="stock" 
                  name="stock" 
                  required
                  defaultValue="10"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium"
                  placeholder="Quantity in stock"
                />
            </div>

             <div className="space-y-2">
                <label htmlFor="img" className="text-sm font-bold text-slate-700">Image URL</label>
                <input 
                  suppressHydrationWarning
                  type="url" 
                  id="img" 
                  name="img" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium"
                  placeholder="https://example.com/image.jpg"
                />
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-4">
            <Link 
              href="/admin/products"
              className="px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all font-sans uppercase tracking-widest text-xs flex items-center"
            >
              Cancel
            </Link>
            <button 
              suppressHydrationWarning
              type="submit" 
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 font-sans uppercase tracking-widest text-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Product</span>
            </button>
          </div>

        </form>
      </div>
    
    </div>
  );
}
