import React from 'react';
import { Users, Mail, Phone, MapPin, Search } from 'lucide-react';
import pool from '@/lib/db';
import CustomerListClient from './CustomerListClient';

export default async function AdminCustomersPage() {
  let customers: any[] = [];
  let dbError = "";

  try {
    // Group by customer_name from orders to simulate a customer list
    const [rows] = await pool.query(`
      SELECT 
        customer_name as name, 
        COUNT(*) as total_orders, 
        SUM(amount) as total_spent,
        MAX(created_at) as last_order
      FROM orders 
      GROUP BY customer_name 
      ORDER BY total_spent DESC
    `);
    customers = rows as any[];
  } catch (err: any) {
    dbError = err.message;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Customers</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">View and manage your customer base and their purchasing history.</p>
        </div>
        <div className="flex gap-3">
           <div className="relative group">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
             <input 
               type="text" 
               placeholder="Search customers..." 
               className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all shadow-sm"
             />
           </div>
        </div>
      </div>

      {dbError && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium">
          Database Error: {dbError}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <Users className="w-40 h-40 text-slate-900" />
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-slate-900">Customer Directory</h2>
          <p className="text-slate-500 text-sm mt-1">Detailed list of all customers who have placed orders.</p>
        </div>
      </div>

      <CustomerListClient customers={customers} />
    
    </div>
  );
}
