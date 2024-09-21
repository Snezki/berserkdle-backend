const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const pool = require('./config/db');

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Berserkdle API' })
});

app.get('/api/test-db', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.json({ message: 'Database connected successfully', time: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database connection error' });
    }
  });

module.exports = app;