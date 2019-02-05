 // ./controllers/posts.js


const Post = require('../models/post');


module.exports = (app) => {

    // index
    app.get('/', (req, res) => {
        Post.find({}).then(posts => {
            res.render('posts-index', { posts });
        }).catch( err => {
            console.log(err.message);
        });
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
