import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import pool from '@/lib/db';
import { redirect, notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const id = params.id;
  
  let product: any = null;
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
      product = rows[0];
    }
  } catch (err) {
    console.error("DB Fetch Error:", err);
  }

  if (!product) {
    notFound();
  }

  // Next.js Server Action
  async function updateProduct(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const oldPrice = formData.get('oldPrice') ? parseFloat(formData.get('oldPrice') as string) : null;
    const img = formData.get('img') as string;
    const category = formData.get('category') as string || 'Bundle';
    const stock = parseInt(formData.get('stock') as string) || 0;
    
    try {
      await pool.query(
        'UPDATE products SET name = ?, price = ?, old_price = ?, img = ?, category = ?, stock = ? WHERE id = ?',
        [name, price, oldPrice, img, category, stock, id]
      );
    } catch (err: any) {
      console.error("Failed to update product:", err);
    }

    redirect('/admin/products');
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-3xl">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 bg-[#16181d] border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Edit Product</h1>
          <p className="text-gray-400 mt-2 text-sm">Update the details for "{product.name}".</p>
        </div>
      </div>

      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-8">
        <form action={updateProduct} className="space-y-6">
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Product Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                defaultValue={product.name}
                required 
                className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-1">Current Price ($) *</label>
                <input 
                  type="number" 
                  step="0.01" 
                  id="price" 
                  name="price" 
                  defaultValue={product.price}
                  required 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                />
              </div>
              <div>
                <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-400 mb-1">Old Price ($) (Optional)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  id="oldPrice" 
                  name="oldPrice" 
                  defaultValue={product.old_price || ''}
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                <select 
                  id="category" 
                  name="category" 
                  defaultValue={product.category}
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
                  type="url" 
                  id="img" 
                  name="img" 
                  defaultValue={product.img}
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-400 mb-1">Stock Level *</label>
              <input 
                type="number" 
                id="stock" 
                name="stock" 
                defaultValue={product.stock || 0}
                required
                className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-gray-600"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)]"
            >
              <Save className="w-5 h-5" />
              <span>Update Product</span>
            </button>
          </div>

        </form>
      </div>
    
    </div>
  );
}
