import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    await pool.query('DELETE FROM reviews WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: "Review deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
