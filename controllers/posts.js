 // ./controllers/posts.js


const Post = require('../models/post');


module.exports = (app) => {

    // index
    app.get('/', (req, res) => {
        Post.find({}).then(posts => {
            res.render('posts-index.hbs', { posts });
        }).catch( err => {
            console.log(err.message);
        });
    });

    // new
    app.get('/posts/new', (req, res) => {
        res.render('posts-new.hbs', {});
    });

    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);
        console.log(post);
        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            return res.redirect(`/`);
        })
    });

    // show
    app.get("/posts/:id", (req, res) => {
      // LOOK UP THE POST
      Post.findById(req.params.id).populate('comments').then(post => {
          res.render("posts-show.hbs", { post });
        }).catch(err => {
          console.log(err.message);
        });
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit }).then(posts => {
            res.render("posts-index.hbs", { posts });
        }).catch(err => {
            console.log(err.message);
        });
    });
}
