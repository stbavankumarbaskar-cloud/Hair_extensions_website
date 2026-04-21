"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#fbfbfb] font-sans">
      {/* Account Header */}
      <header className="bg-white border-b border-gray-100 h-[80px] flex items-center">
        <div className="max-w-5xl w-full mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-12">
             <Link href="/">
               <img src="/logo1.png" alt="Logo" className="h-20 w-20 object-contain mix-blend-multiply" />
             </Link>
             <nav className="flex gap-8 text-[15px]">
               <Link 
                href="/account/orders" 
                className={`transition-colors ${pathname === '/account/orders' ? 'text-black font-bold border-b-2 border-black pb-1' : 'text-gray-500 hover:text-black'}`}
               >
                 Orders
               </Link>
               <Link 
                href="/account/profile" 
                className={`transition-colors ${pathname === '/account/profile' ? 'text-black font-bold border-b-2 border-black pb-1' : 'text-gray-500 hover:text-black'}`}
               >
                 Profile
               </Link>
             </nav>
          </div>
          <div className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 bg-gray-50 shadow-sm">
             <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {children}
      </main>

      {/* Account Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-200 mt-12">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-blue-600">
           <div className="flex items-center gap-1 text-gray-500">
             <span className="text-base">🌐</span>
             <span>Switzerland</span>
           </div>
           <Link href="#" className="hover:underline">Refund policy</Link>
           <Link href="#" className="hover:underline">Shipping</Link>
           <Link href="#" className="hover:underline">Privacy policy</Link>
           <Link href="#" className="hover:underline">Terms of service</Link>
           <Link href="#" className="hover:underline">Legal notice</Link>
           <Link href="#" className="hover:underline">Contact information</Link>
        </div>
      </footer>
    </div>
  );
}
