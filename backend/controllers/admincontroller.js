import Admin from "../models/adminSchema.js";
import Report from '../models/reportSchema.js';
import User from "../models/userSchema.js";
import { Post } from '../models/postSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const adminSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        const hashedPassword = await bcrypt.hash(password, 8)
    
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword
        })
        
        res.status(200).json({ admin })
    } catch (error) {
        res.status(500).json({ error: 'Internal server Error'})
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email })
        // console.log(email);

        if (!admin) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        if (password) {
            const isMatch = await bcrypt.compare(password, admin.password)
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid password' });
            }
        }

        const adminAccessToken = jwt.sign({ id: admin._id}, process.env.JWT_ADMIN_SECRET, { expiresIn: '15m'});
        const adminRefreshToken = jwt.sign({ id: admin._id }, process.env.REFRESH_ADMIN_SECRET, { expiresIn: '7d' });

        admin.refreshToken = adminRefreshToken;
        await admin.save();

        // Set the tokens as cookies
        res.cookie('adminAccessToken', adminAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.cookie('adminRefreshToken', adminRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Remove sensitive fields before sending response
        admin.password = undefined;
        admin.refreshToken = undefined;
        
        return res.status(200).json({ message: 'Login successfull', admin });
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ error: error.message });
    }
}

export const isAdminProtected = async (req, res) => {
    res.status(200).json({ admin: req.user, isAuthenticated: true });
}

export const getMonthlyStats = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        // Initialize an array to store user and post count for each month
        const monthlyStats = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            totalUsers: 0,
            totalPosts: 0
        }));

        // Fetch new users grouped by month
        const usersByMonth = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`)
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    totalUsers: { $sum: 1 }
                }
            }
        ]);

        // Fetch new posts grouped by month
        const postsByMonth = await Post.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`)
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    totalPosts: { $sum: 1 }
                }
            }
        ]);

        // Update the monthly stats array with the fetched data
        usersByMonth.forEach(userData => {
            monthlyStats[userData._id.month - 1].totalUsers = userData.totalUsers;
        });

        postsByMonth.forEach(postData => {
            monthlyStats[postData._id.month - 1].totalPosts = postData.totalPosts;
        });

        res.status(200).json(monthlyStats);
    } catch (error) {
        console.error('Error fetching reported posts:', error);
        return res.status(500).json({ error: error.message });
    }
}

export const fetchReportPost = async (req, res) => {
    try {
        const reportedPosts = await Report.aggregate([
            {
                $lookup: {
                    from: 'posts',
                    localField: 'postId',
                    foreignField: '_id', 
                    as: 'post_details'
                }
            },
            {
                $unwind: {
                    path: '$post_details'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'reportedBy',
                    foreignField: '_id',
                    as: 'user_details'
                }
            },
            {
                $unwind: {
                    path: '$user_details'
                }
            },
            {
                $project: {
                    'user_details.password': 0,       // Exclude password
                    'user_details.refreshToken': 0,   // Exclude refreshToken
                    'user_details.__v': 0,
                    'user_details.followers': 0,
                    'user_details.following': 0,
                    'user_details.savedPosts': 0,
                }
            }
        ]);
        
        // Update the monthly stats array with the fetched data
        usersByMonth.forEach(userData => {
            monthlyStats[userData._id.month - 1].totalUsers = userData.totalUsers;
        });

        postsByMonth.forEach(postData => {
            monthlyStats[postData._id.month - 1].totalPosts = postData.totalPosts;
        });

        res.status(200).json(monthlyStats);
    } catch (error) {
        console.error('Error fetching reported posts:', error);
        return res.status(500).json({ error: error.message });
    }
};

export const fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -__v -refreshToken');

        res.status(200).json({ users })
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: error.message });
    }
}

export const banUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if user is already banned
        if (user.isBanned) {
            return res.status(400).json({ message: 'User is already banned' });
            // user.isBanned = false;
            // await user.save()
            // return res.status(200).json({ message: 'User has been unbanned successfully' });
        }

        // Ban the user
        user.isBanned = true;
        user.refreshToken = null;
        await user.save();

        // Send success response
        return res.status(200).json({ message: 'User has been banned successfully' });
    } catch (error) {
        console.error('Error banning user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};