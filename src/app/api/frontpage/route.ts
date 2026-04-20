import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    // Attempt parallel queries
    const [productsResult, reviewsResult] = await Promise.all([
      pool.query('SELECT * FROM products ORDER BY id ASC'),
      pool.query('SELECT * FROM reviews ORDER BY id ASC')
    ]);

    const products = productsResult[0];
    const reviews = reviewsResult[0];

    return NextResponse.json({
      success: true,
      products,
      reviews
    });

  } catch (error: any) {
    // If DB fails, send an error response so the client can fallback
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
