import React from 'react';
import { Truck, MapPin, Package, Plus, Edit, Trash2 } from 'lucide-react';
import pool from '../../../lib/db';

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
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Shipping Management</h1>
          <p className="text-gray-400 mt-2 text-sm">Configure delivery methods and shipping costs.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)]">
          <Plus className="w-5 h-5" />
          <span>Add Method</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Methods List */}
        <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-500" />
            Active Shipping Methods
          </h2>
          <div className="space-y-4">
            {shippingMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 rounded-xl bg-[#0f1115] border border-white/5 hover:border-amber-500/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 group-hover:scale-110 transition-transform">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{method.name}</p>
                    <p className="text-xs text-gray-500">{method.estimated_days}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">${Number(method.cost).toFixed(2)}</p>
                  <div className="flex gap-2 mt-1">
                    <button className="p-1.5 text-gray-500 hover:text-amber-400 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Settings & Tracking Mockup */}
        <div className="space-y-6">
           <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-500" />
                Shipping Rules
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                   <span className="text-sm text-gray-400">Free Shipping Threshold</span>
                   <span className="text-sm font-bold text-emerald-400">$200.00</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                   <span className="text-sm text-gray-400">Global Processing Time</span>
                   <span className="text-sm font-bold text-amber-400">24-48 Hours</span>
                </div>
                <div className="flex items-center justify-between py-2">
                   <span className="text-sm text-gray-400">Default Currency</span>
                   <span className="text-sm font-bold text-white">USD ($)</span>
                </div>
              </div>
           </div>
           
           <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-amber-500 font-bold mb-2">Pro Tip</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Offering free shipping on orders over $200 can increase your average order value by up to 15%.
              </p>
           </div>
        </div>
      </div>
    
    </div>
  );
}
