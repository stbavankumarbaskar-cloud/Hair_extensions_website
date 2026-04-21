import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, User, CreditCard, Clock, CheckCircle } from 'lucide-react';
import pool from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  
  let order: any = null;
  try {
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
      order = rows[0];
    }
  } catch (err) {
    console.error("DB Fetch Error:", err);
  }

  if (!order) {
    notFound();
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="p-2 bg-[#16181d] border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Order Details</h1>
          <p className="text-gray-400 mt-2 text-sm">Reviewing order {order.order_number}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Order Info & Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#16181d] border border-white/5 rounded-2xl p-8 shadow-lg">
             <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Items Ordered</h2>
                    <p className="text-sm text-gray-500">Order placed on {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
             </div>

             <div className="border-t border-white/5 py-6">
                <div className="flex justify-between items-center group cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#0f1115] rounded-xl border border-white/5 overflow-hidden">
                        {/* In a real app we'd have a product image here, using placeholder for now */}
                        <div className="w-full h-full bg-amber-500/10 flex items-center justify-center text-amber-500 text-xs font-bold italic">LH</div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors">{order.product_name}</h3>
                        <p className="text-xs text-gray-500 mt-1">SKU: PROD-{order.id}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-white font-bold">${Number(order.amount).toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mt-1">Qty: 1</p>
                   </div>
                </div>
             </div>

             <div className="border-t border-white/5 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-500">Subtotal</span>
                   <span className="text-white">${Number(order.amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-gray-500">Shipping</span>
                   <span className="text-emerald-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-white/5 pt-4 mt-4">
                   <span className="text-white">Total</span>
                   <span className="text-amber-500">${Number(order.amount).toFixed(2)}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Customer Info */}
        <div className="space-y-6">
           <div className="bg-[#16181d] border border-white/5 rounded-2xl p-8 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                Customer Info
              </h2>
              <div className="space-y-4">
                 <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Name</p>
                    <p className="text-white font-medium">{order.customer_name}</p>
                 </div>
                 <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Shipping Address</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                       123 Luxury Lane<br />
                       Suite 456<br />
                       Beverly Hills, CA 90210
                    </p>
                 </div>
              </div>
           </div>

           <div className="bg-[#16181d] border border-white/5 rounded-2xl p-8 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-400" />
                Payment Info
              </h2>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 bg-[#0f1115] p-3 rounded-xl border border-white/5">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
                    <div>
                       <p className="text-xs text-white">Visa ending in 4242</p>
                       <p className="text-[10px] text-gray-500">Paid via Stripe</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    
    </div>
  );
}
