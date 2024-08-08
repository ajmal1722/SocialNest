import { Post, ImagePost, BlogPost } from '../models/postSchema.js';
import Users from '../models/userSchema.js';
import SavedPost from '../models/savedPostSchema.js';
import Collection from '../models/collectionsSchema.js';
import mongoose from 'mongoose';
import cloudinary from '../utils/cloudinary.js';

export const createPost = async (req, res) => {
    try {
        const { contentType, caption, blogContent } = req.body;
        const author_id = req.user;
        let newPost;
        
        if (contentType === 'Image') {
            let file = req.file;
            if (file) {
                const result = await cloudinary.uploader.upload(file.path);
                
                newPost = new ImagePost({
                    author_id,
                    caption,
                    image_url: result.secure_url,
                });
            } else {
                return res.status(400).json({ error: 'No file uploaded for Image content type' });
            }
        } else if (contentType === 'Blog') {
            newPost = new BlogPost({ author_id, caption, blogContent });
        } else {
            return res.status(400).json({ message: 'Invalid content type', res: req.body });
        }

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};

export const fetchPosts = async (req, res) => {
    try {
        const userId = req.user;

        const user = await Users.findById(userId);
        user.password = undefined // to avoid sending password as response

        const posts = await Post.aggregate([
            {
                $match: {
                    author_id: new mongoose.Types.ObjectId(userId), // Convert to ObjectId
                    isDeleted: false,
                    isArchived: false,
                },
            },
            {
                $sort: {
                    createdAt: -1, // Sort posts by creation date, latest first
                },
            },
        ]);

        res.status(200).json({ user, posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
}

export const fetchPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId);

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ status: 'Failed', error: 'Post not found' });
        }

        res.status(200).json({ status: 'Success', post });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { contentType, caption, blogContent } = req.body;
        const author_id = req.user;

        let updatedPost;

        if (contentType === 'Image') {
            updatedPost = await ImagePost.findByIdAndUpdate(
                postId,
                { author_id, caption },
                { new: true }
            );
        } else if (contentType === 'Blog') {
            updatedPost = await BlogPost.findByIdAndUpdate(
                postId,
                { author_id, caption, blogContent },
                { new: true }
            );
        } else {
            return res.status(400).json({ message: 'Invalid content type' });
        }

        if (!updatedPost) {
            return res.status(404).json({ status: 'Failed', message: 'Post not found' });
        }

        res.status(200).json({ status: 'Success', post: updatedPost });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log('postId:', postId);

        if (!postId) {
            return res.status(400).json({ error: 'Post not found' });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.isDeleted = true;
        const deletedPost = await post.save();

        res.status(200).json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const archivePost = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log('postId:', postId);

        if (!postId) {
            return res.status(400).json({ error: 'Post not found' });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.isArchived = true;
        const archivedPost = await post.save();

        res.status(200).json({ message: 'Post archived successfully', archivedPost });
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const fetchArchivedPosts = async (req, res) => {
    try {
        const userId = req.user;

        const posts = await Post.aggregate([
            {
                $match: {
                    author_id: new mongoose.Types.ObjectId(userId), // Convert to ObjectId
                    isArchived: true,
                },
            },
            {
                $sort: {
                    createdAt: -1, // Sort posts by creation date, latest first
                },
            },
        ]);

        res.status(200).json({ archivePosts: posts });
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const likeOrUnlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has already liked the post
        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            // If already liked, remove the like (unlike)
            post.likes = post.likes.filter(id => id.toString() !== userId);
            await post.save();
            return res.status(200).json({ message: 'Post unliked successfully', post });
        } else {
            // If not liked, add the like
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({ message: 'Post liked successfully', post });
        }
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const userId = req.user;
        const { comment, postId } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ status: 'Failed', error: 'Post not found' });
        }

        const newComment = {
            user_id: userId,
            author_id: post.author_id,
            content: comment,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        post.comments.push(newComment);

        await post.save();
        
        // lookup for the user details
        const user = await Users.findById(userId, 'username profilePicture');
        const populatedComment = {
            ...newComment,
            user_details: {
                _id: user._id,
                username: user.username,
                profilePicture: user.profilePicture
            }
        };

        console.log('Comment added successfully');
        res.status(200).json({ status: 'Success', comments: populatedComment });
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}

export const fetchComments = async (req, res) => {
    try {
        const postId  = req.params.id;

        const comments = await Post.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId.createFromHexString(postId)
                }
            },
            {
                $unwind: '$comments'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.user_id',
                    foreignField: '_id',
                    as: 'commented_user_details'
                }
            },
            {
                $unwind: '$commented_user_details'
            },
            {
                $project: {
                    _id: 1,
                    author_id: 1,
                    'comments._id': 1,
                    'comments.user_id': 1,
                    'comments.content': 1,
                    'comments.createdAt': 1,
                    'comments.updatedAt': 1,
                    'comments.user_details': {
                        _id: '$commented_user_details._id',
                        username: '$commented_user_details.username',
                        profilePicture: '$commented_user_details.profilePicture'
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    author_id: { $first: '$author_id'},
                    comments: {
                        $push: {
                            _id: '$comments._id',
                            user_id: '$comments.user_id',
                            content: '$comments.content',
                            createdAt: '$comments.createdAt',
                            updatedAt: '$comments.updatedAt',
                            user_details: '$comments.user_details'
                        }
                    },
                }
            }
        ]);
        
        
        console.log('Comment fetched successfully');
        res.status(200).json({ comments });
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}


// Save Post

export const savePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { postId, collectionName } = req.body;

        // Check if the postId is provided
        if (!postId) {
            return res.status(400).json({ status: 'Failed', error: 'Post ID is required.' });
        }

        // Find or create the collection
        let collection = await Collection.findOne({ user: userId, collectionName });

        if (!collection) {
            collection = new Collection({
                user: userId,
                collectionName: collectionName || 'Saved Items',
            });
            await collection.save();
        }

        // Check if the post is already saved in the collection
        const existingSavedPost = await SavedPost.findOne({
            user: userId,
            post: postId,
            collection: collection._id,
        });

        if (existingSavedPost) {
            return res.status(400).json({ status: 'Failed', error: 'Post is already saved in this collection.' });
        }

        // Create a new saved post
        const newSavedPost = new SavedPost({
            user: userId,
            post: postId,
            collection: collection._id,
        });

        // Save the new saved post to the database
        const savedPost = await newSavedPost.save();

        // Add the saved post to the collection
        collection.posts.push(savedPost._id);
        await collection.save();

        res.status(201).json({ status: 'Success', data: savedPost });
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};