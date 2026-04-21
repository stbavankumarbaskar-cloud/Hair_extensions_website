"use client";
import React from 'react';
import { Mail, Edit2, Plus, Info } from 'lucide-react';

export default function ProfilePage() {
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    const email = localStorage.getItem('user_email');
    if (email) setUserEmail(email);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user_email');
    // Trigger a storage event for the header to update
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/';
  };

  return (
    <div className="max-w-[720px]">
      <h1 className="text-[32px] font-bold text-gray-900 mb-8">Profile</h1>

      <div className="space-y-6">
        {/* Personal Info Section */}
        <div className="bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm">
           <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                   <label className="text-[13px] text-gray-400 font-medium">Name</label>
                   <button className="text-blue-600 hover:text-blue-700">
                     <Edit2 className="w-4 h-4" />
                   </button>
                </div>
                <p className="text-gray-900 font-medium">-</p>
              </div>

              <div>
                <label className="text-[13px] text-gray-400 font-medium block mb-1">Email</label>
                <p className="text-gray-900 font-medium">{userEmail || 'Loading...'}</p>
              </div>
           </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-sm">
           <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
             <h3 className="font-bold text-gray-900">Addresses</h3>
             <button className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:underline">
               <Plus className="w-4 h-4" />
               <span>Add</span>
             </button>
           </div>
           <div className="p-12 flex flex-col items-center justify-center text-center">
             <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
               <Info className="w-6 h-6" />
             </div>
             <p className="text-gray-500 font-medium">No addresses added</p>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-start gap-4 pt-6">
           <button 
            onClick={handleSignOut}
            className="h-[48px] px-6 bg-white border border-gray-200 rounded-[12px] font-bold text-gray-900 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
           >
             Sign out
           </button>
           <button className="text-[13px] text-blue-600 font-medium hover:underline">
             Sign out of all devices
           </button>
        </div>
      </div>
    </div>
  );
}
