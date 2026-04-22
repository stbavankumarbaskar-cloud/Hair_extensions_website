'use client';

import React, { useState } from 'react';
import { Save, Plus, Trash2, Layout as LayoutIcon, Image as ImageIcon, MessageSquare, List, X, ExternalLink } from 'lucide-react';
import { updateSiteSettings, saveBanner, deleteBanner, saveFAQ, deleteFAQ } from '@/app/admin/actions/content';

interface Setting {
  setting_key: string;
  setting_value: string;
}

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface ContentProps {
  initialSettings: Setting[];
  initialBanners: Banner[];
  initialFAQs: FAQ[];
}

export default function ContentManagementClient({ initialSettings, initialBanners, initialFAQs }: ContentProps) {
  const [activeTab, setActiveTab] = useState<'header' | 'banner' | 'faq' | 'footer'>('header');
  const [banners, setBanners] = useState(initialBanners);
  const [faqs, setFaqs] = useState(initialFAQs);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const getSetting = (key: string) => initialSettings.find(s => s.setting_key === key)?.setting_value || '';

  const handleSettingsUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await updateSiteSettings(formData);
    if (result.success) alert("Settings updated successfully!");
    else alert("Error: " + result.error);
  };

  const handleBannerSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await saveBanner(formData);
    if (result.success) window.location.reload();
    else alert("Error: " + result.error);
  };

  const handleFAQSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await saveFAQ(formData);
    if (result.success) window.location.reload();
    else alert("Error: " + result.error);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl w-fit">
        {[
          { id: 'header', icon: LayoutIcon, label: 'Header' },
          { id: 'banner', icon: ImageIcon, label: 'Hero Banners' },
          { id: 'faq', icon: MessageSquare, label: 'FAQs' },
          { id: 'footer', icon: List, label: 'Footer' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        {/* Header Section */}
        {activeTab === 'header' && (
          <form onSubmit={handleSettingsUpdate} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Site Name</label>
                <input name="site_name" defaultValue={getSetting('site_name')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none bg-slate-50 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Contact Number</label>
                <input name="contact_number" defaultValue={getSetting('contact_number')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none bg-slate-50 transition-all" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Header Promo Text</label>
                <input name="promo_text" defaultValue={getSetting('promo_text')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none bg-slate-50 transition-all" />
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-black px-10 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 text-xs uppercase tracking-widest">
                <Save className="w-4 h-4" />
                Save Header Settings
              </button>
            </div>
          </form>
        )}

        {/* Footer Section */}
        {activeTab === 'footer' && (
          <form onSubmit={handleSettingsUpdate} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">About Section Text</label>
                <textarea name="about_text" defaultValue={getSetting('about_text')} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none bg-slate-50 transition-all resize-none" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Official Address</label>
                <input name="address" defaultValue={getSetting('address')} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none bg-slate-50 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Facebook Link</label>
                <input name="facebook_link" defaultValue={getSetting('facebook_link')} placeholder="https://" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none bg-slate-50 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Instagram Link</label>
                <input name="instagram_link" defaultValue={getSetting('instagram_link')} placeholder="https://" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none bg-slate-50 transition-all" />
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-black px-10 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 text-xs uppercase tracking-widest">
                <Save className="w-4 h-4" />
                Save Footer Settings
              </button>
            </div>
          </form>
        )}

        {/* Banners Section */}
        {activeTab === 'banner' && (
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Homepage Banners</h3>
                <p className="text-sm text-slate-500 font-medium">Manage the slider images and text on your homepage.</p>
              </div>
              <button onClick={() => {setEditingBanner({id: 0, title: '', subtitle: '', image_url: '', link_url: ''}); setImagePreview(null);}} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Banner
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map(banner => (
                <div key={banner.id} className="group relative bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-slate-900 line-clamp-1">{banner.title || 'Untitled'}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{banner.subtitle}</p>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200/50">
                      <button onClick={() => {setEditingBanner(banner); setImagePreview(banner.image_url);}} className="p-2 text-slate-400 hover:text-amber-600 transition-colors"><LayoutIcon className="w-4 h-4" /></button>
                      <button onClick={async () => { if(confirm('Delete banner?')) { await deleteBanner(banner.id); window.location.reload(); } }} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs Section */}
        {activeTab === 'faq' && (
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Frequently Asked Questions</h3>
                <p className="text-sm text-slate-500 font-medium">Add or edit questions that appear on your support page.</p>
              </div>
              <button onClick={() => setEditingFAQ({id: 0, question: '', answer: ''})} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map(faq => (
                <div key={faq.id} className="flex justify-between items-start gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-white hover:border-amber-500/30 transition-all underline-offset-4 decoration-slate-200">
                  <div className="flex-1 space-y-2">
                    <h4 className="font-bold text-slate-900 flex items-start gap-3">
                      <span className="text-amber-500 font-black">Q:</span>
                      {faq.question}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed pl-8">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingFAQ(faq)} className="p-2 text-slate-400 hover:text-amber-600 transition-colors"><LayoutIcon className="w-4 h-4" /></button>
                    <button onClick={async () => { if(confirm('Delete FAQ?')) { await deleteFAQ(faq.id); window.location.reload(); } }} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Banner Edit Modal */}
      {editingBanner && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditingBanner(null)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <form onSubmit={handleBannerSave} className="p-8 space-y-6">
              <input type="hidden" name="id" value={editingBanner.id || ''} />
              <input type="hidden" name="image_url" value={editingBanner.image_url} />
              
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-serif font-bold text-slate-900">{editingBanner.id ? 'Edit' : 'Add'} Banner</h3>
                <button type="button" onClick={() => setEditingBanner(null)}><X className="w-6 h-6 text-slate-400" /></button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Main Title</label>
                  <input name="title" defaultValue={editingBanner.title} required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subtitle / Offer</label>
                  <input name="subtitle" defaultValue={editingBanner.subtitle} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Button Link URL</label>
                  <input name="link_url" defaultValue={editingBanner.link_url} placeholder="/shop" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Banner Image</label>
                  <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                     <div className="w-24 h-16 rounded-lg bg-white border border-slate-100 overflow-hidden shadow-inner">
                        {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <ImageIcon className="w-full h-full p-4 text-slate-200" />}
                     </div>
                     <input type="file" name="image_file" accept="image/*" onChange={(e) => {
                       const file = e.target.files?.[0];
                       if(file) setImagePreview(URL.createObjectURL(file));
                     }} 
                     className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button type="button" onClick={() => setEditingBanner(null)} className="px-6 py-2.5 text-slate-500 font-bold uppercase tracking-widest text-xs">Cancel</button>
                <button type="submit" className="bg-amber-500 text-white font-black px-8 py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20">Save Banner</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ Edit Modal */}
      {editingFAQ && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditingFAQ(null)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <form onSubmit={handleFAQSave} className="p-8 space-y-6">
              <input type="hidden" name="id" value={editingFAQ.id || ''} />
              
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-serif font-bold text-slate-900">{editingFAQ.id ? 'Edit' : 'Add'} FAQ</h3>
                <button type="button" onClick={() => setEditingFAQ(null)}><X className="w-6 h-6 text-slate-400" /></button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Question</label>
                  <input name="question" defaultValue={editingFAQ.question} required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Answer</label>
                  <textarea name="answer" defaultValue={editingFAQ.answer} required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none resize-none" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button type="button" onClick={() => setEditingFAQ(null)} className="px-6 py-2.5 text-slate-500 font-bold uppercase tracking-widest text-xs">Cancel</button>
                <button type="submit" className="bg-amber-500 text-white font-black px-8 py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20">Save FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
