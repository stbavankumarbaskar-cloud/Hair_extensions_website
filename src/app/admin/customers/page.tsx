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
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Customers</h1>
          <p className="text-gray-400 mt-2 text-sm">View and manage your customer base and their purchasing history.</p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <input 
               type="text" 
               placeholder="Search customers..." 
               className="bg-[#16181d] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all"
             />
           </div>
        </div>
      </div>

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          Database Error: {dbError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-500 bg-[#16181d] border border-white/5 rounded-2xl">
            No customers found in the order history.
          </div>
        ) : (
          customers.map((customer, idx) => (
            <div key={idx} className="bg-[#16181d] border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Users className="w-20 h-20" />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center text-amber-500 border border-amber-500/20 font-bold text-lg">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors">{customer.name}</h3>
                  <p className="text-xs text-gray-500">Customer since {new Date(customer.last_order).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span>{customer.name.toLowerCase().replace(' ', '.')}@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span>+41 79 000 00 00</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Total Orders</p>
                  <p className="text-white font-bold">{customer.total_orders}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Total Spent</p>
                  <p className="text-amber-500 font-bold">${Number(customer.total_spent).toFixed(2)}</p>
                </div>
              </div>
              
              <button className="w-full mt-6 py-2 bg-white/5 hover:bg-amber-500 hover:text-black rounded-xl text-sm font-semibold transition-all">
                View Profile
              </button>
            </div>
          ))
        )}
      </div>
    
    </div>
  );
}
