"use client";
import React, { useState, useEffect } from 'react';
import { Star, Trash2, Plus, AlertCircle, CheckCircle2, Loader2, User, Building2, Quote } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    text: '',
    rating: 5
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Review added successfully!");
        setFormData({ name: '', company: '', text: '', rating: 5 });
        setShowAddForm(false);
        fetchReviews();
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setReviews(reviews.filter(r => r.id !== id));
        setSuccess("Review deleted successfully");
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Manage Reviews</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Control the testimonials displayed on your homepage.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/20 group"
        >
          {showAddForm ? <Trash2 className="w-4 h-4" /> : <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />}
          <span>{showAddForm ? "Cancel" : "Add New Review"}</span>
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-600 text-sm animate-in zoom-in-95 duration-300 font-medium">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3 text-emerald-600 text-sm animate-in zoom-in-95 duration-300 font-medium">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {/* Add Review Form */}
      {showAddForm && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 animate-in slide-in-from-top-4 duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
            <Quote className="w-5 h-5 text-amber-600" />
            New Testimonial
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Customer Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Nicole"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Company / Title</label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. One Love Hair GmbH"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Review Text</label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                placeholder="What did the customer say?"
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Rating</label>
              <div className="relative group">
                <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer font-bold"
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>{num} Stars</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white px-10 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                {isSubmitting ? "Saving..." : "Save Review"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 overflow-hidden">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Existing Testimonials</h2>
        <p className="text-xs text-slate-400 font-medium mb-8">Manage what your customers are saying about you.</p>
        
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-amber-600" />
            <p className="font-medium">Loading your reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
            <Quote className="w-12 h-12 mb-4 opacity-10" />
            <p className="font-bold">No reviews found. Add your first customer feedback!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative group hover:border-amber-500/30 transition-all duration-300 hover:shadow-md hover:bg-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <button 
                    onClick={() => handleDelete(review.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors p-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic min-h-[80px] font-medium">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{review.name}</p>
                    <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">{review.company}</p>
                  </div>
                </div>

                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-amber-500/[0.01] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity rounded-2xl"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
