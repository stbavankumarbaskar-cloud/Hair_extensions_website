'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// Helper to ensure directory exists
async function ensureDirectoryExists(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function updateSiteSettings(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    
    for (const [key, value] of Object.entries(data)) {
      if (key === 'action') continue;
      await pool.query(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, value, value]
      );
    }
    
    revalidatePath('/admin/content');
    revalidatePath('/'); // Revalidate front page
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveBanner(formData: FormData) {
  try {
    const id = formData.get('id') as string | null;
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const link_url = formData.get('link_url') as string;
    const image_file = formData.get('image_file') as File | null;
    let image_url = formData.get('image_url') as string;

    if (image_file && image_file.size > 0) {
      const bytes = await image_file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${image_file.name}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      await fs.writeFile(path.join(uploadDir, filename), buffer);
      image_url = `/uploads/${filename}`;
    }

    if (id) {
      await pool.query(
        'UPDATE banners SET title = ?, subtitle = ?, image_url = ?, link_url = ? WHERE id = ?',
        [title, subtitle, image_url, link_url, id]
      );
    } else {
      await pool.query(
        'INSERT INTO banners (title, subtitle, image_url, link_url) VALUES (?, ?, ?, ?)',
        [title, subtitle, image_url, link_url]
      );
    }

    revalidatePath('/admin/content');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteBanner(id: number) {
  try {
    await pool.query('DELETE FROM banners WHERE id = ?', [id]);
    revalidatePath('/admin/content');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveFAQ(formData: FormData) {
  try {
    const id = formData.get('id') as string | null;
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;

    if (id) {
      await pool.query('UPDATE faqs SET question = ?, answer = ? WHERE id = ?', [question, answer, id]);
    } else {
      await pool.query('INSERT INTO faqs (question, answer) VALUES (?, ?)', [question, answer]);
    }

    revalidatePath('/admin/content');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteFAQ(id: number) {
  try {
    await pool.query('DELETE FROM faqs WHERE id = ?', [id]);
    revalidatePath('/admin/content');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
