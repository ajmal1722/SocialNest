import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const userVerification = async (req, res, next) => {
    let token;

    token = req.cookies.userToken;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.userId).select('-password')

            next()
        } catch (error) {
            return res.status(401).json({ error: 'Not authorized, invalid token'})
        }
    } else {
        return res.status(401).json({ error: 'Not authorized, no token'})
    }
};

export default userVerification;