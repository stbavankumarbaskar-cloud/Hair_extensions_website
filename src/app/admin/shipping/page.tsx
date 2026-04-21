import React from 'react';
import { Truck, MapPin, Package, Plus, Edit, Trash2 } from 'lucide-react';
import pool from '@/lib/db';

export default async function AdminShippingPage() {
  let shippingMethods = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM shipping ORDER BY cost ASC');
    shippingMethods = rows as any[];
  } catch (err: any) {
    dbError = err.message;
    // Fallback dummy data
    shippingMethods = [
      { id: 1, name: 'Standard Shipping', cost: 10.00, estimated_days: '3-5 Business Days' },
      { id: 2, name: 'Express Shipping', cost: 25.00, estimated_days: '1-2 Business Days' },
      { id: 3, name: 'International Shipping', cost: 50.00, estimated_days: '7-14 Business Days' },
    ];
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Shipping Management</h1>
          <p className="text-slate-500 mt-2 text-sm">Configure delivery methods and shipping costs.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20">
          <Plus className="w-5 h-5" />
          <span>Add Method</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Methods List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 text-slate-900">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-600" />
            Active Shipping Methods
          </h2>
          <div className="space-y-4">
            {shippingMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-500/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{method.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{method.estimated_days}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">₹{Number(method.cost).toFixed(2)}</p>
                  <div className="flex gap-2 mt-1">
                    <button className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Settings & Rules */}
        <div className="space-y-6">
           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 text-slate-900">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-600" />
                Shipping Rules
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                   <span className="text-sm text-slate-500 font-medium">Free Shipping Threshold</span>
                   <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">₹2,000.00</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                   <span className="text-sm text-slate-500 font-medium">Global Processing Time</span>
                   <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">24-48 Hours</span>
                </div>
                <div className="flex items-center justify-between py-3">
                   <span className="text-sm text-slate-500 font-medium">Default Currency</span>
                   <span className="text-sm font-bold text-slate-900">INR (₹)</span>
                </div>
              </div>
           </div>
           
           <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 rounded-2xl p-6 relative overflow-hidden group shadow-sm text-slate-900">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500/[0.05] rounded-full blur-2xl group-hover:bg-amber-500/[0.08] transition-all duration-500"></div>
              <h3 className="text-amber-600 font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Pro Tip
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Offering free shipping on orders over ₹2,000 can increase your average order value by up to 15%.
              </p>
           </div>
        </div>
      </div>
    
    </div>
  );

}
