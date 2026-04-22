import React from 'react';
import pool from '@/lib/db';
import CategoryListClient from './CategoryListClient';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  let categories: any[] = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    categories = rows as any[];
  } catch (err: any) {
    dbError = err.message;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {dbError && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium">
          Database Error: {dbError}
        </div>
      )}

      <CategoryListClient initialCategories={categories} />
    
    </div>
  );
}
