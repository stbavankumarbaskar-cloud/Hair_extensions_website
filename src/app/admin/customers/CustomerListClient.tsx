"use client";
import React, { useState } from 'react';
import { Users, Mail, Phone, MapPin, X, Calendar, IndianRupee, ShoppingBag } from 'lucide-react';

interface Customer {
  name: string;
  total_orders: number;
  total_spent: number;
  last_order: string;
  email?: string;
  phone?: string;
  address?: string;
}

export default function CustomerListClient({ customers }: { customers: Customer[] }) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ email: '', phone: '' });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-amber-500/30 transition-all group relative overflow-hidden shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Users className="w-20 h-20 text-slate-900" />
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200 font-bold text-lg shadow-sm">
                 {customer.name ? customer.name.charAt(0) : '?'}
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg group-hover:text-amber-600 transition-colors">{customer.name}</h3>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Customer since {new Date(customer.last_order).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6 relative z-10">
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{customer.email || (customer.name ? customer.name.toLowerCase().replace(' ', '.') + '@example.com' : 'customer@example.com')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{customer.phone || '+41 79 000 00 00'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 relative z-10">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Total Orders</p>
                <p className="text-slate-900 font-bold">{customer.total_orders}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Total Spent</p>
                <p className="text-amber-600 font-bold">₹{Number(customer.total_spent).toFixed(2)}</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setSelectedCustomer(customer);
                setIsEditing(false);
                setEditForm({ 
                  email: customer.email || (customer.name.toLowerCase().replace(' ', '.') + '@example.com'),
                  phone: customer.phone || '+41 79 000 00 00'
                });
              }}
              className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-amber-500 hover:text-white rounded-xl text-sm font-bold text-slate-600 transition-all border border-slate-100 group-hover:border-amber-500/30"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedCustomer(null)} />
          
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in duration-300">
            
            {/* Close Button - Outside scroll area */}
            <button 
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Modal Header/Cover */}
              <div className="h-32 bg-gradient-to-r from-amber-500 to-amber-600 relative"></div>

              {/* Profile Info Area */}
              <div className="px-6 md:px-8 pb-8">
                <div className="relative -mt-12 mb-6 flex items-end justify-between">
                  <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-lg">
                    <div className="w-full h-full rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-3xl border border-amber-100">
                      {selectedCustomer.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-4 py-2 ${isEditing ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'} rounded-xl text-xs font-bold hover:opacity-90 transition shadow-sm`}
                     >
                      {isEditing ? 'Cancel Edit' : 'Edit Details'}
                     </button>
                     <button 
                      onClick={() => {
                        const email = selectedCustomer.email || (selectedCustomer.name.toLowerCase().replace(' ', '.') + '@example.com');
                        window.location.href = `mailto:${email}`;
                      }}
                      className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
                     >
                      Contact
                     </button>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-bold text-slate-900">{selectedCustomer.name}</h2>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      Joined {new Date(selectedCustomer.last_order).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Active Customer
                    </div>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Edit Profile Information</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Email Address</label>
                          <input 
                            type="email" 
                            value={editForm.email}
                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                            className="w-full mt-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Phone Number</label>
                          <input 
                            type="text" 
                            value={editForm.phone}
                            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                            className="w-full mt-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition shadow-sm"
                          />
                        </div>
                        <button 
                          onClick={() => {
                            alert("Profile updated successfully (Simulator)");
                            setIsEditing(false);
                          }}
                          className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition shadow-lg mt-4"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Contact Details */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Contact Information</h4>
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                          <p className="text-sm font-bold text-slate-900 truncate">{selectedCustomer.email || (selectedCustomer.name.toLowerCase().replace(' ', '.') + '@example.com')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</p>
                          <p className="text-sm font-bold text-slate-900">{selectedCustomer.phone || '+41 79 000 00 00'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Account Stats */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Purchase Analytics</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm">
                          <ShoppingBag className="w-5 h-5 text-amber-600 mb-2" />
                          <p className="text-[10px] font-bold text-amber-600/60 uppercase">Orders</p>
                          <p className="text-xl font-bold text-slate-900">{selectedCustomer.total_orders}</p>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
                          <IndianRupee className="w-5 h-5 text-emerald-600 mb-2" />
                          <p className="text-[10px] font-bold text-emerald-600/60 uppercase">Spent</p>
                          <p className="text-xl font-bold text-slate-900">₹{Number(selectedCustomer.total_spent).toFixed(0)}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                          <IndianRupee className="w-12 h-12" />
                        </div>
                        <p className="text-[10px] font-bold text-white/50 uppercase mb-1 relative z-10">Average Order Value</p>
                        <p className="text-lg font-bold relative z-10">₹{Number(selectedCustomer.total_spent / selectedCustomer.total_orders).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Address Area */}
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Default Shipping Address</h4>
                  <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 flex-shrink-0 border border-slate-100 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      One Love Hair GmbH<br />
                      Uferweg 1, 3400 Burgdorf<br />
                      Switzerland
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
