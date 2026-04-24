'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Mock login — replace with real API call or database check in production
    setTimeout(() => {
      if (email === 'admin@lovehair.com' && password === 'admin123') {
        // Set a session flag (this is simplified, use proper auth in production)
        localStorage.setItem('admin_token', 'mock-token-' + Date.now());
        router.push('/admin');
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background glows - softer for light mode */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-500/[0.03] rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50">

          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-slate-100 overflow-hidden mb-4 p-2">
              <img src="/logo1.png" alt="Logo" className="w-full h-full object-contain scale-110" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Admin Login</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to manage your store</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lovehair.com"
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center text-slate-400 text-xs">
            <p className="font-medium">© {new Date().getFullYear()} Love Hair Extensions. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );

}
