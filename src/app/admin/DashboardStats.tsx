"use client";
import React, { useState } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, X, 
  DollarSign, ShoppingCart, Users, TrendingUp 
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp
};

interface Stat {
  id: number;
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}

interface DashboardStatsProps {
  stats: Stat[];
  recentOrders: any[];
  customersCount: number;
}

export default function DashboardStats({ stats, recentOrders, customersCount }: DashboardStatsProps) {
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null);

  const getModalContent = (stat: Stat) => {
    switch (stat.title) {
      case 'Total Revenue':
        return (
          <div className="space-y-4">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <p className="text-emerald-800 text-sm font-medium">All-time earnings from completed orders.</p>
            </div>
            <div className="space-y-3">
              {recentOrders.slice(0, 5).map((order: any) => (
                <div key={order.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{order.order_number}</p>
                    <p className="text-[11px] text-slate-500">{order.customer_name}</p>
                  </div>
                  <p className="text-sm font-bold text-emerald-600">₹{Number(order.amount).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Active Orders':
        const active = recentOrders.filter(o => o.status !== 'Completed');
        return (
          <div className="space-y-4">
             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-blue-800 text-sm font-medium">Orders currently being processed or pending.</p>
            </div>
            {active.length > 0 ? (
              <div className="space-y-3">
                {active.map((order: any) => (
                  <div key={order.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{order.order_number}</p>
                      <p className="text-[11px] text-slate-500">{order.status}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-900">₹{Number(order.amount).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-6 text-slate-400 text-sm italic">No active orders found.</p>
            )}
          </div>
        );
      case 'Total Customers':
        return (
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <p className="text-amber-800 text-sm font-medium">Total registered users in your store database.</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
               <span className="text-sm font-bold text-slate-700">Database Count</span>
               <span className="text-xl font-bold text-amber-600">{customersCount}</span>
            </div>
            <p className="text-xs text-slate-400 text-center">Visit the Customers page for the full directory.</p>
          </div>
        );
      case 'Monthly Growth':
        return (
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <p className="text-purple-800 text-sm font-medium">Comparison of revenue between current and last month.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Growth Rate</p>
                  <p className="text-lg font-bold text-emerald-600">{stat.change}</p>
               </div>
               <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Trend</p>
                  <p className="text-lg font-bold text-slate-900">Steady Upward</p>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = ICON_MAP[stat.icon] || TrendingUp;
          return (
            <div 
              key={stat.id} 
              onClick={() => setSelectedStat(stat)}
              className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300 hover:shadow-md cursor-pointer active:scale-95"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/[0.06] transition-colors"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-amber-600">
                  <Icon className="w-5 h-5" strokeWidth={2}/>
                </div>
                <div className={`flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.positive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-slate-500 text-sm font-semibold mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              
              <div className="absolute bottom-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">View Details →</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Overlay - Using Portal to escape parent transforms */}
      {selectedStat && typeof document !== 'undefined' && 
        require('react-dom').createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setSelectedStat(null)} 
          />
          
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300 border border-slate-200 overflow-hidden ring-1 ring-slate-200">
            {/* Modal Header - Fixed at top */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100 text-amber-600 shadow-sm">
                  {React.createElement(ICON_MAP[selectedStat.icon] || TrendingUp, { className: "w-5 h-5", strokeWidth: 2.5 })}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{selectedStat.title}</h3>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Dashboard Metric</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStat(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Current Standing</p>
                <p className="text-4xl font-bold text-slate-900 tracking-tight">{selectedStat.value}</p>
                <div className={`inline-flex items-center gap-1 text-[11px] font-bold mt-3 px-3 py-1 rounded-full ${selectedStat.positive ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-red-700 bg-red-50 border border-red-100'}`}>
                   {selectedStat.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                   {selectedStat.change} Growth
                </div>
              </div>

              <div className="space-y-6">
                <div>
                   <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Metric Breakdown</h4>
                   {getModalContent(selectedStat)}
                </div>
              </div>
            </div>

            {/* Modal Footer - Fixed at bottom */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
              <button 
                onClick={() => setSelectedStat(null)}
                className="px-8 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
