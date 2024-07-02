import jwt from 'jsonwebtoken';

const userVerification = (req, res, next) => {
    const token = req.cookies.userToken;
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export default userVerification;