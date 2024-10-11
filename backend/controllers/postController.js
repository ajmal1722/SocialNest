import { Post, ImagePost, BlogPost } from '../models/postSchema.js';
import Users from '../models/userSchema.js';
import SavedPost from '../models/savedPostSchema.js';
import Collection from '../models/collectionsSchema.js';
import Report from '../models/reportSchema.js';
import mongoose from 'mongoose';
import cloudinary from '../utils/cloudinary.js';
import { createNotification, deleteNotification } from '../utils/reusable/manageNotification.js';
import { getSocketIo } from '../sockets/index.js';
import userSocketMap from '../sockets/userSocketMap.js';
import { Socket } from 'socket.io';

export const getHomePagePosts = async (req, res) => {
    const { page, limit } = req.query;  // Default to page 1 and limit 10
    const userId = req.user;  // Get logged-in user's ID

    try {
        // Find IDs of reported posts by the logged-in user
        const reportedPosts = await Report.find({ reportedBy: userId }).distinct('postId');

        // Find the list of blocked users for the logged-in user
        const user = await Users.findById(userId).select('blockedUsers');
        const blockedUsers = user?.blockedUsers || [];
        // blockedUsers.push(userId)

        // Find users who have blocked the logged-in user
        const usersBlockingMe = await Users.find({ blockedUsers: userId }).select('_id');
        const usersBlockingMeIds = usersBlockingMe.map(user => user._id);

        // Fetch posts excluding reported posts and posts by blocked users
        const posts = await Post.aggregate([
            {
                $match: {
                    isDeleted: false,  // Exclude deleted posts
                    isArchived: false,  // Exclude archived posts
                    _id: { $nin: reportedPosts },  // Exclude reported posts
                    author_id: { $nin: [...blockedUsers, ...usersBlockingMeIds] } // Exclude posts from blocked users and users who blocked me
                }
            },
            {
                $lookup: {
                    from: 'users',  // Join with users collection to get author details
                    localField: 'author_id',  // Local field (author ID)
                    foreignField: '_id',  // Foreign field (user ID)
                    as: 'author_details'  // Alias for the joined author data
                }
            },
            {
                $unwind: '$author_details'  // Flatten the author_details array
            },
            {
                $project: {
                    'author_details.refreshToken': 0,  // Exclude refreshToken from the response
                    'author_details.password': 0,  // Exclude password from the response
                }
            },
            {
                $sort: { createdAt: -1 }  // Sort posts by newest first
            },
            {
                $skip: (page - 1) * limit  // Skip documents for pagination
            },
            {
                $limit: parseInt(limit)  // Limit the number of posts per page
            }
        ]);

        // Return posts as response
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

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
        console.log('postId:', deletePost);

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

        post.isArchived = !post.isArchived;
        const archivedPost = await post.save();

        const message = post.isArchived ? 'Post archived successfully' : 'Post added to profile successfully';
        res.status(200).json({ message, archivedPost });
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
                    isDeleted: false,
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
        const io = getSocketIo();  // Retrieve the initialized Socket.io instance

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Convert post.author_id to a string for comparison
        const authorId = post.author_id.toString();  // Convert ObjectId to string

        // Check if the user has already liked the post
        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            // If already liked, remove the like (unlike)
            post.likes = post.likes.filter(id => id.toString() !== userId);
            await post.save();

            // Remove the liked notification if the user unliked the post
            await deleteNotification(authorId, userId, 'like');

            // Emit real-time notification for unliking
            const recipientSocketId = userSocketMap.get(authorId);  // Now uses string key
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('notification', {
                    type: 'unlike',
                    senderId: userId,
                    post,
                });
            }

            return res.status(200).json({ message: 'Post unliked successfully', post });
        } else {
            // If not liked, add the like
            post.likes.push(userId);
            await post.save();

            // If user liked, create the notification
            await createNotification(authorId, userId, 'like');

            // Emit real-time notification for liking
            const recipientSocketId = userSocketMap.get(authorId);  // Now uses string key
            console.log('recipientSocketId:', recipientSocketId, userSocketMap, authorId);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('notification', {
                    type: 'like',
                    senderId: userId,
                    post,
                });
            }

            return res.status(200).json({ message: 'Post liked successfully', post });
        }
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

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

export const toggleSavePost = async (req, res) => {
    try {
        const userId = req.user;
        const { postId, collectionName } = req.body;
        console.log(req.body);

        if (!collectionName) {
            return res.status(400).json({ status: 'Failed', error: 'Collection name is required.' });
        }

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
            // If the post is already saved, unsave it (remove from the collection)
            await SavedPost.findByIdAndDelete(existingSavedPost._id);
            collection.posts = collection.posts.filter(
                (post) => !post.equals(existingSavedPost._id)
            );
            await collection.save();

            return res.status(200).json({ status: 'Success', message: 'Post unsaved successfully.' });
        } else {
            // If the post is not saved, save it to the collection
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

            return res.status(201).json({ status: 'Success', data: savedPost, message: 'Post saved successfully.' });
        }
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const checkIsSaved = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user;

        // Find the saved post and populate the collection name
        const savedPost = await SavedPost.findOne({ user: userId, post: postId })
            .populate('collection', 'collectionName');

        if (savedPost) {
            return res.status(200).json({
                status: 'Success',
                isSaved: true,
                collectionName: savedPost.collection ? savedPost.collection.collectionName : null
            });
        } else {
            return res.status(200).json({
                status: 'Success',
                isSaved: false,
                collectionName: null
            });
        }
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}

export const getCollections = async (req, res) => {
    try {
        const userId = req.user;

        // Fetch all collections that belong to the user
        const collections = await Collection.find({ user: userId });

        // Send the collections as a response
        res.status(200).json({ status: 'Success', collections });
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const getSavedPosts = async (req, res) => {
    try {
        const collectionId = req.params.id;
        const userId = req.user;

        const savedPosts = await SavedPost.aggregate([
            // Match the saved posts by user and collection
            {
                $match: {
                    user: mongoose.Types.ObjectId.createFromHexString(userId),
                    collection: mongoose.Types.ObjectId.createFromHexString(collectionId)
                }
            },
            // Lookup to join with the posts collection
            {
                $lookup: {
                    from: "posts", // The name of the collection to join with
                    localField: "post", // The field from SavedPost to match
                    foreignField: "_id", // The field from Posts to match with localField
                    as: "post" // The resulting array field in the output
                }
            },
            // Unwind the joined array to have a flat structure
            {
                $unwind: "$post"
            },
            // Lookup to join with the users collection
            {
                $lookup: {
                    from: "users", // The name of the collection to join with
                    localField: "post.author_id", // The field from SavedPost to match
                    foreignField: "_id", // The field from Users to match with localField
                    as: "user" // The resulting array field in the output
                }
            },
            // Unwind the joined user array
            {
                $unwind: "$user"
            },
            // Project to include/exclude fields
            {
                $project: {
                    "user.password": 0, // Exclude the password field
                    "user.refreshToken": 0,     // Exclude the token field
                    "user.followers": 0,
                    "user.following": 0,
                    "user.bio": 0,
                }
            }
        ]);

        res.status(200).json({ status: 'Success', savedPosts });
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}

export const reportPost = async (req, res) => {
    try {
        const { reasonForReport, postId } = req.body;
        const userId = req.user;
        
        console.log(reasonForReport, postId, userId)

        // Check if the user has already reported this post
        const existingReport = await Report.findOne({ postId, userId });

        if (existingReport) {
            return res.status(400).json({ message: 'You have already reported this post.' });
        } 
        
        const report = new Report({
            postId,
            reportedBy: userId,
            reasonForReport
        })

        await report.save();

        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        console.error('Error during reporting post:', error);
        return res.status(500).json({ error: error.message })
    }
}