'use client';

import React from 'react';

export default function StatusSelector({ defaultValue }: { defaultValue: string }) {
  return (
    <select 
      name="status" 
      defaultValue={defaultValue}
      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase text-slate-500 focus:outline-none focus:border-amber-500/50 transition-all cursor-pointer hover:bg-slate-100"
      onChange={(e) => e.target.form?.requestSubmit()}
    >
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );
}
