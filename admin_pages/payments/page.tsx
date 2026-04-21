import React from 'react';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle } from 'lucide-react';
import pool from '../../../lib/db';

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
    ];
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Payment Management</h1>
          <p className="text-gray-400 mt-2 text-sm">Track transactions and manage financial records.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><DollarSign className="w-5 h-5" /></div>
             <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded-full">
               <ArrowUpRight className="w-3 h-3" /> +12%
             </div>
          </div>
          <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
          <p className="text-2xl font-bold text-white">$12,450.00</p>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl">
           <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 w-fit mb-4"><CreditCard className="w-5 h-5" /></div>
           <p className="text-gray-400 text-sm font-medium">Pending Transfers</p>
           <p className="text-2xl font-bold text-white">$1,230.45</p>
        </div>
        <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
           <div className="p-3 bg-red-500/10 rounded-xl text-red-400 w-fit mb-4"><ArrowDownRight className="w-5 h-5" /></div>
           <p className="text-gray-400 text-sm font-medium">Refunded</p>
           <p className="text-2xl font-bold text-white">$450.00</p>
        </div>
      </div>

      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6 overflow-hidden">
        <h2 className="text-lg font-semibold text-white mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#0f1115] text-gray-500">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Transaction ID</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4 font-mono text-xs text-amber-500">{p.transaction_id}</td>
                  <td className="px-4 py-4 text-white font-medium">{p.order_number}</td>
                  <td className="px-4 py-4 text-gray-400">{p.method}</td>
                  <td className="px-4 py-4 text-white font-bold">${Number(p.amount).toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full w-fit text-[10px] font-bold uppercase
                      ${p.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {p.status === 'Success' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {p.status}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-gray-500">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
}
