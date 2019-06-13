const router = require('express').Router();
const Post = require('../models/post');



router.get('/', (req, res) => {
    Post.find({})
        .then(posts => {
            res.render("posts-index", { posts });
        })
        .catch(err => {
            console.log(err.message);
        });
});

router.get('/posts/new', (req, res) => {
    // receive and render this path
    res.render('posts-new.hbs');
});

// Creates a post
router.post('/posts/new', (req, res) => {
    const post = new Post(req.body);

    post.save().then(post => {
        return res.redirect(`/`);
    }).catch(err => {
        console.log(err.message);
    })

});

router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            res.render('posts-show', { post });
        })
        .catch(err => {
            console.log(err.message);
        });
});

// subreddit
router.get('/n/:subreddit', (req, res) => {
    Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
            res.render('posts-index.hbs', { posts });
        })
        .catch(err => {
            console.log(err.message)
        })
});

module.exports = router;
