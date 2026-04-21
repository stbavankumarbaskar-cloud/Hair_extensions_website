import React from 'react';
import { Tag, Plus, Edit, Trash2 } from 'lucide-react';
import pool from '@/lib/db';

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
      { id: 1, name: 'Bundles', description: 'Premium human hair bundles and extensions' },
      { id: 2, name: 'Wigs', description: 'Full lace, frontal, and closure wigs' },
      { id: 3, name: 'Frontals', description: 'High definition 13x4 and 13x6 frontals' },
      { id: 4, name: 'Closures', description: '4x4 and 5x5 HD lace closures' },
      { id: 5, name: 'Accessories', description: 'Hair care products, glues, and tools' },
    ];
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Categories</h1>
          <p className="text-slate-500 mt-2 text-sm">Organize your products into logical groups.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20">
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm group hover:border-amber-500/30 transition-all relative overflow-hidden hover:shadow-md">
             <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/[0.02] rounded-full blur-2xl group-hover:bg-amber-500/[0.05] transition-all duration-500"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:scale-110 transition-transform border border-amber-100">
                <Tag className="w-6 h-6" />
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                <button className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{cat.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed min-h-[40px] font-medium">{cat.description || 'No description provided.'}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Manage Items</span>
                <button className="text-xs text-amber-600 font-bold hover:underline">View Products →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );

}
