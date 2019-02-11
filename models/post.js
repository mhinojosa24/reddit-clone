const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true }
});

PostSchema.pre("save", (next) => {
    // SET createdAt  and updatedAt
    const now = new Date();
    this.updatedAt = now;

    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model("Post", PostSchema);
