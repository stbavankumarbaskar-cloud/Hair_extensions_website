import React from 'react';
import { BarChart3, TrendingUp, Users, ShoppingBag, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-500 mt-2 text-sm">Deep dive into your store performance and growth metrics.</p>
        </div>
        <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-sm">
          <Download className="w-4 h-4" />
          <span>Export Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Conversion Rate', value: '3.24%', trend: '+0.5%', pos: true, icon: TrendingUp },
           { label: 'Avg Order Value', value: '$156.00', trend: '-2.1%', pos: false, icon: BarChart3 },
           { label: 'Repeat Customers', value: '24%', trend: '+4.2%', pos: true, icon: Users },
           { label: 'Abandoned Carts', value: '42', trend: '-8%', pos: true, icon: ShoppingBag },
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden group shadow-sm">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-slate-50 rounded-full blur-xl group-hover:bg-slate-100 transition-all"></div>
              <div className="flex justify-between items-start mb-3 relative z-10">
                 <div className="p-2 bg-slate-50 rounded-lg text-slate-400 border border-slate-100"><stat.icon className="w-4 h-4" /></div>
                 <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border
                   ${stat.pos ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                   {stat.pos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                   {stat.trend}
                 </div>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider relative z-10">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 relative z-10">{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Sales Performance Chart */}
         <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 min-h-[400px] flex flex-col group">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-bold text-slate-900">Sales Performance</h2>
               <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-500 font-bold focus:outline-none focus:border-amber-500/50">
                  <option>Last 12 Months</option>
                  <option>Last 30 Days</option>
               </select>
            </div>
            <div className="flex-1 flex items-end justify-between gap-1 sm:gap-2 px-2 sm:px-4">
               {[65, 45, 75, 55, 90, 70, 85, 60, 95, 80, 100, 90].map((h, i) => (
                 <div key={i} className="w-full bg-slate-50 rounded-t-sm relative group/bar h-full flex flex-col justify-end">
                    <div 
                      style={{ height: `${h}%` }} 
                      className="bg-amber-500/30 group-hover/bar:bg-amber-500/50 group-hover:bg-amber-500/40 transition-all rounded-t-sm relative"
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-[10px] text-white px-2 py-1 rounded shadow-lg opacity-0 group-hover/bar:opacity-100 transition-opacity z-20 whitespace-nowrap">
                        ${(h * 123).toLocaleString()}
                      </div>
                    </div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between px-2 sm:px-4 mt-4 text-[9px] sm:text-[10px] text-slate-400 font-bold">
               {['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'].map(m => <span key={m}>{m}</span>)}
            </div>
         </div>

         {/* Top Selling Products */}
         <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 overflow-hidden flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Top Selling Products</h2>
            <div className="space-y-4 flex-1">
               {[
                 { name: 'Brazilian Water Wave 4 Bundles', sales: 124, revenue: '$15,500', trend: '+15%' },
                 { name: 'Bone Straight 13x6 HD Lace Wig', sales: 93, revenue: '$14,415', trend: '+8%' },
                 { name: 'Queen Hair 10A Brazilian Straight', sales: 89, revenue: '$6,675', trend: '+12%' },
                 { name: 'Body Wave Lace Front Wigs', sales: 84, revenue: '$11,340', trend: '-2%' },
                 { name: 'Indian Deep Wave 3 Bundles', sales: 76, revenue: '$9,348', trend: '+5%' },
               ].map((p, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold border border-amber-200 shadow-sm">#{i+1}</div>
                       <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{p.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{p.sales} units sold</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-bold text-slate-900">{p.revenue}</p>
                       <p className={`text-[10px] font-bold ${p.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{p.trend}</p>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-xl border border-slate-200 text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all font-bold uppercase tracking-widest">
               View Full Product Report
            </button>
         </div>
      </div>
    
    </div>
  );

}
