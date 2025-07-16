// server.js

require('dotenv').config()
const express = require('express');
const app = express();
const {Pool} = require('pg')
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/', (req, res) => {
  res.send('Hello from Postgres + your Node/Express server!');
});

app.get('/dinosaurs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dinosaur');
        res.json(result.rows);
    } catch (err) {
        console.error('DB Error: ', err);
        res.status(500).send('Error querying database');
    }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
