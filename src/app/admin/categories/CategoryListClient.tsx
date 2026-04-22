'use client';

import React, { useState } from 'react';
import { Tag, Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { createCategory, updateCategory, deleteCategory } from './actions';

interface Category {
  id: number;
  name: string;
  group_name: string;
  description: string | null;
}

export default function CategoryListClient({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Group categories by group_name
  const groupedCategories = categories.reduce((acc, cat) => {
    if (!acc[cat.group_name]) acc[cat.group_name] = [];
    acc[cat.group_name].push(cat);
    return acc;
  }, {} as Record<string, Category[]>);

  const groups = ['Type', 'Hair Type', 'Texture', 'Length', 'Color', 'Volume / Weight', 'General'];

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const result = editingCategory 
      ? await updateCategory(formData)
      : await createCategory(formData);

    if (result.success) {
      window.location.reload();
    } else {
      alert("Error: " + result.error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const result = await deleteCategory(id);
      if (result.success) {
        setCategories(prev => prev.filter(c => c.id !== id));
      } else {
        alert("Delete failed: " + result.error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Product Categories</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Manage how customers filter and shop for products.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>New Category</span>
        </button>
      </div>

      <div className="space-y-12">
        {groups.map(group => groupedCategories[group] && (
          <div key={group} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest text-[13px]">{group}</h2>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedCategories[group].map((cat) => (
                <div key={cat.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm group hover:border-amber-500/30 transition-all relative overflow-hidden hover:shadow-md">
                   <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/[0.02] rounded-full blur-2xl group-hover:bg-amber-500/[0.05] transition-all duration-500"></div>
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleOpenEditModal(cat)}
                        className="p-2 text-slate-400 hover:text-amber-600 bg-slate-50 hover:bg-amber-50 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">{cat.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed min-h-[32px] font-medium line-clamp-2">{cat.description || 'Luxury hair category.'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 animate-in zoom-in duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Organization for your product catalog</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {editingCategory && <input type="hidden" name="id" value={editingCategory.id} />}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category Name</label>
                  <input 
                    name="name"
                    defaultValue={editingCategory?.name || ''}
                    required
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-medium text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Group / Type</label>
                  <select 
                    name="group_name"
                    defaultValue={editingCategory?.group_name || 'General'}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-medium text-sm"
                  >
                    {groups.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</label>
                <textarea 
                  name="description"
                  defaultValue={editingCategory?.description || ''}
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-medium text-sm resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-slate-200 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all text-[11px] uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 text-[11px] uppercase tracking-widest disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? 'Saving...' : (editingCategory ? 'Update' : 'Create')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
