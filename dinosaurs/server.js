// server.js

require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql2')

app.get('/', (req, res) => {
  res.send('Hello from your Node/Express server!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get('/dinosaurs', (req, res) => {
    connection.query('SELECT * FROM dinosaur', (err, results) => {
        if (err) {
            res.status(500).send('Error querying database');
            return;
        }
        res.json(results);
    })
})

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySql:', err);
        return;
    }
    console.log('Connected to MySQL database!')
})

