import React from 'react';
import { Users, Mail, Phone, MapPin, Search } from 'lucide-react';
import pool from '@/lib/db';

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400 bg-white border border-slate-200 rounded-2xl font-bold">
            No customers found in the order history.
          </div>
        ) : (
          customers.map((customer, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-amber-500/30 transition-all group relative overflow-hidden shadow-sm hover:shadow-md">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Users className="w-20 h-20 text-slate-900" />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200 font-bold text-lg shadow-sm">
                   {customer.name ? customer.name.charAt(0) : '?'}
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg group-hover:text-amber-600 transition-colors">{customer.name}</h3>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Customer since {new Date(customer.last_order).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6 relative z-10">
                <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{customer.name ? customer.name.toLowerCase().replace(' ', '.') : 'customer'}@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>+41 79 000 00 00</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 relative z-10">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Total Orders</p>
                  <p className="text-slate-900 font-bold">{customer.total_orders}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Total Spent</p>
                  <p className="text-amber-600 font-bold">${Number(customer.total_spent).toFixed(2)}</p>
                </div>
              </div>
              
              <button className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-amber-500 hover:text-white rounded-xl text-sm font-bold text-slate-600 transition-all border border-slate-100 group-hover:border-amber-500/30">
                View Profile
              </button>
            </div>
          ))
        )}
      </div>
    
    </div>
  );
}
