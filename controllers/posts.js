 // ./controllers/posts.js


const Post = require('../models/post');


module.exports = (app) => {

    // index
    app.get('/', (req, res) => {
        res.render('home', { msg: 'Handlebars are Cool!'})
    });

    // new
    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    });

    //Create
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);
        console.log(post);
        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            return res.redirect(`/`);
        })
    });
}
