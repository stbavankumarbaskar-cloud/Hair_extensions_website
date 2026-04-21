import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export const dynamic = 'force-dynamic';

// GET all reviews
export async function GET() {
  try {
    // Ensure table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        text TEXT NOT NULL,
        rating INT NOT NULL DEFAULT 5,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [rows] = await pool.query('SELECT * FROM reviews ORDER BY id DESC');
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
    console.log("POST Review Request Body:", body);
    const { name, company, text, rating } = body;

    if (!name || !text || !rating) {
      return NextResponse.json({ success: false, error: "Missing required fields (Name, Text, and Rating are required)" }, { status: 400 });
    }

    // Ensure table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        text TEXT NOT NULL,
        rating INT NOT NULL DEFAULT 5,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [result] = await pool.query(
      'INSERT INTO reviews (name, company, text, rating) VALUES (?, ?, ?, ?)',
      [name, company || '', text, rating]
    );
    
    console.log("Insert Success:", result);

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
