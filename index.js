const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const functions = require('./functions');
const routes = require('./routes');
const morgan = require('morgan');
const app = express();

app.use(session({
  secret: 'something',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(routes);

app.listen(3000, function(){
  console.log('Connected so good!')
})
