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
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Manage Reviews</h1>
          <p className="text-gray-400 mt-2 text-sm">Control the testimonials displayed on your homepage.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-amber-900/20 group"
        >
          {showAddForm ? <Trash2 className="w-4 h-4" /> : <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />}
          <span>{showAddForm ? "Cancel" : "Add New Review"}</span>
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm animate-in zoom-in-95 duration-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 text-emerald-400 text-sm animate-in zoom-in-95 duration-300">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {/* Add Review Form */}
      {showAddForm && (
        <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-xl p-8 animate-in slide-in-from-top-4 duration-500">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Quote className="w-5 h-5 text-amber-500" />
            New Testimonial
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Customer Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Nicole"
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Company / Title</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. One Love Hair GmbH"
                  className="w-full bg-[#0f1115] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Review Text</label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                placeholder="What did the customer say?"
                rows={4}
                className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-all resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Rating</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer"
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800 text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                {isSubmitting ? "Saving..." : "Save Review"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="bg-[#16181d] border border-white/5 rounded-2xl shadow-lg p-6 overflow-hidden">
        <h2 className="text-lg font-semibold text-white mb-6">Existing Testimonials</h2>
        
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-amber-500" />
            <p>Loading your reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-white/5 rounded-2xl">
            <Quote className="w-12 h-12 mb-4 opacity-20" />
            <p>No reviews found. Add your first customer feedback!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-[#0f1115] border border-white/5 rounded-2xl p-6 relative group hover:border-amber-500/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-700'}`} />
                    ))}
                  </div>
                  <button 
                    onClick={() => handleDelete(review.id)}
                    className="text-gray-600 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic min-h-[80px]">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/10">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{review.name}</p>
                    <p className="text-[11px] text-amber-500/70 font-medium">{review.company}</p>
                  </div>
                </div>

                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/[0.02] pointer-events-none transition-colors rounded-2xl"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
