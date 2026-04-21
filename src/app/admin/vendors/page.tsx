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
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Vendor Management</h1>
          <p className="text-gray-400 mt-2 text-sm">Manage your hair suppliers and multi-vendor partnerships.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)]">
          <Plus className="w-5 h-5" />
          <span>Add Vendor</span>
        </button>
      </div>

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          Note: Multi-vendor schema might not be initialized yet. Error: {dbError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-500 bg-[#16181d] border border-white/5 rounded-2xl">
            No vendors found. Start by adding your first supplier.
          </div>
        ) : (
          vendors.map((vendor) => (
            <div key={vendor.id} className="bg-[#16181d] border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                  <Truck className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${vendor.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                  {vendor.status}
                </span>
              </div>

              <h3 className="text-white font-bold text-lg mb-4">{vendor.name}</h3>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span>{vendor.contact_email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span>{vendor.phone}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-white/5">
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold transition-all">Edit</button>
                <form action={deleteVendor} className="flex-1">
                  <input type="hidden" name="id" value={vendor.id} />
                  <button type="submit" className="w-full py-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold transition-all">Remove</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    
    </div>
  );
}
