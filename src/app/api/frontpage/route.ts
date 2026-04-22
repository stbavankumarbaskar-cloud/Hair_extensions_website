import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Attempt parallel queries
    const [productsResult, reviewsResult, settingsResult, bannersResult, faqsResult] = await Promise.all([
      pool.query('SELECT * FROM products ORDER BY id ASC'),
      pool.query('SELECT * FROM reviews ORDER BY id ASC'),
      pool.query('SELECT setting_key, setting_value FROM site_settings'),
      pool.query('SELECT * FROM banners WHERE status = "active" ORDER BY order_index'),
      pool.query('SELECT * FROM faqs ORDER BY order_index')
    ]);

    const products = productsResult[0];
    const reviews = reviewsResult[0];
    const settings = (settingsResult[0] as any[]).reduce((acc, curr) => {
      acc[curr.setting_key] = curr.setting_value;
      return acc;
    }, {});
    const banners = bannersResult[0];
    const faqs = faqsResult[0];

    return NextResponse.json({
      success: true,
      products,
      reviews,
      settings,
      banners,
      faqs
    });

  } catch (error: any) {
    // If DB fails, send an error response so the client can fallback
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
