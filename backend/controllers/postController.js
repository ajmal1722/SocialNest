import { Post, ImagePost, BlogPost } from '../models/postSchema.js';

export const createPost = async (req, res) => {
    try {
        const { content_type, ...data } = req.body;
        console.log(req.body);

        // let newPost;
        // if (content_type === 'Image') {
        //     newPost = new ImagePost(data);
        // } else if (content_type === 'Blog') {
        //     newPost = new BlogPost(data);
        // } else {
        //     return res.status(400).json({ message: 'Invalid content type' });
        // }

        // const savedPost = await newPost.save();
        res.status(201).json('savedPost');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};