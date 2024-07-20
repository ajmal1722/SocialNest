import mongoose from 'mongoose';

const { Schema } = mongoose;

// Comment Schema
const commentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to User model
    },
    author_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to User model
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const options = {
    discriminatorKey: 'content_type',
    timestamps: true,
};

// Base Post Schema
const postSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to User model
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
    }],
    comments: [commentSchema], // Embedded comments schema
}, options);

// Base Post Model
const Post = mongoose.model('Post', postSchema);

// Image Post Schema
const ImagePost = Post.discriminator('Image', new Schema({
    image_url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
    },
}));

// Blog Post Schema
const BlogPost = Post.discriminator('Blog', new Schema({
    caption: {
        type: String,
    },
    blogContent: {
        type: String,
        required: true,
    },
}));

// Exporting models
export {
    Post,
    ImagePost,
    BlogPost,
};