// test/posts.js

const app = require('./../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const Post = require('../models/post');
const server = require('../server');

chai.should;
chai.use(chaiHttp);

describe('Posts', function() {

    const agent = chai.request.agent(server);


    const newPost = {
        title: 'post title',
        url: 'www.google.com',
        summary: 'post summary'
    };

    it('Should create with valid attributes at POST /posts/new', function(done) {
        Post.estimatedDocumentCount().then(function (initialDocCount) {
            chai.request(app).post("/posts/new").set("content-type", "application/x-www-form-urlencoded").send(newPost).then(function (res) {
                Post.estimatedDocumentCount().then(function (newDocCount) {
                    expect(res).to.have.status(200);
                    expect(newDocCount).to.be.equal(initialDocCount + 1)
                    done()
                }).catch(function (err) {
                    done(err);
                });
            }).catch(function (err) {
                done(err);
            });
        }).catch(function (err) {
        });
        done();
    });


    after(function() {
        Post.findOneAndDelete(newPost);
    });


});
