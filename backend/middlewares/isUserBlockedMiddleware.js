import User from "../models/userSchema.js";

const isUserBlocked = async (req, res, next) => {
    try {
        const targetUserId = req.params.id; // The user whom the current user is interacting with
        const currentUserId = req.user; // The current logged-in user

        // Fetch the current user to check their blockedUsers array
        const currentUser = await User.findById(currentUserId, 'blockedUsers');

        // Check if the current user has blocked the target user
        // if (currentUser && currentUser.blockedUsers.includes(targetUserId)) {
        //     return res.status(403).json({ error: 'You have blocked this user' });
        // }

        // Fetch the target user to check their blockedUsers array
        const targetUser = await User.findById(targetUserId, 'blockedUsers');
        console.log(targetUser)

        // Check if the target user has blocked the current user
        if (targetUser && targetUser.blockedUsers.includes(currentUserId)) {
            return res.status(403).json({ error: 'You are blocked by this user' });
        }

        // If neither is blocked, proceed to the next middleware
        next();
    } catch (error) {
        console.error('Error checking block status:', error);
        res.status(500).json({ message: 'Error checking block status', error });
    }
};

export default isUserBlocked;