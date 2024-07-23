import Users from '../models/userSchema.js';

export const fetchSuggestions = async (req, res) => {
    try {
        const userId = req.user;

        const user = await Users.findById(userId);

        res.status(200).json('suggestions');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const followUser = async (req, res) => {
    try {
        const userId = req.user;
        const userToFollowId = req.params.id;

        const user = await Users.findById(userId);
        const userToFollow = await Users.findById(userToFollowId);

        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (user.following.includes(userToFollowId)) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        user.following.push(userToFollowId);
        userToFollow.followers.push(userId);

        await user.save()
        await userToFollow.save()

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}