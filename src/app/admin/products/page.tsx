import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import pool from '../../../lib/db';

// This is a Server Component, it runs on the server and fetches directly from DB
export default async function AdminProductsPage() {
  let products = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    products = rows as any[];
  } catch (err: any) {
    dbError = err.message;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Products Management</h1>
          <p className="text-gray-400 mt-2 text-sm">Add, update, or remove products from your catalog.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)]"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </Link>
      </div>

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          Failed to load products from database: {dbError}
        </div>
      )}

      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#0f1115] text-gray-500">
              <tr>
                <th className="px-4 py-3 rounded-l-lg w-16">Image</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && !dbError ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">No products found. Start by adding one!</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-4 py-3">
                      <img src={product.img || 'https://via.placeholder.com/150'} alt={product.name} className="w-10 h-10 rounded-md object-cover border border-white/10 group-hover:border-amber-500/30 transition-colors" />
                    </td>
                    <td className="px-4 py-3 font-medium text-white max-w-xs truncate">{product.name}</td>
                    <td className="px-4 py-3">
                      <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">{product.category}</span>
                    </td>
                    <td className="px-4 py-3 text-white font-medium">${Number(product.price).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                       <button className="p-1.5 text-gray-400 hover:text-amber-400 bg-white/5 hover:bg-amber-400/10 rounded-md transition-colors">
                         <Edit className="w-4 h-4" />
                       </button>
                       <button className="p-1.5 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-md transition-colors">
                         <Trash2 className="w-4 h-4" />
                       </button>
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
