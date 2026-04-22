 const mysql = require('mysql2/promise');

async function seedCategories() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Bavankumar@123',
    database: 'lovehair_db'
  });

  const categories = [
    // Type
    { group: 'Type', items: ['Clip-In Hair Extensions', 'Tape-In Hair Extensions', 'Sew-In / Weft Extensions', 'Fusion / Keratin Bond Extensions', 'Micro Link / I-Tip Extensions', 'Halo Hair Extensions', 'Ponytail Extensions', 'Bangs / Fringe Extensions', 'Wigs & Hairpieces'] },
    // Hair Type
    { group: 'Hair Type', items: ['Human Hair Extensions', 'Remy Hair Extensions', 'Virgin Hair Extensions', 'Synthetic Hair Extensions', 'Blended Hair Extensions'] },
    // Texture
    { group: 'Texture', items: ['Straight', 'Body Wave', 'Deep Wave', 'Curly', 'Kinky Curly', 'Afro / Coily'] },
    // Length
    { group: 'Length', items: ['Short (8–12 inches)', 'Medium (14–18 inches)', 'Long (20–24 inches)', 'Extra Long (26+ inches)'] },
    // Color
    { group: 'Color', items: ['Natural Black', 'Brown Shades', 'Blonde Shades', 'Ombre', 'Balayage', 'Highlighted', 'Fashion Colors', 'Gray / Silver'] },
    // Volume / Weight
    { group: 'Volume / Weight', items: ['Light Volume', 'Medium Volume', 'Full Volume', 'Extra Thick Bundles'] }
  ];

  try {
    // Clear existing
    await connection.query('DELETE FROM categories');
    
    // Insert new
    for (const group of categories) {
      for (const item of group.items) {
        await connection.query(
          'INSERT INTO categories (name, group_name, description) VALUES (?, ?, ?)',
          [item, group.group, `Luxury hair category for ${item}`]
        );
      }
    }
    
    console.log('Seeded all categories successfully');
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

seedCategories();
