import Users from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import router from '../routes/userAuthRouter.js';

// User signup function
const userSignup = async (req, res) => {
    try {
        const userData = req.body;
        
        // Check if email already exists
        const isEmailExist = await Users.findOne({ email: userData.email });
        if (isEmailExist) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(userData.password, 8);

        // Creating the User
        const user = await Users.create({ ...userData, password: hashedPassword });

        // Return success response
        return res.status(201).json({ message: 'User created successfully', user });
        
    } catch (error) {
        // Handle the error
        console.error('Error during user signup:', error);
        return res.status(500).json({ error: error.message });
    }
};

// User login function
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'user does not exist' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

        // Save the refresh token with the user in the database
        user.refreshToken = refreshToken;
        await user.save();

        // Set the tokens as cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Return success response
        return res.status(200).json({ 
            username: user.username,
            email: user.email,
        });
        
    } catch (error) {
        // Handle the error
        console.error('Error during user login:', error);
        return res.status(500).json({ error: error.message });
    }
};

// Generating access token funciton
const generateAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token is required' });
        }

        // Find the user with the refresh token
        const user = await Users.findOne({ refreshToken });
        if (!user) {
            return res.status(400).json({ error: 'User not found, Invalid refresh token' });
        }

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token is not verified, Invalid refresh token' });
            }

            // Generate a new access token
            const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

            // Set the new access token as a cookie
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

            // Return the new access token
            return res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        // Handle the error
        console.error('Error during token generation:', error);
        return res.status(500).json({ error: error.message });
    }
};

// Verify access token
const protectedRoute = (req, res) => {
    res.status(200).json({ user: req.user });
}

export { userSignup, userLogin, generateAccessToken, protectedRoute };