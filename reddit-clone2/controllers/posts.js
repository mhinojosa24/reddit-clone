const router = require('express').Router();
const Post = require('../models/post');



router.get('/', (req, res) => res.render('posts-index'));

router.get('/posts/new', (req, res) => {
    // receive and render this path
    res.render('posts-new.hbs');
})

// Creates a post
router.post('/posts/new', (req, res) => {
    const post = new Post(req.body);

    post.save((err, post) => {
        console.log(req.body);
        return res.redirect(`/`);
    });
});











module.exports = router;
