"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import AccountModal from './AccountModal';
import { useCart } from '@/lib/CartContext';

export default function Header() {
  const { setIsCartOpen, totalQty } = useCart();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [settings, setSettings] = useState<any>({});

  React.useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => { if (data.success) setSettings(data.settings); })
      .catch(err => console.error("Settings Error:", err));
  }, []);

  // Check login status on load
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('user_email');
    if (savedEmail) {
      setIsLoggedIn(true);
      setUserEmail(savedEmail);
    }

    // Listen for storage changes (for logout)
    const handleStorageChange = () => {
      const email = localStorage.getItem('user_email');
      if (!email) {
        setIsLoggedIn(false);
        setUserEmail('');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('user_email', email);
    setIsAccountOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('user_email');
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <>
      <AccountModal 
        isOpen={isAccountOpen} 
        onClose={() => setIsAccountOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
        onLogout={handleLogout} 
        isLoggedIn={isLoggedIn} 
        userEmail={userEmail} 
      />

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 animate-in zoom-in duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
              <input
                type="text"
                autoFocus
                placeholder="Search our store..."
                className="w-full text-2xl md:text-3xl font-medium bg-transparent outline-none placeholder:text-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition ml-4">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 font-sans">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {["Premium Wavy", "Clip-In Hair", "Indian Remy", "Bundles", "Wigs"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-4 py-2 bg-gray-50 hover:bg-black hover:text-white rounded-lg text-sm font-medium transition cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Placeholder */}
      <div className="bg-black text-white text-xs text-center py-2 tracking-widest uppercase">
        {settings.promo_text || 'Spring Sale! Extra 15% Off Site-Wide'}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fdfdfd] border-b border-gray-100">
        <div className="w-full px-4 lg:px-8">
          <div className="flex justify-between items-center h-[90px] lg:h-[110px]">
            {/* Left Area: Logo + Nav */}
            <div className="flex items-center">
              <Link href="/" className="flex flex-col items-center flex-shrink-0 cursor-pointer mr-4 lg:mr-6 -ml-2">
                <img
                  src="/logo1.png"
                  alt={settings.site_name || "One Love Hair Logo"}
                  className="h-28 w-[110px] object-cover object-center mix-blend-multiply"
                />
              </Link>

              <nav className="hidden xl:flex items-center space-x-6 lg:space-x-[28px]">
                <Link href="/" className="whitespace-nowrap text-[#1a202c] hover:text-[#CAA45D] font-medium text-sm lg:text-[15px] transition-colors">Home</Link>
                <a href="#" className="whitespace-nowrap text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[15px] transition-colors">Premium Hair Extensions</a>
                <a href="#" className="whitespace-nowrap text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[15px] transition-colors">Premium Clip-In Hair Extensions</a>
                <a href="#" className="whitespace-nowrap text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[15px] transition-colors">Premium Keratin Bond Extensions</a>
                <a href="#" className="whitespace-nowrap text-[#1a202c] hover:text-[#CAA45D] font-normal text-sm lg:text-[15px] transition-colors">More</a>
              </nav>
            </div>

            {/* Right Area: Action Icons */}
            <div className="flex items-center flex-shrink-0 space-x-5 lg:space-x-[26px] text-[#2c3e50]">
              {/* Region / Currency */}
              <div className="relative">
                <div
                  onClick={() => setIsRegionOpen(!isRegionOpen)}
                  className="hidden sm:flex items-center whitespace-nowrap cursor-pointer text-[14px] font-normal hover:text-[#CAA45D] transition"
                >
                  INR / EN <ChevronDown className={`w-[14px] h-[14px] ml-[2px] opacity-70 transition-transform ${isRegionOpen ? 'rotate-180' : ''}`} strokeWidth={2} />
                </div>
                {isRegionOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-md py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Region</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between group">
                      <span>India (INR ₹)</span>
                      <span className="text-teal-600 opacity-0 group-hover:opacity-100">✓</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 opacity-40 cursor-not-allowed">
                      Switzerland (CHF)
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 opacity-40 cursor-not-allowed">
                      United States (USD)
                    </button>
                    <div className="px-4 py-2 border-t border-gray-50 mt-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Language</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">English</button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 opacity-40 cursor-not-allowed">Deutsch</button>
                  </div>
                )}
              </div>

              {/* Search */}
              <div
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center whitespace-nowrap cursor-pointer text-[14px] font-normal hover:text-[#CAA45D] transition gap-1"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </div>

              <div
                onClick={() => setIsAccountOpen(true)}
                className="hidden sm:flex items-center whitespace-nowrap cursor-pointer text-[14px] font-normal hover:text-[#CAA45D] transition"
              >
                {isLoggedIn ? (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#5a31f4] flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#5a31f4]/20">
                      {userEmail.charAt(0).toUpperCase()}
                    </div>
                  </div>
                ) : (
                  "Account"
                )}
              </div>

              <div onClick={() => setIsCartOpen(true)} className="flex items-center whitespace-nowrap cursor-pointer hover:text-[#CAA45D] transition relative">
                <span className="hidden sm:inline text-[14px] font-normal text-[#1a202c]">Cart</span>
                {totalQty > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {totalQty}
                  </span>
                )}
              </div>
              <Menu className="w-6 h-6 xl:hidden cursor-pointer text-gray-800" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
