const express = require('express');
const exphbs = require('express-handlebars');
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// Set db
const db = require('./data/reddit-db');

//use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//add after body parser initialization!
app.use(expressValidator());


app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');


const controllers = require('./controllers/post')(app);



if (!module.parent) {
    app.listen(port);
}

module.exports = app
