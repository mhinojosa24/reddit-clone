const router = require('express').Router();
const Comment = require('../models/comment');
const Post = require('../models/post');


// CREATE Comment
router.post("/posts/:postId/comments", function(req, res) {
    const comment = new Comment(req.body);
    // comment.author = req.user._id;

    comment.save().then(comment => {
        return Post.findById(req.params.postId);
    })
    .then(post => {
        post.comments.unshift(comment);
        return post.save();
    })
    .then(post => {
        res.redirect(`/`);
    })
    .catch(err => {
        console.log('comments controller => create comment mehtod')
        console.log(err);
    });
});


module.exports = router;
