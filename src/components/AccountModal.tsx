"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { X, Mail, ShoppingBag, User, ArrowRight, Fingerprint, ChevronDown, LogOut } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  userEmail: string;
}

export default function AccountModal({ isOpen, onClose, onLoginSuccess, onLogout, isLoggedIn, userEmail }: AccountModalProps) {
  const [view, setView] = useState<'welcome' | 'shop' | 'verify'>('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);

  if (!isOpen) return null;

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const handleShopSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('shop');
    }, 800);
  };

  const handleContinue = async () => {
    if (!email.includes('@')) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (data.success) {
        setView('verify');
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error("OTP Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (codeArray: string[]) => {
    const fullCode = codeArray.join('');
    if (fullCode.length !== 6) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: fullCode }),
      });
      
      const data = await response.json();
      if (data.success) {
        onLoginSuccess(email);
        setView('welcome');
        setEmail('');
        setOtpCode(['', '', '', '', '', '']);
      } else {
        alert(data.error || "Invalid code");
      }
    } catch (err) {
      console.error("Verification Error:", err);
      alert("Verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...otpCode];
    newCode[index] = value;
    setOtpCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    if (newCode.every(v => v !== '')) {
      handleVerify(newCode);
    }
  };

  const handleBack = () => {
    if (view === 'verify') setView('shop');
    else setView('welcome');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 min-h-[240px] flex flex-col">
        
        {isLoggedIn ? (
          <div className="p-8 flex-1 flex flex-col">
             <div className="flex justify-between items-start mb-6">
               <div>
                 <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">Account</h2>
                 <p className="text-gray-500 font-medium">{userEmail}</p>
               </div>
               <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 bg-gray-50"
              >
                <X className="w-5 h-5" />
              </button>
             </div>

             <div className="grid grid-cols-2 gap-4 mt-auto">
                <Link 
                  href="/account/orders"
                  onClick={onClose}
                  className="flex items-center justify-center gap-3 h-[68px] border border-gray-200 rounded-[22px] text-gray-700 font-bold hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-900" />
                  <span>Orders</span>
                </Link>
                <Link 
                  href="/account/profile"
                  onClick={onClose}
                  className="flex items-center justify-center gap-3 h-[68px] border border-gray-200 rounded-[22px] text-gray-700 font-bold hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                  <User className="w-5 h-5 text-gray-900" />
                  <span>Profile</span>
                </Link>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-4 flex items-center justify-center gap-3 h-[64px] bg-red-50/30 border border-red-100/50 rounded-[22px] text-red-600 font-bold hover:bg-red-50 hover:border-red-200 transition-all active:scale-[0.98] group"
              >
                <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <span>Sign out</span>
              </button>
          </div>
        ) : view === 'welcome' ? (
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-6 flex justify-between items-center">
              <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">Sign in or create account</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-8 space-y-6 flex-1">
              
              {/* Sign in with shop button */}
              <button 
                onClick={handleShopSignIn}
                disabled={isLoading}
                className="w-full h-[54px] bg-[#5a31f4] hover:bg-[#4d2ad1] text-white flex items-center justify-center rounded-2xl font-bold text-lg transition-colors shadow-md group disabled:opacity-90"
              >
                 {isLoading ? (
                   <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   <>
                     <span className="tracking-tight">Sign in with </span>
                     <span className="ml-1 tracking-tighter">shɔp</span>
                   </>
                 )}
              </button>

              {/* OR Separator */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-[1px] bg-gray-200"></div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">OR</span>
                <div className="flex-1 h-[1px] bg-gray-200"></div>
              </div>

              {/* Email Input with Arrow Box */}
              <div className="w-full relative group mb-8">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleContinue();
                  }}
                  placeholder="Email"
                  className="w-full h-[68px] px-7 bg-white border border-gray-200 rounded-[24px] text-gray-900 text-lg placeholder-gray-400 focus:outline-none focus:border-[#5a31f4] focus:ring-4 focus:ring-[#5a31f4]/10 transition-all shadow-sm"
                />
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleContinue();
                  }}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border-2 border-black rounded-[12px] hover:bg-gray-50 active:scale-95 transition-all text-[#5a31f4]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-200 border-t-[#5a31f4] rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                  )}
                </button>
              </div>

              {/* Bottom Action Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="flex items-center justify-center gap-2 h-[58px] border border-gray-200 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Orders</span>
                </button>
                <button className="flex items-center justify-center gap-2 h-[58px] border border-gray-200 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
              </div>
            </div>
          </div>
        ) : view === 'shop' ? (
          <div className="p-8 flex-1 flex flex-col items-center animate-in slide-in-from-right-4 duration-300">
            {/* Shop Logo & Hair Thumbnail */}
            <div className="flex items-center justify-center gap-3 mb-8">
               <div className="w-14 h-14 rounded-full bg-[#5a31f4] flex items-center justify-center text-white text-xl font-bold italic">
                 shɔp
               </div>
               <div className="w-1 h-[2px] bg-gray-100"></div>
               <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                 <img src="/logo1.png" alt="Hair Store" className="w-full h-full object-cover" />
               </div>
            </div>

            <h2 className="text-[28px] font-bold text-gray-900 mb-1">Sign in to Shop</h2>
            <p className="text-gray-500 mb-8 font-medium text-center">To continue to <span className="text-black font-bold">One Love Hair GmbH</span></p>

            <div className="w-full space-y-4">
               <div className="relative">
                 <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full h-[64px] px-6 bg-white border border-gray-300 rounded-[22px] text-gray-900 text-lg placeholder-gray-500 focus:outline-none focus:border-[#5a31f4] transition-all"
                />
               </div>

               <button 
                onClick={handleContinue}
                disabled={isLoading}
                className="w-full h-[64px] bg-[#5a31f4] hover:bg-[#4d2ad1] text-white rounded-full font-bold text-lg transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
               >
                 {isLoading ? (
                   <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   "Continue"
                 )}
               </button>

               <p className="mt-8 text-[12px] text-gray-400 leading-relaxed text-center px-4">
                By continuing, you agree to Shop's <a href="#" className="underline">terms</a>, <a href="#" className="underline">privacy policy</a>, and to sharing your email, name, and avatar with One Love Hair GmbH. See their <a href="#" className="underline">terms</a> and <a href="#" className="underline">privacy policy</a>.
              </p>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-1 text-[13px] text-gray-500 font-medium cursor-pointer hover:text-gray-900 transition-colors">
              <span>English</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {/* Back button */}
            <button 
              onClick={handleBack}
              className="absolute top-6 left-6 p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
          </div>
        ) : (
          <div className="p-8 flex-1 flex flex-col items-center animate-in slide-in-from-right-4 duration-300">
             {/* Phone/Email Illustration */}
             <div className="relative mb-8">
               <div className="w-[80px] h-[140px] bg-[#2a138c] rounded-[18px] relative flex flex-col items-center pt-4 shadow-xl">
                 <div className="w-2 h-2 bg-black/20 rounded-full mb-4"></div>
                 <div className="bg-white rounded-lg p-2 shadow-lg animate-bounce">
                    <Mail className="w-8 h-8 text-[#5a31f4]" />
                 </div>
                 <div className="absolute top-4 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-[#2a138c]"></div>
               </div>
             </div>

             <h2 className="text-[32px] font-bold text-gray-900 mb-2">Confirm it's you</h2>
             <p className="text-gray-500 text-center mb-10 max-w-[280px]">
               Enter code sent to <br/><span className="text-black font-bold break-all">{email}</span>
             </p>

             {/* Code Inputs */}
             <div className="flex gap-2 mb-10 relative">
               {isLoading && (
                 <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#5a31f4]/30 border-t-[#5a31f4] rounded-full animate-spin" />
                 </div>
               )}
               {[...Array(6)].map((_, i) => (
                 <React.Fragment key={i}>
                   <input 
                    id={`otp-${i}`}
                    type="text" 
                    maxLength={1}
                    value={otpCode[i]}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-[52px] h-[64px] border border-gray-300 rounded-[14px] text-center text-2xl font-bold text-gray-900 focus:outline-none focus:border-[#5a31f4] focus:ring-1 focus:ring-[#5a31f4] transition-all"
                   />
                   {i === 2 && <div className="flex items-center justify-center w-2 text-gray-300">•</div>}
                 </React.Fragment>
               ))}
             </div>

             <button 
              onClick={() => setView('shop')}
              className="flex items-center gap-2 text-gray-900 font-bold hover:opacity-70 transition-opacity mb-auto"
             >
               <ArrowRight className="w-4 h-4 rotate-180" />
               <span>Use a different account</span>
             </button>

             <div className="mt-auto pt-8 flex items-center gap-1 text-[13px] text-gray-500 font-medium cursor-pointer hover:text-gray-900 transition-colors">
              <span>English</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Footer / Subtle line */}
        <div className="h-2 bg-gray-50/50"></div>
      </div>
    </div>
  );
}
