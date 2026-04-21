'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, Users, Star, 
  Settings, LogOut, Search, Bell, Truck, DollarSign, Tag, 
  BarChart3, Loader2
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Check for admin token in localStorage
    const token = localStorage.getItem('admin_token');
    
    if (!token && !isLoginPage) {
      setIsAuthorized(false);
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [isLoginPage, router]);

  // Handle Login Page separately (no sidebar/auth check needed here)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading or nothing until auth check is complete for other admin pages
  if (isAuthorized === null || isAuthorized === false) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 flex font-sans selection:bg-amber-500/30">
      
      {/* Sidebar - Glassmorphic Dark */}
      <aside className="w-64 flex-shrink-0 bg-[#16181d]/80 backdrop-blur-xl border-r border-white/5 flex flex-col transition-all duration-300">
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-white/5 space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <span className="font-serif font-bold text-white text-sm">LH</span>
          </div>
          <span className="font-serif font-semibold tracking-widest text-[13px] text-white uppercase">Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-semibold">Main Menu</p>
          
          <Link href="/admin" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${pathname === '/admin' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <LayoutDashboard className={`w-5 h-5 group-hover:scale-110 transition-transform ${pathname === '/admin' ? 'text-amber-500' : ''}`} strokeWidth={2}/>
            <span className="font-medium text-[14px]">Dashboard</span>
          </Link>
          
          {[
            { href: '/admin/products',  Icon: ShoppingBag,  label: 'Products'   },
            { href: '/admin/orders',    Icon: ShoppingCart, label: 'Orders'     },
            { href: '/admin/customers', Icon: Users,        label: 'Customers'  },
            { href: '/admin/reviews',   Icon: Star,         label: 'Reviews'    },
          ].map(({ href, Icon, label }) => (
            <Link key={href} href={href} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${pathname.startsWith(href) ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <Icon className={`w-5 h-5 group-hover:scale-110 transition-transform ${pathname.startsWith(href) ? 'text-amber-500' : ''}`} strokeWidth={2} />
              <span className="font-medium text-[14px]">{label}</span>
            </Link>
          ))}

          <div className="pt-4 pb-2">
            <p className="px-4 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Management</p>
          </div>

          {[
            { href: '/admin/payments',   Icon: DollarSign,  label: 'Payments'    },
            { href: '/admin/shipping',   Icon: Truck,       label: 'Shipping'    },
            { href: '/admin/categories', Icon: Tag,         label: 'Categories'  },
            { href: '/admin/reports',    Icon: BarChart3,   label: 'Reports'     },
          ].map(({ href, Icon, label }) => (
            <Link key={href} href={href} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${pathname.startsWith(href) ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <Icon className={`w-5 h-5 group-hover:scale-110 transition-transform ${pathname.startsWith(href) ? 'text-amber-500' : ''}`} strokeWidth={2} />
              <span className="font-medium text-[14px]">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link href="/admin/settings" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${pathname.startsWith('/admin/settings') ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Settings className={`w-5 h-5 group-hover:scale-110 transition-transform group-hover:rotate-45 ${pathname.startsWith('/admin/settings') ? 'text-amber-500' : ''}`} strokeWidth={2}/>
            <span className="font-medium text-[14px]">Settings</span>
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem('admin_token');
              router.push('/admin/login');
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2}/>
            <span className="font-medium text-[14px]">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Glow effect in background */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

        {/* Top Navbar */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-[#16181d]/50 backdrop-blur-md relative z-10">
          
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-[#0f1115] border border-white/10 rounded-full pl-10 pr-4 py-2 w-64 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative text-gray-400 hover:text-white transition-colors group">
              <Bell className="w-5 h-5 group-hover:animate-swing" strokeWidth={2}/>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></span>
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-white/10 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-medium text-white group-hover:text-amber-400 transition-colors">Admin User</p>
                <p className="text-[11px] text-gray-500">Superadmin</p>
              </div>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin" className="w-9 h-9 rounded-full object-cover border border-white/10 group-hover:border-amber-500/50 transition-colors" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto p-8 relative z-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}



