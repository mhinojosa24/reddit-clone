const express = require('express');
const exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv').config();
// Set db
const db = require('./data/reddit-db');

app.use(cookieParser());
//use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//add after body parser initialization!
app.use(expressValidator());

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');


const posts = require('./controllers/posts')(app);
const comments = require('./controllers/comments.js')(app);
const auth = require('./controllers/auth.js')(app);




if (!module.parent) {
    app.listen(port);
}

module.exports = app
