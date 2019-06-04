const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;


app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');


app.get('/', (req, res) => res.render('posts-index'));



if (!module.parent) {
    app.listen(port);
}

module.exports = app
