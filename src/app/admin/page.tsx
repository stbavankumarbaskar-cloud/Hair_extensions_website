import React from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp, MoreHorizontal, ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';
import pool from '@/lib/db';

const FALLBACK_ORDERS = [
  { id: 1, order_number: '#ORD-001', customer_name: 'Emma Watson', product_name: '100% Brazilian Human Hair Bundles', created_at: '2 mins ago', status: 'Processing', amount: '345.00' },
  { id: 2, order_number: '#ORD-002', customer_name: 'Sophia Turner', product_name: 'Loose Deep Wave wig 13x4 Lace', created_at: '45 mins ago', status: 'Completed', amount: '120.00' },
  { id: 3, order_number: '#ORD-003', customer_name: 'Mia Johnson', product_name: 'Body Wave Lace Front Wigs', created_at: '2 hours ago', status: 'Pending', amount: '135.00' },
  { id: 4, order_number: '#ORD-004', customer_name: 'Isabella Smith', product_name: 'Bone Straight 13x6 HD Lace Front Wig', created_at: '4 hours ago', status: 'Completed', amount: '155.00' },
  { id: 5, order_number: '#ORD-005', customer_name: 'Olivia Williams', product_name: 'Indian Deep Wave 3 Bundles', created_at: 'Yesterday', status: 'Processing', amount: '118.00' },
];

export default async function AdminDashboard() {
  let recentOrders = FALLBACK_ORDERS;
  let lowStockProducts: any[] = [];
  let dbConnected = false;
  let dbError = "";
  let stats = [
    { id: 1, title: 'Total Revenue', value: '$0.00', change: '+0%', positive: true, icon: DollarSign },
    { id: 2, title: 'Active Orders', value: '0', change: '+0%', positive: true, icon: ShoppingCart },
    { id: 3, title: 'Total Customers', value: '0', change: '+0%', positive: true, icon: Users },
    { id: 4, title: 'Monthly Growth', value: '+0%', change: '+0%', positive: true, icon: TrendingUp },
  ];

  try {
    // 1. Fetch KPI Stats
    const [revResult]: any = await pool.query('SELECT SUM(amount) as total FROM orders WHERE status = "Completed"');
    const [ordersResult]: any = await pool.query('SELECT COUNT(*) as count FROM orders WHERE status IN ("Pending", "Processing")');
    const [custResult]: any = await pool.query('SELECT COUNT(DISTINCT customer_name) as count FROM orders');
    
    stats[0].value = `$${(revResult[0]?.total || 0).toLocaleString()}`;
    stats[1].value = (ordersResult[0]?.count || 0).toString();
    stats[2].value = (custResult[0]?.count || 0).toString();
    stats[3].value = '+12%'; // Mock growth

    // 2. Fetch Recent Orders
    const [orderRows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5');
    if (Array.isArray(orderRows) && orderRows.length > 0) {
      recentOrders = orderRows as any[];
    }

    // 3. Fetch Low Stock Products
    const [stockRows] = await pool.query('SELECT * FROM products WHERE stock <= 5 ORDER BY stock ASC LIMIT 5');
    if (Array.isArray(stockRows)) {
      lowStockProducts = stockRows as any[];
    }

    dbConnected = true;
  } catch (error: any) {
    dbError = error.message;
    console.log("Database fetch failed, using fallback data. Error:", error.message);
  }

  // Format the date helper
  const formatDate = (dateInput: any) => {
    if (typeof dateInput === 'string' && (dateInput.includes('ago') || dateInput === 'Yesterday')) return dateInput;
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Page Header and DB Warning */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-400 mt-2 text-sm">Welcome back, here is what's happening with your store today.</p>
        </div>
        
        {/* Database Connection Status Pill */}
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-medium shadow-sm transition-all
          ${dbConnected ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
          <div className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`}></div>
          <span className="flex items-center">
            {dbConnected ? 'Database Connected' : 'No Database Connection'}
          </span>
        </div>
      </div>

      {!dbConnected && (
         <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">MySQL Connection Failed</p>
              <p className="opacity-80 text-xs mt-1">Please ensure you have created the `lovehair_db` in MySQL Workbench using the provided setup script. Showing dummy data in the meantime. Error: {dbError}</p>
            </div>
         </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-[#16181d] border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-amber-500/30 transition-colors duration-300">
            {/* Subtle glow on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-colors"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-[#0f1115] rounded-xl border border-white/5 text-amber-400">
                <stat.icon className="w-5 h-5" strokeWidth={2}/>
              </div>
              <div className={`flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-full ${stat.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{stat.change}</span>
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Graph & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mock Graphic Chart Area */}
        <div className="lg:col-span-2 bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Revenue Analytics</h2>
              <p className="text-xs text-gray-500">Weekly sales performance</p>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors">
              <MoreHorizontal className="w-5 h-5"/>
            </button>
          </div>
          
          {/* Faux graph UI */}
          <div className="flex-1 min-h-[250px] relative mt-4 flex items-end space-x-2 sm:space-x-4">
            {/* Graph Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full h-px bg-white/5"></div>
              <div className="w-full h-px bg-white/5"></div>
              <div className="w-full h-px bg-white/5"></div>
              <div className="w-full h-px bg-white/5"></div>
              <div className="w-full h-px bg-white/5"></div>
            </div>
            
            {/* Dynamic Bars */}
            {[45, 60, 30, 80, 50, 95, 65].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer z-10">
                <div className="w-full relative flex items-end justify-center h-[200px]">
                  <div 
                    style={{ height: `${height}%` }} 
                    className="w-full max-w-[40px] bg-gradient-to-t from-amber-600/20 to-amber-400 rounded-t-md opacity-70 group-hover:opacity-100 transition-all duration-300 relative group-hover:-translate-y-1 shadow-[0_0_15px_rgba(251,191,36,0.1)] group-hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                  >
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0f1115] text-white text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                        ${(height * 123.4).toFixed(0)}
                     </div>
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 mt-3 font-medium uppercase">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="lg:col-span-1 bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-amber-500 hover:text-amber-400 font-medium transition-colors">View All</Link>
          </div>
          
          <div className="space-y-4">
            {recentOrders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">{order.customer_name}</p>
                  <p className="text-[11px] text-gray-500 truncate max-w-[120px]">{order.product_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">${Number(order.amount).toFixed(2)}</p>
                  <p className={`text-[10px] px-1.5 py-0.5 rounded uppercase mt-1 inline-block font-semibold
                    ${order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                      order.status === 'Processing' ? 'bg-blue-500/10 text-blue-400' : 
                      'bg-amber-500/10 text-amber-400'}`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-1 bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6">
           <div className="flex items-center gap-2 mb-6">
             <AlertCircle className="w-5 h-5 text-red-500" />
             <h2 className="text-lg font-semibold text-white">Low Stock Alerts</h2>
           </div>
           
           <div className="space-y-4">
             {lowStockProducts.length === 0 ? (
               <div className="text-center py-8 text-gray-500 text-sm italic">
                 <p>All inventory levels are healthy.</p>
               </div>
             ) : (
               lowStockProducts.map((product) => (
                 <div key={product.id} className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <img src={product.img} alt="" className="w-8 h-8 rounded object-cover" />
                      <div>
                        <p className="text-xs font-medium text-white group-hover:text-red-400 transition-colors truncate max-w-[100px]">{product.name}</p>
                        <p className="text-[10px] text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-red-400">{product.stock} left</p>
                      <Link href={`/admin/products/${product.id}`} className="text-[10px] text-amber-500 hover:underline">Restock</Link>
                    </div>
                 </div>
               ))
             )}
           </div>
        </div>

      </div>

      {/* Analytics Graph & Recent Orders row... */}

      {/* Detailed Orders Table */}
      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6 overflow-hidden">
        <h2 className="text-lg font-semibold text-white mb-6">Order Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#0f1115] text-gray-500">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 font-medium text-amber-500">{order.order_number}</td>
                  <td className="px-4 py-4 text-white">{order.customer_name}</td>
                  <td className="px-4 py-4 text-gray-500">{formatDate(order.created_at)}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider
                      ${order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        order.status === 'Processing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-white font-medium">${Number(order.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
