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
  
  let currentImagesStr = formData.get('img_url') as string || '[]';
  let images: string[] = [];
  
  try {
    images = JSON.parse(currentImagesStr);
    if (!Array.isArray(images)) images = [currentImagesStr];
  } catch (e) {
    images = currentImagesStr ? [currentImagesStr] : [];
  }

  const imageFiles = formData.getAll('image_file') as File[];

  if (imageFiles.length > 0 && imageFiles[0].size > 0) {
    const newImages: string[] = [];
    for (const file of imageFiles) {
      if (file.size === 0) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      newImages.push(`/uploads/${fileName}`);
    }
    // Append new images to the existing ones (which have been filtered by the UI already)
    images = [...images, ...newImages];
  }
  
  const imgValue = JSON.stringify(images);
  
  try {
    await pool.query(
      'UPDATE products SET name = ?, price = ?, old_price = ?, img = ?, category = ?, stock = ? WHERE id = ?',
      [name, price, oldPrice, imgValue, category, stock, id]
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
  
  const imageFiles = formData.getAll('image_file') as File[];
  const images: string[] = [];

  for (const file of imageFiles) {
    if (file.size === 0) continue;
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    images.push(`/uploads/${fileName}`);
  }

  const imgValue = images.length > 0 ? JSON.stringify(images) : JSON.stringify(['/placeholder-product.png']);
  
  try {
    await pool.query(
      'INSERT INTO products (name, price, old_price, img, category, stock, reviews_count) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, price, oldPrice, imgValue, category, stock, 0]
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
