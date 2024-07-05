import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const verifyAccessToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
        if (accessToken) {
            jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
                if (err) throw new Error('Invalid access token');

                req.user = decoded.userId;
                next();
            });
        } else {
            throw new Error('Access token missing or expired');
        }
    } catch (err) {
        if (refreshToken) {
            jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: 'Invalid refresh token' });
                }

                const user = await User.findById(decoded.userId);
                if (!user || user.refreshToken !== refreshToken) {
                    return res.status(401).json({ error: 'Invalid refresh token' });
                }

                const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 15 * 60 * 1000 // 15 minutes
                });

                req.user = decoded.userId;
                next();
            });
        } else {
            return res.status(401).json({ error: 'Not authorized, no token' });
        }
    }
};

export default verifyAccessToken;