import Users from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('userToken', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production' 
        });

        // Return success response with token
        return res.status(200).json({ message: 'Login successful', token });
        
    } catch (error) {
        // Handle the error
        console.error('Error during user login:', error);
        return res.status(500).json({ error: error.message });
    }
};

export { userSignup, userLogin };
