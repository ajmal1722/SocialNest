import User from "../models/userSchema.js";

const isUserBlocked = async (req, res, next) => {
    try {
        const { targetUserId } = req.body;
        const userId = req.user;

        const user = await User.findById(userId);
        if(user.blockedUsers.includes(targetUserId)) {
            return res.status(403).json({ error: 'User is blocked' })
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking block status', error });
    }
};

export default isUserBlocked;