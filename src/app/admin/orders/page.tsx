import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function AdminOrdersPage() {
  let orders: any[] = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    orders = rows as any[];
  } catch (err: any) {
    dbError = err.message;
  }

  // Server Action to update order status
  async function updateStatus(formData: FormData) {
    'use server';
    const id = formData.get('id');
    const status = formData.get('status');
    try {
      await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
      revalidatePath('/admin/orders');
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-3 h-3 mr-1" />;
      case 'Processing': return <Clock className="w-3 h-3 mr-1" />;
      case 'Pending': return <AlertCircle className="w-3 h-3 mr-1" />;
      case 'Cancelled': return <XCircle className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div>
        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Orders Management</h1>
        <p className="text-gray-400 mt-2 text-sm">Track and manage customer orders, updates, and fulfillment.</p>
      </div>

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          Database Error: {dbError}
        </div>
      )}

      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#0f1115] text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-amber-500 font-bold">{order.order_number}</span>
                      <p className="text-[10px] text-gray-600 mt-0.5">{new Date(order.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{order.customer_name}</td>
                    <td className="px-6 py-4 max-w-[200px] truncate">{order.product_name}</td>
                    <td className="px-6 py-4 text-white font-bold">${Number(order.amount).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                      <div className="flex justify-end gap-3 items-center">
                        <Link 
                          href={`/admin/orders/${order.id}`}
                          className="p-1.5 text-gray-400 hover:text-amber-400 bg-white/5 hover:bg-amber-400/10 rounded-md transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <form action={updateStatus} className="flex justify-end gap-2">
                          <input type="hidden" name="id" value={order.id} />
                          <select 
                            name="status" 
                            defaultValue={order.status}
                            className="bg-[#0f1115] border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-400 focus:outline-none focus:border-amber-500/50 transition-all"
                            onChange={(e) => e.target.form?.requestSubmit()}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
}
