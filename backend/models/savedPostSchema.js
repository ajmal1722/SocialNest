import mongoose from 'mongoose';

const savedPostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    collectionName: {
        type: String,
        default: 'Saved Items',
    },
    savedAt: {
        type: Date,
        default: Date.now,
    },
})

const savedPost = mongoose.model('SavedPost', savedPostSchema);

export default savedPost;