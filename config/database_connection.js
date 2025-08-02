const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST ,     // e.g., 'localhost'
  user: process.env.DB_USER,     // e.g., 'root'
  password: process.env.DB_PASSWORD || '', // your password
  database: process.env.DB_NAME, // your database name
  port: process.env.DB_PORT || 3306,
});

module.exports = pool.promise();