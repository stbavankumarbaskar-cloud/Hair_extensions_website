"use client";
import React, { useState } from 'react';
import { Mail, Fingerprint, ChevronDown, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const [view, setView] = useState<'shop' | 'verify'>('shop');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);

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
      alert("Something went wrong.");
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
        localStorage.setItem('user_email', email);
        // Trigger storage event for header
        window.dispatchEvent(new Event('storage'));
        window.location.href = '/account/profile';
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

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="w-full max-w-[480px] bg-white rounded-[32px] shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {view === 'shop' ? (
          <div className="p-10 flex flex-col items-center">
             {/* Shop Logo & Hair Thumbnail */}
             <div className="flex items-center justify-center gap-4 mb-10">
               <div className="w-16 h-16 rounded-full bg-[#5a31f4] flex items-center justify-center text-white text-2xl font-bold italic shadow-lg">
                 shɔp
               </div>
               <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
               <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                 <img src="/logo1.png" alt="Hair Store" className="w-full h-full object-cover" />
               </div>
             </div>

             <h1 className="text-[32px] font-bold text-gray-900 mb-2">Sign in to Shop</h1>
             <p className="text-gray-500 mb-10 font-medium text-center">To continue to <span className="text-black font-bold">One Love Hair GmbH</span></p>

             <div className="w-full space-y-5">
               <div className="relative group">
                 <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full h-[68px] px-7 bg-white border border-gray-300 rounded-[24px] text-gray-900 text-lg placeholder-gray-500 focus:outline-none focus:border-[#5a31f4] focus:ring-2 focus:ring-[#5a31f4]/20 transition-all shadow-sm"
                />
               </div>

               <button 
                onClick={handleContinue}
                disabled={isLoading}
                className="w-full h-[68px] bg-[#5a31f4] hover:bg-[#4d2ad1] text-white rounded-full font-bold text-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
               >
                 {isLoading ? (
                   <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   "Continue"
                 )}
               </button>
             </div>

             <div className="mt-10 text-center px-6">
              <p className="text-[13px] text-gray-400 leading-relaxed">
                By continuing, you agree to Shop's <a href="#" className="underline">terms</a>, <a href="#" className="underline">privacy policy</a>, and to sharing your email, name, and avatar with One Love Hair GmbH. See their <a href="#" className="underline">terms</a> and <a href="#" className="underline">privacy policy</a>.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 w-full flex justify-center">
               <div className="flex items-center gap-2 text-[14px] text-gray-500 font-medium cursor-pointer hover:text-gray-900 transition-colors">
                <span>English</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 flex flex-col items-center">
             {/* Phone/Email Illustration */}
             <div className="relative mb-10">
               <div className="w-[100px] h-[170px] bg-[#2a138c] rounded-[24px] relative flex flex-col items-center pt-6 shadow-2xl">
                 <div className="w-3 h-3 bg-black/20 rounded-full mb-6"></div>
                 <div className="bg-white rounded-xl p-3 shadow-lg animate-bounce">
                    <Mail className="w-10 h-10 text-[#5a31f4]" />
                 </div>
                 <div className="absolute top-6 right-4 w-4 h-4 bg-red-500 rounded-full border-3 border-[#2a138c]"></div>
               </div>
             </div>

             <h2 className="text-[36px] font-bold text-gray-900 mb-3 text-center tracking-tight">Confirm it's you</h2>
             <p className="text-gray-500 text-center mb-12 max-w-[320px] text-lg">
               Enter code sent to <br/><span className="text-black font-bold break-all">{email}</span>
             </p>

             {/* Code Inputs */}
             <div className="flex gap-3 mb-12 relative">
               {isLoading && (
                 <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center rounded-xl">
                    <div className="w-10 h-10 border-4 border-[#5a31f4]/30 border-t-[#5a31f4] rounded-full animate-spin" />
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
                    className="w-[60px] h-[76px] border-2 border-gray-200 rounded-[18px] text-center text-3xl font-bold text-gray-900 focus:outline-none focus:border-[#5a31f4] focus:ring-4 focus:ring-[#5a31f4]/10 transition-all"
                   />
                   {i === 2 && <div className="flex items-center justify-center w-2 text-gray-300 font-bold text-2xl">•</div>}
                 </React.Fragment>
               ))}
             </div>

             <button 
              onClick={() => setView('shop')}
              className="flex items-center gap-2 text-gray-900 font-bold hover:bg-gray-50 px-6 py-3 rounded-xl transition-all"
             >
               <ArrowRight className="w-5 h-5 rotate-180" />
               <span>Use a different account</span>
             </button>

             <div className="mt-16 pt-8 border-t border-gray-100 w-full flex justify-center">
               <div className="flex items-center gap-2 text-[14px] text-gray-500 font-medium cursor-pointer hover:text-gray-900 transition-colors">
                <span>English</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex gap-6">
        <Link href="#" className="text-[14px] text-blue-600 hover:underline">Privacy policy</Link>
      </div>
    </div>
  );
}
