import React from 'react';
import { Truck, Mail, Phone, Plus, Edit, Trash2 } from 'lucide-react';
import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function AdminVendorsPage() {
  let vendors: any[] = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM vendors ORDER BY name ASC');
    vendors = rows as any[];
  } catch (err: any) {
    dbError = err.message;
  }

  // Server Action to delete vendor
  async function deleteVendor(formData: FormData) {
    'use server';
    const id = formData.get('id');
    try {
      await pool.query('DELETE FROM vendors WHERE id = ?', [id]);
      revalidatePath('/admin/vendors');
    } catch (err) {
      console.error("Failed to delete vendor:", err);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Vendor Management</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Manage your hair suppliers and multi-vendor partnerships.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20">
          <Plus className="w-5 h-5" />
          <span>Add Vendor</span>
        </button>
      </div>

      {dbError && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium">
          Note: Multi-vendor schema might not be initialized yet. Error: {dbError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400 bg-white border border-slate-200 rounded-2xl font-bold">
            No vendors found. Start by adding your first supplier.
          </div>
        ) : (
          vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-amber-500/30 transition-all group relative overflow-hidden shadow-sm hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
                  <Truck className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border shadow-sm
                  ${vendor.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                  {vendor.status}
                </span>
              </div>

              <h3 className="text-slate-900 font-bold text-lg mb-4 group-hover:text-amber-600 transition-colors">{vendor.name}</h3>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{vendor.contact_email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{vendor.phone}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-100">
                <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-600 transition-all border border-slate-200/50">Edit</button>
                <form action={deleteVendor} className="flex-1">
                  <input type="hidden" name="id" value={vendor.id} />
                  <button type="submit" className="w-full py-2 bg-red-50 hover:bg-red-500 hover:text-white text-red-600 rounded-lg text-xs font-bold transition-all border border-red-100">Remove</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    
    </div>
  );
}
