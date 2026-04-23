'use client';

import React, { useState } from 'react';
import { Edit, Trash2, X, Save, Search as SearchIcon } from 'lucide-react';
import { updateProduct, deleteProduct } from './actions';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  old_price?: number | null;
  stock: number;
  img?: string;
}

export default function ProductTableClient({ initialProducts, categories }: { initialProducts: Product[], categories: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Group categories for the select dropdown
  const groupedCategories = categories?.reduce((acc: any, cat: any) => {
    if (!acc[cat.group_name]) acc[cat.group_name] = [];
    acc[cat.group_name].push(cat.name);
    return acc;
  }, {}) || {};

  const groups = ['Type', 'Hair Type', 'Texture', 'Length', 'Color', 'Volume / Weight', 'General'];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when search query changes
  const updateSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const toggleCategory = (catName: string) => {
    setSelectedCategories(prev => 
      prev.includes(catName) 
        ? prev.filter(c => c !== catName) 
        : [...prev, catName]
    );
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setUploadedFiles([]); // Reset uploaded files for new edit session
    
    let currentImages: string[] = [];
    try {
      if (product.img) {
        const parsed = JSON.parse(product.img);
        currentImages = Array.isArray(parsed) ? parsed : [parsed];
      }
    } catch (e) {
      currentImages = product.img ? [product.img] : [];
    }
    setImagePreviews(currentImages);
    
    // Parse categories from comma separated string
    const cats = product.category ? product.category.split(', ').filter(Boolean) : [];
    setSelectedCategories(cats);
  };

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
    
    // If it's a base64 string, it's one of the newly uploaded files
    if (previewToRemove.startsWith('data:')) {
      // Find which file it corresponds to. This is tricky since multiple files can be uploaded.
      // But we can assume the relative order of base64s matches the order of uploadedFiles.
      // However, it's better to just track them properly.
      // For simplicity, let's find the index in uploadedFiles by checking how many base64s preceded it.
      const base64Index = imagePreviews.slice(0, index).filter(p => p.startsWith('data:')).length;
      setUploadedFiles(prev => prev.filter((_, i) => i !== base64Index));
    }
    
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('category', selectedCategories.join(', '));
    
    // Current images that are still kept (existing URLs)
    const keptImages = imagePreviews.filter(p => !p.startsWith('data:'));
    formData.set('img_url', JSON.stringify(keptImages));
    
    // Append new files
    formData.delete('image_file');
    uploadedFiles.forEach(file => {
      formData.append('image_file', file);
    });

    const result = await updateProduct(formData);
    
    if (result.success) {
      window.location.reload(); 
    } else {
      alert("Failed to update product: " + result.error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setIsDeleting(id);
      const formData = new FormData();
      formData.append('id', id.toString());
      const result = await deleteProduct(formData);
      if (result.success) {
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        alert("Delete failed: " + result.error);
      }
      setIsDeleting(null);
    }
  };

  return (
    <>
      <div className="mb-6 relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Filter products..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
          value={searchQuery}
          onChange={(e) => updateSearch(e.target.value)}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="text-xs uppercase bg-slate-50 text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 w-16 text-center">Image</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 w-28">Price</th>
                <th className="px-4 py-3 w-20 text-center">Stock</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProducts.map((product) => {
                let firstImg = '/placeholder-product.png';
                try {
                  if (product.img) {
                    const parsed = JSON.parse(product.img);
                    firstImg = Array.isArray(parsed) ? parsed[0] : parsed;
                  }
                } catch (e) {
                  firstImg = product.img || firstImg;
                }

                return (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors group text-slate-600">
                    <td className="px-4 py-4 flex justify-center">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:border-amber-500/30 transition-all flex-shrink-0">
                        <img src={firstImg} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                       <p className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors max-w-xs truncate">{product.name}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">SKU: PROD-{product.id}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[250px]">
                        {product.category?.split(', ').map((c, i) => (
                          <span key={i} className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider border border-slate-200/50 line-clamp-1 truncate max-w-[100px]">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-900 font-bold text-sm">₹{Number(product.price).toLocaleString()}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${product.stock <= 5 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                       <div className="flex justify-end gap-2 text-[#2c3e50]">
                         <button 
                           onClick={() => handleEdit(product)}
                           className="p-2 text-slate-400 hover:text-amber-600 bg-slate-50 hover:bg-amber-50 rounded-lg transition-all"
                           title="Edit Product"
                         >
                           <Edit className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => handleDelete(product.id)}
                           disabled={isDeleting === product.id}
                           className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-lg transition-all disabled:opacity-30"
                           title="Delete Product"
                         >
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Showing <span className="text-amber-600">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-amber-600">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of {filteredProducts.length} Products
          </p>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition-all uppercase tracking-tighter"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1 mx-2">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Show limited page numbers for better UX if total pages are many
                if (totalPages > 7) {
                  if (pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - currentPage) > 1) {
                    if (pageNum === 2 || pageNum === totalPages - 1) return <span key={pageNum} className="text-slate-300 px-1">...</span>;
                    return null;
                  }
                }
                
                return (
                  <button 
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${currentPage === pageNum ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition-all uppercase tracking-tighter"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 animate-in zoom-in duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Edit Product</h2>
                <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-1">Ref: {editingProduct.id}</p>
              </div>
              <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <input type="hidden" name="id" value={editingProduct.id} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Name</label>
                  <input 
                    name="name"
                    defaultValue={editingProduct.name}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-medium text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categories</label>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl min-h-[42px] content-start">
                     {selectedCategories.map(cat => (
                        <span key={cat} className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-amber-200 flex items-center gap-1">
                           {cat}
                           <button type="button" onClick={() => toggleCategory(cat)}><X className="w-2.5 h-2.5" /></button>
                        </span>
                     ))}
                     <button 
                       type="button" 
                       onClick={() => setIsCategoryModalOpen(true)}
                       className="text-amber-600 text-[10px] font-black hover:underline px-1"
                     >
                       + Manage
                     </button>
                  </div>
                  <input type="hidden" name="category" value={selectedCategories.join(', ')} />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price (₹)</label>
                  <input 
                    type="number"
                    step="0.01"
                    name="price"
                    defaultValue={editingProduct.price}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-medium text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stock Level</label>
                  <input 
                    type="number"
                    name="stock"
                    defaultValue={editingProduct.stock}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-medium text-sm"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Images</label>
                  <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                    <div className="flex flex-wrap gap-3">
                      {imagePreviews.map((preview, idx) => (
                        <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-white flex-shrink-0 shadow-sm relative group">
                          <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-white/90 hover:bg-red-500 hover:text-white text-slate-500 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {imagePreviews.length === 0 && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center text-slate-200 shadow-sm">
                          <X className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                       <input 
                        type="file" 
                        name="image_file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="text-[10px] text-slate-600 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-slate-900 file:text-white hover:file:bg-amber-600 cursor-pointer transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-50 pt-6">
                <button 
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-8 py-2.5 border border-slate-200 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-10 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-amber-500/20 text-xs uppercase tracking-widest"
                >
                  <Save className="w-4 h-4" />
                  <span>Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories Pop Modal (Shared for Edit) */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCategoryModalOpen(false)} />
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
               <div>
                 <h3 className="text-2xl font-serif font-bold text-slate-900">Select Categories</h3>
                 <p className="text-sm text-slate-500 font-medium">Categorize your product for better search and filtering.</p>
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
               <span className="text-sm font-bold text-slate-500">{selectedCategories.length} selected</span>
               <button 
                 onClick={() => setIsCategoryModalOpen(false)}
                 className="px-10 py-3 bg-slate-900 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
               >
                 Done
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
