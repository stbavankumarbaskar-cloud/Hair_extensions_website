import React from 'react';
import { BarChart3, TrendingUp, Users, ShoppingBag, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Reports & Analytics</h1>
          <p className="text-gray-400 mt-2 text-sm">Deep dive into your store performance and growth metrics.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
          <Download className="w-4 h-4" />
          <span>Export Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Conversion Rate', value: '3.24%', trend: '+0.5%', pos: true, icon: TrendingUp },
           { label: 'Avg Order Value', value: '$156.00', trend: '-2.1%', pos: false, icon: BarChart3 },
           { label: 'Repeat Customers', value: '24%', trend: '+4.2%', pos: true, icon: Users },
           { label: 'Abandoned Carts', value: '42', trend: '-8%', pos: true, icon: ShoppingBag },
         ].map((stat, i) => (
           <div key={i} className="bg-[#16181d] border border-white/5 p-5 rounded-2xl">
              <div className="flex justify-between items-start mb-3">
                 <div className="p-2 bg-[#0f1115] rounded-lg text-gray-400"><stat.icon className="w-4 h-4" /></div>
                 <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 
                   ${stat.pos ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                   {stat.pos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                   {stat.trend}
                 </div>
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6 min-h-[400px] flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-6">Sales Performance</h2>
            <div className="flex-1 flex items-end justify-between gap-2 px-4">
               {[65, 45, 75, 55, 90, 70, 85, 60, 95, 80, 100, 90].map((h, i) => (
                 <div key={i} className="w-full bg-amber-500/10 rounded-t-sm relative group">
                    <div style={{ height: `${h}%` }} className="bg-amber-500/40 group-hover:bg-amber-400 transition-all rounded-t-sm"></div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0f1115] text-[10px] text-white px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${h * 12}
                    </div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between px-4 mt-4 text-[10px] text-gray-500 font-bold">
               <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span>
            </div>
         </div>

         <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Top Selling Products</h2>
            <div className="space-y-4">
               {[
                 { name: 'Brazilian Water Wave 4 Bundles', sales: 124, revenue: '$15,500' },
                 { name: 'Bone Straight 13x6 HD Lace Wig', sales: 93, revenue: '$14,415' },
                 { name: 'Queen Hair 10A Brazilian Straight', sales: 89, revenue: '$6,675' },
                 { name: 'Body Wave Lace Front Wigs', sales: 84, revenue: '$11,340' },
               ].map((p, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0f1115] border border-white/5">
                    <div>
                       <p className="text-sm font-medium text-white">{p.name}</p>
                       <p className="text-xs text-gray-500">{p.sales} units sold</p>
                    </div>
                    <p className="text-sm font-bold text-amber-500">{p.revenue}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    
    </div>
  );
}
