import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reasonForReport: {
        type: String,
        ref: 'Collection',
        required: true,
    },
}, { timestamps: true });

const reportedPost = mongoose.model('Report', reportSchema);

export default reportedPost;