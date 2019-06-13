const router = require('express').Router();
const Post = require('../models/post');




router.get('/', (req, res) => {
    var currentUser = req.user;
    console.log(currentUser)
    Post.find({}).populate('author')
        .then(posts => {
            res.render("posts-index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
});

router.get('/posts/new', (req, res) => {
    var currentUser = req.user;
    // receive and render this path
    res.render('posts-new.hbs', { currentUser });
});

// Creates a post
router.post('/posts/new', (req, res) => {
    if (req.user) {
        var post = new Post(req.body);
        post.author = req.user._id;

        post.save().then(post => {
            return User.findById(req.user._id);
        })
        .then(user => {
            user.posts.unshift(post);
            user.save();
            res.redirect(`/posts/${post._id}`);
        })
        .catch(err => {
            console.log(err.message);
        });
    } else {
        req.status(401);
    }

});

// show a post
router.get('/posts/:id', (req, res) => {
    var currentUser = req.user;
    Post.findById(req.params.id)
        .populate({path:'comments', populate: {path: 'author'}})
        .populate('author')
        .then(post => {
            res.render('posts-show', { post, currentUser });
        })
        .catch(err => {
            console.log('post controller => show method error');
            console.log(err.message);
        });
});

// subreddit
router.get('/n/:subreddit', (req, res) => {
    var currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit }).populate('author')
        .then(posts => {
            res.render('posts-index', { posts, currentUser });
        })
        .catch(err => {
            console.log('post controller => subreddit method error');
            console.log(err.message)
        })
});


module.exports = router;
