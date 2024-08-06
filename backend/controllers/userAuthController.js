import Users from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";
import nodemailer from 'nodemailer'

// const generateTokens = async (user, res) => {
//     // Generate JWT tokens
//     const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
//     const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

//     // Save the refresh token with the user in the database
//     user.refreshToken = refreshToken;
//     await user.save();

//     // Set the tokens as cookies
//     res.cookie('accessToken', accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 15 * 60 * 1000 // 15 minutes
//     });
//     res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });
// }

// User signup function
const userSignup = async (req, res) => {
    try {
        const userData = req.body;
        
        // Check if email already exists
        const isEmailExist = await Users.findOne({ email: userData.email });
        if (isEmailExist) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Check if email already exists
        const isUserNameExist = await Users.findOne({ username: userData.username });
        if (isUserNameExist) {
            return res.status(400).json({ error: 'Username is already taken' });
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
        let { email } = req.body;
        const { password, token } = req.body;

        // if the user is signed in using google auth get email from the google token
        if (token) {
            // decoding token
            const decodedToken = await jwtDecode(token)
            email = decodedToken.email
            console.log('decoded email:', email);
        }

        // Check if the user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'user does not exist' });
        }

        // Compare the provided password with the stored hashed password
        if (password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid password' });
            }
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
            userId: user._id,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            accessToken,
            refreshToken
        });
        
    } catch (error) {
        // Handle the error
        console.error('Error during user login:', error);
        return res.status(500).json({ error: error.message });
    }
};

// Generating access token funciton
// const generateAccessToken = async (req, res) => {
//     try {
//         const { refreshToken } = req.body;

//         if (!refreshToken) {
//             return res.status(400).json({ error: 'Refresh token is required' });
//         }

//         // Find the user with the refresh token
//         const user = await Users.findOne({ refreshToken });
//         if (!user) {
//             return res.status(400).json({ error: 'User not found, Invalid refresh token' });
//         }

//         // Verify the refresh token
//         jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ error: 'Token is not verified, Invalid refresh token' });
//             }

//             // Generate a new access token
//             const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

//             // Set the new access token as a cookie
//             res.cookie('accessToken', newAccessToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 sameSite: 'strict',
//                 maxAge: 15 * 60 * 1000 // 15 minutes
//             });

//             // Return the new access token
//             return res.status(200).json({ accessToken: newAccessToken });
//         });
//     } catch (error) {
//         // Handle the error
//         console.error('Error during token generation:', error);
//         return res.status(500).json({ error: error.message });
//     }
// };

// Verify access token
const protectedRoute = (req, res) => {
    res.status(200).json({ user: req.user, isAuthenticated: true });
}

const userLogout = async (req, res) => {
    try {
        // Clear the cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        // Send a response indicating successful logout
        res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'An error occurred during logout' });
    }
}

// const googleAuthLogin = async (req, res) => {
//     const { token } = req.body;

//     try {
//         const decodedToken = await jwtDecode(token)
//         console.log('google token:', decodedToken.email);

//         if (decodedToken && decodedToken.email) {
//             const user = await Users.findOne({ email: decodedToken.email})
//             if(user) {
                
//             } 
//         }
//     } catch (error) {
        
//     }
// }

const generateOtp = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('mail:', req.body);

        const user = await Users.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        // Generate a random OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

        const emailContent = `
            <h6>Verify Your Email Address</h6>
            
            <p class="text-center">Verify your email to finish Your resetting password.
            use the following verification code:
            </p>

            <h4 class="text-center">${otp}</h4>

            <p>The verification code is valid for 2 minutes</p>
        `;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.APP_EMAIL,
              pass: process.env.APP_PASSWORD,
            },
        });

        // send mail with defined transport object
        const mailOptions = {
            from: process.env.APP_EMAIL, // sender address
            to: email, // list of receivers
            subject: "OTP for account verification", // Subject line
            text: `Your OTP for account verification is: ${otp}`, // plain text body
            html: emailContent, // html body
        };

        // Send mail and wait for completion
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log('err:', err)
            }
            
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        })

        res.status(200).json({ message: 'OTP sent successfully', otp });
    } catch (error) {
        console.error('Error during OTP generation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const changePassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error during OTP generation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const singleUserDetails = async (req, res) => {
    try {
        const id = req.params.id;

        const userDetails = await Users.findById(id).select('-password -refreshToken');
        console.log(userDetails);
        

        if (!userDetails) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user: userDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}

export {
    userSignup, 
    userLogin, 
    protectedRoute, 
    userLogout,
    generateOtp,
    changePassword,
    singleUserDetails,
};