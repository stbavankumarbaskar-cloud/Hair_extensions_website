import pool from './src/lib/db';

async function check() {
  try {
    const [rows] = await pool.query('SELECT * FROM reviews');
    console.log('Reviews in DB:', rows);
    process.exit(0);
  } catch (err) {
    console.error('Error:', (err as any).message);
    process.exit(1);
  }
}

check();
