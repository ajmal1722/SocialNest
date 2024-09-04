import User from "../models/userSchema.js";

const isUserBlocked = async (req, res, next) => {
    try {
        const { targetUserId } = req.body;
        const userId = req.user;

        // Find the user and check if the target user is blocked
        const user = await User.findById(userId, 'blockedUsers');
        if (user && user.blockedUsers.includes(targetUserId)) {
            return res.status(403).json({ error: 'You have blocked this user' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking block status', error });
    }
};

export default isUserBlocked;