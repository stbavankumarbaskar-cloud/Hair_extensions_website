import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function AdminProductsPage() {
  let products: any[] = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    products = rows as any[];
  } catch (err: any) {
    dbError = err.message;
  }

  // Server Action for deletion
  async function deleteProduct(formData: FormData) {
    'use server';
    const id = formData.get('id');
    try {
      await pool.query('DELETE FROM products WHERE id = ?', [id]);
      revalidatePath('/admin/products');
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Products Management</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Add, update, or remove products from your catalog.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </Link>
      </div>

      {dbError && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium">
          Failed to load products from database: {dbError}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="text-xs uppercase bg-slate-50 text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 rounded-l-lg w-16 text-center">Image</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 && !dbError ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-medium italic">No products found. Start by adding one!</td>
                </tr>
              ) : (
                products.map((product) => (
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
                       <div className="flex justify-end gap-2">
                         <Link 
                           href={`/admin/products/${product.id}`}
                           className="p-2 text-slate-400 hover:text-amber-600 bg-slate-50 hover:bg-amber-50 rounded-lg transition-all"
                           title="Edit Product"
                         >
                           <Edit className="w-4 h-4" />
                         </Link>
                         <form action={deleteProduct}>
                           <input type="hidden" name="id" value={product.id} />
                           <button 
                             type="submit"
                             className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-lg transition-all"
                             title="Delete Product"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </form>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
}
