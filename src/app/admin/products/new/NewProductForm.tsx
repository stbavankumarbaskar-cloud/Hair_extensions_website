'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Save, X } from 'lucide-react';
import { createProduct } from '../actions';

export default function NewProductForm({ categories }: { categories: any[] }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Group categories for the selection modal
  const groupedCategories = categories?.reduce((acc: any, cat: any) => {
    if (!acc[cat.group_name]) acc[cat.group_name] = [];
    acc[cat.group_name].push(cat.name);
    return acc;
  }, {}) || {};

  const groups = ['Type', 'Hair Type', 'Texture', 'Length', 'Color', 'Volume / Weight', 'General'];

  const toggleCategory = (catName: string) => {
    setSelectedCategories(prev => 
      prev.includes(catName) 
        ? prev.filter(c => c !== catName) 
        : [...prev, catName]
    );
  };

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
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set('category', selectedCategories.join(', '));
    
    const result = await createProduct(formData);
    if (result.success) {
      window.location.href = '/admin/products';
    } else {
      alert("Failed to create product: " + result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 max-w-4xl relative">
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
             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Selected Categories</label>
             <div className="flex flex-wrap gap-2 min-h-[50px] p-3 bg-slate-50 border border-slate-200 rounded-xl">
               {selectedCategories.length > 0 ? (
                 selectedCategories.map(cat => (
                   <span key={cat} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 flex items-center gap-1">
                     {cat}
                     <button type="button" onClick={() => toggleCategory(cat)} className="hover:text-amber-900"><X className="w-3 h-3" /></button>
                   </span>
                 ))
               ) : (
                 <span className="text-slate-400 text-xs italic mt-1">No categories selected</span>
               )}
               <button 
                 type="button"
                 onClick={() => setIsCategoryModalOpen(true)}
                 className="text-amber-600 text-xs font-black hover:underline ml-1"
               >
                 + Choose Categories
               </button>
             </div>
             <input type="hidden" name="category" value={selectedCategories.join(', ')} />
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
            disabled={isLoading}
            className="bg-amber-500 hover:bg-amber-600 text-white font-black px-12 py-4 rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-amber-500/20 text-xs uppercase tracking-widest disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? 'Creating...' : 'Create Product'}</span>
          </button>
        </div>
      </form>

      {/* Categories Pop Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCategoryModalOpen(false)} />
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
               <div>
                 <h3 className="text-2xl font-serif font-bold text-slate-900">Select Categories</h3>
                 <p className="text-sm text-slate-500 font-medium">Choose multiple types, textures, and colors for this product.</p>
               </div>
               <button onClick={() => setIsCategoryModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                 <X className="w-6 h-6 text-slate-400" />
               </button>
            </div>
            
            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
               <div className="space-y-10">
                 {groups.map(group => groupedCategories[group] && (
                   <div key={group} className="space-y-4">
                     <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                       {group}
                       <div className="flex-1 h-px bg-slate-100"></div>
                     </h4>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                       {groupedCategories[group].map((cat: string) => (
                         <label key={cat} className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer group ${selectedCategories.includes(cat) ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-300 text-slate-600'}`}>
                           <input 
                             type="checkbox"
                             checked={selectedCategories.includes(cat)}
                             onChange={() => toggleCategory(cat)}
                             className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500 transition-all cursor-pointer"
                           />
                           <span className="text-xs font-bold leading-tight">{cat}</span>
                         </label>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
               <span className="text-sm font-bold text-slate-500">{selectedCategories.length} categories selected</span>
               <button 
                 onClick={() => setIsCategoryModalOpen(false)}
                 className="px-10 py-3 bg-slate-900 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
               >
                 Done
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
