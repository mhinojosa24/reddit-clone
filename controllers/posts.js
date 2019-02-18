 // ./controllers/posts.js

const User = require('../models/user');
const Post = require('../models/post');


module.exports = (app) => {

    // index
    app.get('/', (req, res) => {
        var currentUser = req.user;
        console.log(req.cookies);
        Post.find().populate('author').then(posts => {
            res.render('posts-index.hbs', { posts, currentUser });
        }).catch( err => {
            console.log(err.message);
        });
    });

    // new
    app.get('/posts/new', (req, res) => {
        var currentUser = req.user;
        res.render('posts-new.hbs', { currentUser });
    });

    // create
    app.post('/posts/new', (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
            post.author = req.user._id;
            post.upVotes = [];
            post.downVotes = [];
            post.voteScore = 0;

            post.save().then(post => {
                return User.findById(req.user._id);

            }).then(user => {
                user.posts.unshift(post);
                user.save();
                // REDIRECT TO THE NEW Post
                res.redirect(`/posts/${post._id}`);

            }).catch(err => {
                console.log(err.message);
            });
        } else {
            return res.status(401); // unauthorized
        }
    });

    // show
    app.get("/posts/:id", (req, res) => {
        var currentUser = req.user;
        // LOOK UP THE POST

        Post.findById(req.params.id).populate({path:'comments', populate: {path: 'author'}}).populate('author')
       .then(post => {
           res.render("posts-show", { post, currentUser });
       })
       .catch(err => {
           console.log(err.message);
       });
    });
    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        var currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).populate('author').then(posts => {
            res.render("posts-index.hbs", { posts, currentUser });
        }).catch(err => {
            console.log(err.message);
        });
    });


    //ToDo make route /profile to deisplay users posts and comments
    // app.get("/users/:username", function(req, res) {
    //     Post.findById()
    // });


    app.put("/posts/:id/vote-up", function(req, res) {
        Post.findById(req.params.id).exec(function(err, post) {
            post.upVotes.push(req.user._id);
            post.voteScore = post.voteScore + 1;
            post.save();

            res.status(200);
        });
    });

    app.put("/posts/:id/vote-down", function(req, res) {
        Post.findById(req.params.id).exec(function(err, post) {
            post.downVotes.push(req.user._id);
            post.voteScore = post.voteScore - 1;
            post.save();

            res.status(200);
        });
    });
}
