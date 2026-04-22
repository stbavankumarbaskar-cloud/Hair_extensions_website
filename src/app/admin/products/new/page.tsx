'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';
import { createProduct } from '../actions';

export default function NewProductPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createProduct(formData);
    if (result.success) {
      window.location.href = '/admin/products';
    } else {
      alert("Failed to create product: " + result.error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-all shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Add New Product</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Create a new hair extension or wig entry.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Product Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium bg-slate-50"
                placeholder="e.g. Pure Virgin Indian Bundles"
              />
            </div>

            <div className="space-y-2">
               <label htmlFor="category" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</label>
                <select 
                  id="category" 
                  name="category" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium bg-slate-50"
                >
                  <option value="Bundle">Bundle</option>
                  <option value="Wig">Wig</option>
                  <option value="Trending">Trending</option>
                  <option value="Closure">Closure</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="price" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Current Price (₹) *</label>
                <input 
                  type="number" 
                  step="0.01" 
                  id="price" 
                  name="price" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium bg-slate-50"
                  placeholder="0.00"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="stock" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Stock Level *</label>
                <input 
                  type="number" 
                  id="stock" 
                  name="stock" 
                  required
                  defaultValue="10"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all font-medium bg-slate-50"
                />
            </div>

             <div className="md:col-span-2 space-y-4">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Product Image</label>
                <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 border-dashed hover:border-amber-500/50 transition-colors group">
                   <div className="w-32 h-32 rounded-2xl overflow-hidden border border-slate-200 bg-white flex-shrink-0 shadow-sm relative group-hover:scale-105 transition-transform duration-300">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                          <Save className="w-10 h-10" />
                        </div>
                      )}
                   </div>
                   <div className="flex flex-col gap-3">
                      <p className="text-sm text-slate-600 font-medium">Choose a photo from your computer to upload.</p>
                      <input 
                        type="file" 
                        name="image_file"
                        accept="image/*"
                        required
                        onChange={handleImageChange}
                        className="text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-amber-600 transition-all cursor-pointer"
                      />
                   </div>
                </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-4 border-t border-slate-100">
            <Link 
              href="/admin/products"
              className="px-8 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="bg-amber-500 hover:bg-amber-600 text-white font-black px-12 py-4 rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-amber-500/20 text-xs uppercase tracking-widest"
            >
              <Save className="w-4 h-4" />
              <span>Create Product</span>
            </button>
          </div>

        </form>
      </div>
    
    </div>
  );
}
