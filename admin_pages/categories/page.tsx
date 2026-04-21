import React from 'react';
import { Tag, Plus, Edit, Trash2 } from 'lucide-react';
import pool from '../../../lib/db';

export default async function AdminCategoriesPage() {
  let categories = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    categories = rows as any[];
  } catch (err: any) {
    dbError = err.message;
    // Fallback dummy data
    categories = [
      { id: 1, name: 'Bundles', description: 'Premium human hair bundles' },
      { id: 2, name: 'Wigs', description: 'Full lace and frontal wigs' },
      { id: 3, name: 'Frontals', description: 'High definition frontals' },
    ];
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Categories</h1>
          <p className="text-gray-400 mt-2 text-sm">Organize your products into logical groups.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)]">
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[#16181d] border border-white/5 p-6 rounded-2xl shadow-lg group hover:border-amber-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                <Tag className="w-6 h-6" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-white transition-colors"><Edit className="w-4 h-4" /></button>
                <button className="p-2 text-gray-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{cat.description || 'No description provided.'}</p>
          </div>
        ))}
      </div>
    
    </div>
  );
}
