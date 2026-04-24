'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, Users, Star, 
  Settings, LogOut, Search, Bell, Truck, DollarSign, Tag, 
  BarChart3, Loader2, Layout
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-amber-500/20">
      
      {/* Sidebar - Clean White */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm">
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-slate-100 space-x-3">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100 overflow-hidden group-hover:border-amber-500/50 transition-all">
              <img src="/logo1.png" alt="Logo" className="w-full h-full object-contain scale-110" />
            </div>
            <span className="font-serif font-bold tracking-widest text-[13px] text-slate-900 uppercase group-hover:text-amber-600 transition-colors">Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-[10px] uppercase tracking-widest text-slate-400 mb-4 font-bold">Main Menu</p>
          
          <Link href="/admin" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${pathname === '/admin' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
            <LayoutDashboard className={`w-5 h-5 group-hover:scale-110 transition-transform ${pathname === '/admin' ? 'text-amber-600' : ''}`} strokeWidth={2}/>
            <span className="font-semibold text-[14px]">Dashboard</span>
          </Link>
          
          {[
            { href: '/admin/products',  Icon: ShoppingBag,  label: 'Products'   },
            { href: '/admin/orders',    Icon: ShoppingCart, label: 'Orders'     },
            { href: '/admin/customers', Icon: Users,        label: 'Customers'  },
            { href: '/admin/reviews',   Icon: Star,         label: 'Reviews'    },
          ].map(({ href, Icon, label }) => (
            <Link key={href} href={href} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${pathname.startsWith(href) ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
              <Icon className={`w-5 h-5 group-hover:scale-110 transition-transform ${pathname.startsWith(href) ? 'text-amber-600' : ''}`} strokeWidth={2} />
              <span className="font-semibold text-[14px]">{label}</span>
            </Link>
          ))}

          <div className="pt-4 pb-2">
            <p className="px-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Management</p>
          </div>

          {[
            { href: '/admin/payments',   Icon: DollarSign,  label: 'Payments'    },
            { href: '/admin/shipping',   Icon: Truck,       label: 'Shipping'    },
            { href: '/admin/categories', Icon: Tag,         label: 'Categories'  },
            { href: '/admin/content',    Icon: Layout,      label: 'Content CMS' },
            { href: '/admin/reports',    Icon: BarChart3,   label: 'Reports'     },
          ].map(({ href, Icon, label }) => (
            <Link key={href} href={href} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${pathname.startsWith(href) ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
              <Icon className={`w-5 h-5 group-hover:scale-110 transition-transform ${pathname.startsWith(href) ? 'text-amber-600' : ''}`} strokeWidth={2} />
              <span className="font-semibold text-[14px]">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link href="/admin/settings" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${pathname.startsWith('/admin/settings') ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
            <Settings className={`w-5 h-5 group-hover:scale-110 transition-transform group-hover:rotate-45 ${pathname.startsWith('/admin/settings') ? 'text-amber-600' : ''}`} strokeWidth={2}/>
            <span className="font-semibold text-[14px]">Settings</span>
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem('admin_token');
              router.push('/admin/login');
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500/80 hover:text-red-600 hover:bg-red-50/50 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2}/>
            <span className="font-semibold text-[14px]">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Glow effect in background - softer for light mode */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/[0.03] rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

        {/* Top Navbar */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 border-b border-slate-200 bg-white/80 backdrop-blur-md relative z-10">
          
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 w-64 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative text-slate-400 hover:text-slate-900 transition-colors group">
              <Bell className="w-5 h-5 group-hover:animate-swing" strokeWidth={2}/>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50"></span>
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-slate-200 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Admin User</p>
                <p className="text-[11px] text-slate-500">Superadmin</p>
              </div>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin" className="w-9 h-9 rounded-full object-cover border border-slate-200 group-hover:border-amber-500/50 transition-colors" />
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




