import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ success: false, error: "Email and code are required" }, { status: 400 });
    }

    // 1. Check if OTP is valid
    const [rows]: any = await pool.query(
      'SELECT * FROM otps WHERE email = ? AND code = ?',
      [email, code]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid or expired verification code" }, { status: 400 });
    }

    // 2. OTP is valid, delete it
    await pool.query('DELETE FROM otps WHERE email = ?', [email]);

    // 3. Ensure customers table exists and save user
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS customers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          total_orders INT DEFAULT 0,
          total_spent DECIMAL(10, 2) DEFAULT 0.00,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const [existingUser]: any = await pool.query('SELECT id FROM customers WHERE email = ?', [email]);

      if (existingUser.length === 0) {
        const tempName = email.split('@')[0];
        await pool.query(
          'INSERT INTO customers (name, email, total_orders, total_spent) VALUES (?, ?, 0, 0.00)',
          [tempName, email]
        );
        console.log(`✅ Success: New user saved: ${email}`);
      }
    } catch (dbError: any) {
      console.error("❌ Database Customer Save Error:", dbError.message);
      // Even if saving to customers fails, we can still let them log in
    }

    return NextResponse.json({ success: true, message: "Verified" });

  } catch (error: any) {
    console.error("❌ Critical Verification Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
