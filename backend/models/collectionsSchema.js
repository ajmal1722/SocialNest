import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    collectionName: {
        type: String,
        default: 'Saved Items',
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavedPost',
    }],
}, { timestamps: true });

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;