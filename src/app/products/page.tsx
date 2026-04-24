import React, { Suspense } from 'react';
import pool from '@/lib/db';
import ProductsListClient from '@/app/products/ProductsListClient';

export default async function ProductsPage() {
  let products: any[] = [];
  
  try {
    const [rows]: any = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    products = rows;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Fallback to empty list or handled in client
  }

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading products...</div>}>
        <ProductsListClient initialProducts={products} />
      </Suspense>
    </div>
  );
}
