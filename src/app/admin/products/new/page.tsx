import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import pool from '@/lib/db';
import NewProductForm from './NewProductForm';

export default async function NewProductPage() {
  let categories: any[] = [];
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY group_name, name');
    categories = rows as any[];
  } catch (err) {
    console.error("Fetch categories error:", err);
  }

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

      <NewProductForm categories={categories} />
    
    </div>
  );
}
