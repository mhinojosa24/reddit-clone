 // ./controllers/posts.js


const Post = require('../models/post');


module.exports = (app) => {

    // index
    app.get('/', (req, res) => {
        var currentUser = req.user;
        console.log(req.cookies);
        Post.find({}).populate('author').then(posts => {
            res.render('posts-index.hbs', { posts, currentUser });
        }).catch( err => {
            console.log(err.message);
        });
    });

    // new
    app.get('/posts/new', (req, res) => {
        res.render('posts-new.hbs', { });
    });

    // create
    app.post('/posts/new', (req, res) => {
        if (req.user) {
            var post = new Post(req.body);

            post.save(function(err, post) {
                return res.redirect(`/`);
            });
        } else {
            return res.status(401); // unauthorized
        }
        // // INSTANTIATE INSTANCE OF POST MODEL
        // const post = new Post(req.body);
        // console.log(post);
        // // SAVE INSTANCE OF POST MODEL TO DB
        // post.save((err, post) => {
        //     return res.redirect(`/`);
        // })
    });

    // show
    app.get("/posts/:id", (req, res) => {
        // var currentUser = req.user;
      // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').then(post => {
            res.render("posts-show.hbs", { post });
        }).catch(err => {
            console.log(err.message);
        });
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        // var currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).then(posts => {
            res.render("posts-index.hbs", { posts });
        }).catch(err => {
            console.log(err.message);
        });
    });
}
