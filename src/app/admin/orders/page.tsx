import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import StatusSelector from './StatusSelector';

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
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Processing': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Orders Management</h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">Track and manage customer orders, updates, and fulfillment.</p>
      </div>

      {dbError && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium">
          Database Error: {dbError}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="text-xs uppercase bg-slate-50 text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 font-mediumitalic">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-amber-600 font-bold">{order.order_number}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-tighter">{new Date(order.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-bold">{order.customer_name}</td>
                    <td className="px-6 py-4 max-w-[200px] truncate text-slate-600 font-medium">{order.product_name}</td>
                    <td className="px-6 py-4 text-slate-900 font-bold">₹{Number(order.amount).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3 items-center">
                        <Link 
                          href={`/admin/orders/${order.id}`}
                          className="p-2 text-slate-400 hover:text-amber-600 bg-slate-100 hover:bg-amber-100/50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <form action={updateStatus} className="flex justify-end gap-2">
                          <input type="hidden" name="id" value={order.id} />
                          <StatusSelector defaultValue={order.status} />
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
