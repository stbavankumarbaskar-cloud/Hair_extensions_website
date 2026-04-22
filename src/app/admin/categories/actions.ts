'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const group_name = formData.get('group_name') as string || 'General';
  const description = formData.get('description') as string;
  
  try {
    await pool.query(
      'INSERT INTO categories (name, group_name, description) VALUES (?, ?, ?)',
      [name, group_name, description]
    );
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (err: any) {
    console.error("Failed to create category:", err);
    return { success: false, error: err.message };
  }
}

export async function updateCategory(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const group_name = formData.get('group_name') as string || 'General';
  const description = formData.get('description') as string;
  
  try {
    await pool.query(
      'UPDATE categories SET name = ?, group_name = ?, description = ? WHERE id = ?',
      [name, group_name, description, id]
    );
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (err: any) {
    console.error("Failed to update category:", err);
    return { success: false, error: err.message };
  }
}

export async function deleteCategory(id: number) {
  try {
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete category:", err);
    return { success: false, error: err.message };
  }
}
