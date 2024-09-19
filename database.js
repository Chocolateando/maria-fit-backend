const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: true,
});

module.exports = async () => {
  try {
    await client.connect();
    console.log('Conectado a PostgreSQL');
  } catch (err) {
    console.error('Error de conexión:', err.stack);
  }
}