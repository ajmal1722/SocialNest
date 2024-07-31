import { Post, ImagePost, BlogPost } from '../models/postSchema.js';
import Users from '../models/userSchema.js'
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

export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user;

        const post = Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ error: 'You have already liked this post' });
        }

        // Add the user ID to the likes array
        post.likes.push(userId);
        await post.save();

        res.status(200).json({ message: 'Post liked successfully', post });

    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}