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

export default function ProductTableClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setImagePreview(product.img || null);
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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await updateProduct(formData);
    
    if (result.success) {
      // Refresh the page or update local state
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
          onChange={(e) => setSearchQuery(e.target.value)}
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
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-4 flex justify-center">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:border-amber-500/30 transition-all">
                      <img src={product.img || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                     <p className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors max-w-xs truncate">{product.name}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">SKU: PROD-{product.id}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border border-slate-200/50">{product.category}</span>
                  </td>
                  <td className="px-4 py-4 text-slate-900 font-bold text-base">₹{Number(product.price).toFixed(2)}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${product.stock <= 5 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 animate-in zoom-in duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Edit Product</h2>
                <p className="text-sm text-slate-500 font-medium">Update details for SKU: PROD-{editingProduct.id}</p>
              </div>
              <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <input type="hidden" name="id" value={editingProduct.id} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
                  <input 
                    name="name"
                    defaultValue={editingProduct.name}
                    required
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                  <select 
                    name="category"
                    defaultValue={editingProduct.category}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-medium"
                  >
                    <option value="Bundle">Bundle</option>
                    <option value="Wig">Wig</option>
                    <option value="Trending">Trending</option>
                    <option value="Closure">Closure</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price (₹)</label>
                  <input 
                    type="number"
                    step="0.01"
                    name="price"
                    defaultValue={editingProduct.price}
                    required
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Level</label>
                  <input 
                    type="number"
                    name="stock"
                    defaultValue={editingProduct.stock}
                    required
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-medium"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Image</label>
                  <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-200 bg-white flex-shrink-0 shadow-inner">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <X className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[11px] text-slate-500 font-medium">Upload a high-quality photo from your device.</p>
                      <input 
                        type="file" 
                        name="image_file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-white hover:file:bg-amber-600 cursor-pointer transition-all"
                      />
                      <input type="hidden" name="img_url" value={editingProduct.img || ''} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-6 py-2 border border-slate-200 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-8 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 text-xs uppercase tracking-widest"
                >
                  <Save className="w-4 h-4" />
                  <span>Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
