"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  return (
    <>
      {/* Top Header Placeholder (Normally for Announcements) */}
      <div className="bg-black text-white text-xs text-center py-2 tracking-widest uppercase">
        Spring Sale! Extra 15% Off Site-Wide | Code: SPRING15
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fdfdfd] border-b border-gray-100">
        <div className="w-full px-4 lg:px-8">
          <div className="flex justify-between items-center h-[90px] lg:h-[110px]">
             {/* Left Area: Logo + Nav */}
             <div className="flex items-center">
                 {/* Logo */}
                 <div className="flex flex-col items-center flex-shrink-0 cursor-pointer mr-4 lg:mr-6 -ml-2">
                   <img
                     src="/logo1.png"
                     alt="One Love Hair Logo"
                     className="h-28 w-[110px] object-cover object-center mix-blend-multiply"
                   />
                 </div>

                 {/* Desktop Navigation */}
                 <nav className="hidden xl:flex items-center space-x-6 lg:space-x-[28px]">
                   <a href="#" className="whitespace-nowrap text-[#1a202c] hover:text-[#CAA45D] font-medium text-sm lg:text-[15px] transition-colors">Home</a>
                   <a href="#" className="whitespace-nowrap text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[15px] transition-colors">Premium Hair Extensions</a>
                   <a href="#" className="whitespace-nowrap text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[15px] transition-colors">Premium Clip-In Hair Extensions</a>
                   <a href="#" className="whitespace-nowrap text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[15px] transition-colors">Premium Keratin Bond Extensions</a>
                   <a href="#" className="whitespace-nowrap text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[15px] transition-colors">More</a>
                 </nav>
             </div>

             {/* Right Area: Action Icons */}
            <div className="flex items-center flex-shrink-0 space-x-5 lg:space-x-[26px] text-[#2c3e50]">
              <div className="hidden sm:flex items-center whitespace-nowrap cursor-pointer text-[14px] font-normal hover:text-[#CAA45D] transition">
                 CHF / EN <ChevronDown className="w-[14px] h-[14px] ml-[2px] opacity-70" strokeWidth={2}/>
              </div>
              <div className="hidden sm:flex items-center whitespace-nowrap cursor-pointer text-[14px] font-normal hover:text-[#CAA45D] transition">
                 Search
              </div>
              
              <div className="hidden sm:flex items-center whitespace-nowrap cursor-pointer text-[14px] font-normal hover:text-[#CAA45D] transition">
                 Account
              </div>

               <div onClick={onOpenCart} className="flex items-center whitespace-nowrap cursor-pointer hover:text-[#CAA45D] transition">
                 <span className="hidden sm:inline text-[14px] font-normal text-[#1a202c]">Cart</span>
              </div>
              <Menu className="w-6 h-6 xl:hidden cursor-pointer text-gray-800" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
