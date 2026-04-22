'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';
import { updateProduct } from '../actions';
import { useParams, useRouter } from 'next/navigation';

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.product);
        let currentImages: string[] = [];
        try {
          if (data.product.img) {
            const parsed = JSON.parse(data.product.img);
            currentImages = Array.isArray(parsed) ? parsed : [parsed];
          }
        } catch (e) {
          currentImages = data.product.img ? [data.product.img] : [];
        }
        setImagePreviews(currentImages);
        setSelectedCategories(data.product.category ? data.product.category.split(', ') : []);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const previewToRemove = imagePreviews[index];
    if (previewToRemove.startsWith('data:')) {
      const base64Index = imagePreviews.slice(0, index).filter(p => p.startsWith('data:')).length;
      setUploadedFiles(prev => prev.filter((_, i) => i !== base64Index));
    }
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set('category', selectedCategories.join(', '));
    
    const keptImages = imagePreviews.filter(p => !p.startsWith('data:'));
    formData.set('img_url', JSON.stringify(keptImages));
    
    formData.delete('image_file');
    uploadedFiles.forEach(file => {
      formData.append('image_file', file);
    });

    const result = await updateProduct(formData);
    if (result.success) {
      router.push('/admin/products');
    } else {
      alert("Failed to update product: " + result.error);
      setIsLoading(false);
    }
  };

  if (!product) return <div className="p-8 text-slate-500">Loading product...</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Edit Product</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Update the details for "{product.name}".</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <input type="hidden" name="id" value={id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-700">Product Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                defaultValue={product.name}
                required 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-bold text-slate-700">Category</label>
                <input 
                  type="text"
                  id="category"
                  name="category_display"
                  value={selectedCategories.join(', ')}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-medium cursor-not-allowed"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-bold text-slate-700">Current Price (₹) *</label>
                <input 
                  type="number" 
                  step="0.01" 
                  id="price" 
                  name="price" 
                  defaultValue={product.price}
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 transition-all font-medium"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="oldPrice" className="text-sm font-bold text-slate-700">Old Price (₹)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  id="oldPrice" 
                  name="oldPrice" 
                  defaultValue={product.old_price || ''}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 transition-all font-medium"
                />
            </div>

            <div className="space-y-2">
              <label htmlFor="stock" className="text-sm font-bold text-slate-700">Stock Level *</label>
              <input 
                type="number" 
                id="stock" 
                name="stock" 
                defaultValue={product.stock || 0}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 transition-all font-medium"
              />
            </div>

            <div className="md:col-span-2 space-y-4">
               <label className="text-sm font-bold text-slate-700">Product Images</label>
               <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 border-dashed">
                  <div className="flex flex-wrap gap-4">
                     {imagePreviews.map((preview, idx) => (
                       <div key={idx} className="w-32 h-32 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm relative group">
                         <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                         <button 
                            type="button" 
                            onClick={() => removeImage(idx)}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-red-500 hover:text-white text-slate-500 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                       </div>
                     ))}
                  </div>
                  <div className="flex flex-col gap-3">
                     <p className="text-sm text-slate-600 font-medium">Upload new photos (added to the list).</p>
                     <input 
                       type="file" 
                       name="image_file"
                       accept="image/*"
                       multiple
                       onChange={handleImageChange}
                       className="text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-amber-600 transition-all cursor-pointer"
                     />
                  </div>
               </div>
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
              type="submit" 
              disabled={isLoading}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 font-sans uppercase tracking-widest text-xs disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Updating...' : 'Update Product'}</span>
            </button>
          </div>

        </form>
      </div>
    
    </div>
  );
}
