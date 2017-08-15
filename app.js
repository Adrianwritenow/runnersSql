const express = require('express');
const db = require ('./db');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
// Connect templating engine to app instance
app.engine('mustache', mustacheExpress());
// Connect views folder to views name in app instance
app.set('views', './views');
// Connect view engine to mustache
app.set('view engine', 'mustache');



app.get('/', (request, response, next) => {
  db.query('SELECT * FROM runner', [], (err, results) => {
    if (err) {
      return next(err);
    }
    response.render('runners', {runners: results.rows});
  });
});

app.get('/newRunner', function(request, response) {
  response.render('newRunner');
});

app.post('/newRunner', (request, response, next) => {
  db.query('INSERT INTO runner (name,sponsor,division) VALUES($1, $2, $3)',[request.body.name, request.body.sponsor, request.body.division], (err, results) => {
    if( err){
      return next(err);
    }
  response.redirect('/');
  });
});


app.get('/:bib_id', function (request, response, next) {
  console.log(request.params.bib_id);
  const runnerId = parseInt(request.params.bib_id) -  1;
  db.query('SELECT * FROM runner',[], (err,results)=>{
    if (err){
      return next(err);
    }
    response.render('runners', { runners: results.rows[runnerId]});
  });
});


app.listen(3000,() => {
  console.log('Server Farted')
});
