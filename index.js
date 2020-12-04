const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pg = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'zacharymansell',
    database: 'express_test_db',
  }
});

app.get('/customers', (req, res) => {
  pg('customers').select().from('customers')
    .then((results) => {
      console.log('results from pg:', results)
      res.send(results);
    });
});

app.post('/customers', (req, res) => {
  pg('customers').insert(req.body)
    .then(results => {
      console.log('results from insert: ', results);
    })
    .catch(err => {
      console.error('Caught err:', err);
      res.status(500);
    })
    .finally(() => {
      res.end();
    })
});

app.put('/customers/:id', (req, res) => {
  pg('customers')
    .where('id', '=', req.params.id)
    .update({ name: req.body.name })
    .then((results) => {
      console.log('results of update: ', results);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    })
    .finally(() => {
      res.end();
    })
});

app.delete('/customers/:id', (req, res) => {
  pg('customers')
    .where('id', '=', req.params.id)
    .del()
    .then((results) => {
      console.log('results of update: ', results);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    })
    .finally(() => {
      res.end();
    })
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});