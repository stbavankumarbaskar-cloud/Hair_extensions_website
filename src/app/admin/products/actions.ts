'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function updateProduct(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const oldPrice = formData.get('oldPrice') ? parseFloat(formData.get('oldPrice') as string) : null;
  const category = formData.get('category') as string || 'Bundle';
  const stock = parseInt(formData.get('stock') as string) || 0;
  
  let img = formData.get('img_url') as string; // Existing URL if no new file
  const imageFile = formData.get('image_file') as File;

  if (imageFile && imageFile.size > 0) {
    // Handle File Upload
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    
    await fs.writeFile(filePath, buffer);
    img = `/uploads/${fileName}`;
  }
  
  try {
    await pool.query(
      'UPDATE products SET name = ?, price = ?, old_price = ?, img = ?, category = ?, stock = ? WHERE id = ?',
      [name, price, oldPrice, img, category, stock, id]
    );
    revalidatePath('/admin/products');
    return { success: true };
  } catch (err: any) {
    console.error("Failed to update product:", err);
    return { success: false, error: err.message };
  }
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const oldPrice = formData.get('oldPrice') ? parseFloat(formData.get('oldPrice') as string) : null;
  const category = formData.get('category') as string || 'Bundle';
  const stock = parseInt(formData.get('stock') as string) || 0;
  
  let img = '/placeholder-product.png'; 
  const imageFile = formData.get('image_file') as File;

  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    await fs.writeFile(filePath, buffer);
    img = `/uploads/${fileName}`;
  }
  
  try {
    await pool.query(
      'INSERT INTO products (name, price, old_price, img, category, stock, reviews_count) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, price, oldPrice, img, category, stock, 0]
    );
    revalidatePath('/admin/products');
    return { success: true };
  } catch (err: any) {
    console.error("Failed to create product:", err);
    return { success: false, error: err.message };
  }
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get('id');
  try {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    revalidatePath('/admin/products');
    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete product:", err);
    return { success: false, error: err.message };
  }
}
