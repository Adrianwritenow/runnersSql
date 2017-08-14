const express = require('express');
const db = require ('./db');

let app = express();

app.get('/', (request, response, next) => {
  db.query('SELECT * FROM runner', [], (err, results) => {
    if (err) {
      return next(err);
    }
    response.send(results.rows[0]);
  });
});

app.listen(3000,() => {
  console.log('Server Farted')
});
