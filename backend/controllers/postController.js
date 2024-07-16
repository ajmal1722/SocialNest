import { Post, ImagePost, BlogPost } from '../models/postSchema.js';

export const createPost = async (req, res) => {
    try {
        const { contentType, blogContent } = req.body;
        const author_id = req.user;
        // console.log('authorId:', req.body);
        // console.log('blogContent:', req.body);

        let newPost;
        if (contentType === 'Image') {
            // newPost = new ImagePost({ author_id, image_url, caption });
        } else if (contentType === 'Blog') {
            // console.log('blogContent:', blogContent);
            newPost = new BlogPost({ author_id, blogContent });
        } else {
            return res.status(400).json({ message: 'Invalid content type' });
        }

        const savedPost = await newPost.save();
        console.log('Post created succesfully');
        res.status(201).json({ savedPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};