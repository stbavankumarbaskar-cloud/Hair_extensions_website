import React from 'react';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle } from 'lucide-react';
import pool from '@/lib/db';

export default async function AdminPaymentsPage() {
  let payments = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT p.*, o.order_number FROM payments p JOIN orders o ON p.order_id = o.id ORDER BY p.created_at DESC');
    payments = rows as any[];
  } catch (err: any) {
    dbError = err.message;
    // Fallback dummy data
    payments = [
      { id: 1, order_number: '#ORD-1001', amount: 345.00, method: 'Credit Card', status: 'Success', transaction_id: 'TXN_987654321', created_at: new Date() },
      { id: 2, order_number: '#ORD-1002', amount: 120.00, method: 'PayPal', status: 'Success', transaction_id: 'TXN_123456789', created_at: new Date() },
      { id: 3, order_number: '#ORD-1003', amount: 135.00, method: 'Apple Pay', status: 'Pending', transaction_id: 'TXN_112233445', created_at: new Date() },
      { id: 4, order_number: '#ORD-1004', amount: 89.99, method: 'Credit Card', status: 'Failed', transaction_id: 'TXN_556677889', created_at: new Date() },
    ];
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Payment Management</h1>
          <p className="text-slate-500 mt-2 text-sm">Track transactions and manage financial records.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600"><DollarSign className="w-5 h-5" /></div>
             <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded-full">
               <ArrowUpRight className="w-3 h-3" /> +12%
             </div>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-slate-900">$12,450.00</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm">
           <div className="p-3 bg-blue-100 rounded-xl text-blue-600 w-fit mb-4"><CreditCard className="w-5 h-5" /></div>
           <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Pending Transfers</p>
           <p className="text-2xl font-bold text-slate-900">$1,230.45</p>
        </div>
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl shadow-sm">
           <div className="p-3 bg-red-100 rounded-xl text-red-600 w-fit mb-4"><ArrowDownRight className="w-5 h-5" /></div>
           <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Refunded</p>
           <p className="text-2xl font-bold text-slate-900">$450.00</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 overflow-hidden">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="text-xs uppercase bg-slate-50 text-slate-400 font-bold">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Transaction ID</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-4 font-mono text-xs text-amber-600">{p.transaction_id}</td>
                  <td className="px-4 py-4 text-slate-900 font-bold">{p.order_number}</td>
                  <td className="px-4 py-4 text-slate-500 font-medium">{p.method}</td>
                  <td className="px-4 py-4 text-slate-900 font-bold">${Number(p.amount).toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit text-[10px] font-bold uppercase border
                      ${p.status === 'Success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 
                        p.status === 'Pending' ? 'bg-amber-50 border-amber-100 text-amber-600' : 
                        'bg-red-50 border-red-100 text-red-600'}`}>
                      {p.status === 'Success' ? <CheckCircle2 className="w-3 h-3" /> : 
                       p.status === 'Pending' ? <DollarSign className="w-3 h-3" /> : 
                       <XCircle className="w-3 h-3" />}
                      {p.status}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-slate-400 font-medium">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
}
