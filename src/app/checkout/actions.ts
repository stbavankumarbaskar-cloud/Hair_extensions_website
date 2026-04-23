'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createOrder(orderData: {
  customer_name: string;
  product_name: string;
  amount: number;
}) {
  try {
    // Generate a random order number like #10243
    const orderNumber = `#${Math.floor(10000 + Math.random() * 90000)}`;

    const [result]: any = await pool.query(
      'INSERT INTO orders (order_number, customer_name, product_name, amount, status) VALUES (?, ?, ?, ?, ?)',
      [orderNumber, orderData.customer_name, orderData.product_name.substring(0, 255), orderData.amount, 'Pending']
    );

    revalidatePath('/admin/orders');
    revalidatePath('/admin'); // Revalidate dashboard too

    return { success: true, orderId: result.insertId, orderNumber };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Failed to create order' };
  }
}
