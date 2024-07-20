import { Post, ImagePost, BlogPost } from '../models/postSchema.js';
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
                return res.status(400).json({ message: 'No file uploaded for Image content type' });
            }
        } else if (contentType === 'Blog') {
            newPost = new BlogPost({ author_id, caption, blogContent });
        } else {
            return res.status(400).json({ message: 'Invalid content type' });
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
        console.log('userId:', userId);

        const posts = await Post.aggregate([
            {
                $match: {
                    author_id: new mongoose.Types.ObjectId(userId), // Convert to ObjectId
                },
            },
            {
                $sort: {
                    createdAt: -1, // Sort posts by creation date, latest first
                },
            },
        ]);

        res.status(200).json({ posts });
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
            return res.status(400).json({ error: 'Post ID is required' });
        }

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};