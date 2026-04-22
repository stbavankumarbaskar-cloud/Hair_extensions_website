import React from 'react';
import pool from '@/lib/db';
import ContentManagementClient from './ContentManagementClient';

export default async function AdminContentPage() {
  let settings: any[] = [];
  let banners: any[] = [];
  let faqs: any[] = [];

  try {
    const [settingRows] = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    settings = settingRows as any[];

    const [bannerRows] = await pool.query('SELECT * FROM banners ORDER BY order_index');
    banners = bannerRows as any[];

    const [faqRows] = await pool.query('SELECT * FROM faqs ORDER BY order_index');
    faqs = faqRows as any[];
  } catch (error) {
    console.error("Error fetching content data:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Content Management</h1>
        <p className="text-slate-500 mt-2 text-sm font-medium">Update your website's header, banners, FAQs, and footer details.</p>
      </div>

      <ContentManagementClient 
        initialSettings={settings} 
        initialBanners={banners} 
        initialFAQs={faqs} 
      />
    </div>
  );
}
