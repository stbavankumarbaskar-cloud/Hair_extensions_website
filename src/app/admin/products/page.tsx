import Link from 'next/link';
import { Plus } from 'lucide-react';
import pool from '@/lib/db';
import ProductTableClient from './ProductTableClient';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  let products: any[] = [];
  let categories: any[] = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    products = rows as any[];
    
    const [catRows] = await pool.query('SELECT * FROM categories ORDER BY group_name, name');
    categories = catRows as any[];
  } catch (err: any) {
    dbError = err.message;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center mb-4">
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
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium mb-6">
          Failed to load products: {dbError}
        </div>
      )}

      <ProductTableClient initialProducts={products} categories={categories} />
    
    </div>
  );
}
