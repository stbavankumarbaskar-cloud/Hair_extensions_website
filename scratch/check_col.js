const mysql = require('mysql2/promise');

async function checkCategoryColumn() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Bavankumar@123',
    database: 'lovehair_db'
  });

  try {
    const [rows] = await connection.query('DESCRIBE products');
    const col = rows.find(r => r.Field === 'category');
    console.log(JSON.stringify(col, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

checkCategoryColumn();
