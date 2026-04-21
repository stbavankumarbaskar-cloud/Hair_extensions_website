import React from 'react';
import { Star, MessageSquare, Trash2, CheckCircle, XCircle } from 'lucide-react';
import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function AdminReviewsPage() {
  let reviews: any[] = [];
  let dbError = "";

  try {
    const [rows] = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    reviews = rows as any[];
  } catch (err: any) {
    dbError = err.message;
  }

  // Server Action to delete review
  async function deleteReview(formData: FormData) {
    'use server';
    const id = formData.get('id');
    try {
      await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
      revalidatePath('/admin/reviews');
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div>
        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Customer Reviews</h1>
        <p className="text-gray-400 mt-2 text-sm">Monitor and manage product reviews and testimonials.</p>
      </div>

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          Database Error: {dbError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {reviews.length === 0 ? (
          <div className="py-20 text-center text-gray-500 bg-[#16181d] border border-white/5 rounded-2xl">
            No reviews found.
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-[#16181d] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-amber-500/20 transition-all">
              
              <div className="flex-shrink-0 flex flex-col items-center justify-center bg-[#0f1115] rounded-xl p-4 min-w-[120px]">
                <div className="flex text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-700'}`} />
                  ))}
                </div>
                <span className="text-2xl font-bold text-white">{review.rating}.0</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Rating</span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-white font-bold">{review.name}</h3>
                    <p className="text-xs text-amber-500/70">{review.company}</p>
                  </div>
                  <span className="text-[10px] text-gray-600">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-400 text-sm italic leading-relaxed">"{review.text}"</p>
              </div>

              <div className="flex flex-row md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all">
                  <CheckCircle className="w-3 h-3" />
                  <span>Approve</span>
                </button>
                <form action={deleteReview}>
                  <input type="hidden" name="id" value={review.id} />
                  <button type="submit" className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all">
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    
    </div>
  );
}
