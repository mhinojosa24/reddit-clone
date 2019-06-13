const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const db = require('./data/reddit-db');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');




const post = require('./controllers/posts');
const comment = require('./controllers/comments');
const auth = require('./controllers/auth.js');
app.use(post);
app.use(comment);
app.use(auth);
app.use(cookieParser());



app.listen(port);
module.exports = app;
