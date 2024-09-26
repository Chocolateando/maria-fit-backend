const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: true,
});

pool.on('connect', () => {
  console.log('Conectado a PostgreSQL mediante pool');
});

pool.on('error', (err) => {
  console.error('Error en el pool de conexiones:', err.stack);
});

module.exports = pool;