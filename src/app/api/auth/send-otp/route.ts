import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import pool from '@/lib/db';
import mysql from 'mysql2/promise';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    // 1. Ensure Database and Table exist
    try {
      // Create a temporary connection without a database to ensure it exists
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'lovehair_db'}\``);
      await connection.query(`USE \`${process.env.DB_NAME || 'lovehair_db'}\``);
      
      await connection.query(`
        CREATE TABLE IF NOT EXISTS otps (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          code VARCHAR(6) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      await connection.end();
    } catch (dbSetupError: any) {
      console.error("DB Setup Error:", dbSetupError);
      return NextResponse.json({ 
        success: false, 
        error: `Database connection failed: ${dbSetupError.message}. Please check if MySQL is running.` 
      }, { status: 500 });
    }

    // 2. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Save to DB using the main pool
    await pool.query('DELETE FROM otps WHERE email = ?', [email]);
    await pool.query('INSERT INTO otps (email, code) VALUES (?, ?)', [email, otp]);

    // 4. Setup Nodemailer (Remove spaces from App Password)
    const rawPass = process.env.EMAIL_PASS || '';
    const cleanPass = rawPass.replace(/\s+/g, ''); // Remove any spaces

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: cleanPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // 5. Send Email
    try {
      await transporter.sendMail({
        from: '"One Love Hair" <no-reply@onelovehair.com>',
        to: email,
        subject: `Sign in to Shop - ${otp} is your verification code`,
        html: `
          <div style="font-family: sans-serif; max-width: 400px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
            <h2 style="color: #333; text-align: center;">Sign in to Shop</h2>
            <p style="color: #666; text-align: center;">Enter the following code to continue to <b>One Love Hair GmbH</b></p>
            <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 36px; font-weight: bold; letter-spacing: 8px; border-radius: 15px; color: #5a31f4; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
              This code will expire soon. If you didn't request this, please ignore this email.
            </p>
          </div>
        `,
      });
    } catch (mailError: any) {
      console.error("Mail Error:", mailError);
      return NextResponse.json({ 
        success: false, 
        error: `Email failed: ${mailError.message}. Check your Gmail App Password.` 
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("General API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
