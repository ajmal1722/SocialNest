import Admin from "../models/adminSchema.js";
import Report from '../models/reportSchema.js';
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
            return res.status(400).json({ error: 'User does not exist' });
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

export const reportPost = async (req, res) => {
    try {
        const { reasonForReport, postId } = req.body;
        const userId = req.user;
        
        console.log(reasonForReport, postId, userId)

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' }); 
        
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