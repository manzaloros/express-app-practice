const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { Pool, Client } = require('pg');
const client = new Client();
const pool = new Pool({
  user: 'zacharymansell',
  host: 'localhost',
  database: 'express_test_db',
});

pool.query('select all', (err, res) => {
  console.log("error:", err, 'result:', res);
  pool.end();
});

app.get('/', (req, res) => {
  res.send('Hello from App!');
});

app.post('/customers/:id', (req, res) => {

})

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});