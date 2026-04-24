import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export const dynamic = 'force-dynamic';

// GET reviews for a specific product
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    // Ensure table and column exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT DEFAULT 0,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        text TEXT NOT NULL,
        rating INT NOT NULL DEFAULT 5,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migration: Add product_id if it doesn't exist (handle existing tables)
    try {
      await pool.query('ALTER TABLE reviews ADD COLUMN IF NOT EXISTS product_id INT DEFAULT 0');
    } catch (e) {
      // Ignore if column already exists or IF NOT EXISTS isn't supported by this MariaDB version
      // In some versions we use:
      try {
        await pool.query("SELECT product_id FROM reviews LIMIT 1");
      } catch (checkErr) {
        await pool.query("ALTER TABLE reviews ADD COLUMN product_id INT DEFAULT 0 AFTER id");
      }
    }

    let query = `
      SELECT r.*, p.name as product_name 
      FROM reviews r
      LEFT JOIN products p ON r.product_id = p.id
    `;
    let params: any[] = [];

    if (productId) {
      query += ' WHERE r.product_id = ?';
      params.push(productId);
    }

    query += ' ORDER BY r.id DESC';

    const [rows] = await pool.query(query, params);
    return NextResponse.json({ success: true, reviews: rows });
  } catch (error: any) {
    console.error("GET Reviews Error:", error);
    return NextResponse.json({ success: false, error: "Database Error: " + error.message }, { status: 500 });
  }
}

// POST new review
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, text, rating, product_id } = body;

    if (!name || !text || !rating) {
      return NextResponse.json({ success: false, error: "Missing required fields (Name, Text, and Rating are required)" }, { status: 400 });
    }

    // Ensure table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT DEFAULT 0,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        text TEXT NOT NULL,
        rating INT NOT NULL DEFAULT 5,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migration check for POST too
    try {
      await pool.query("SELECT product_id FROM reviews LIMIT 1");
    } catch (checkErr) {
      await pool.query("ALTER TABLE reviews ADD COLUMN product_id INT DEFAULT 0 AFTER id");
    }

    const [result] = await pool.query(
      'INSERT INTO reviews (product_id, name, company, text, rating) VALUES (?, ?, ?, ?, ?)',
      [product_id || 0, name, company || '', text, rating]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: "Review added successfully", 
      id: (result as any).insertId 
    });
  } catch (error: any) {
    console.error("POST Review Error:", error);
    return NextResponse.json({ success: false, error: "Failed to save: " + error.message }, { status: 500 });
  }
}
