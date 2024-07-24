import Users from '../models/userSchema.js';

export const fetchSuggestions = async (req, res) => {
    try {
        const userId = req.user;

        const user = await Users.findById(userId);

        const following = user.following;

        const suggestions = await Users.find({
            _id: { $ne: userId, $nin: following }
        }).select('username name email profilePicture')
        // console.log('suggestions:', suggestions);

        res.status(200).json({ suggestions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const followUser = async (req, res) => {
    try { 
        const userId = req.user;
        const userToFollowId = req.params.id;
        console.log('userId:', req.params);

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

        res.status(200).json({ message: 'User followed successfully', id: userToFollowId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const unfollowUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const userToUnfollowId = req.params.id;

        // Find the current user and the user to unfollow
        const user = await Users.findById(userId);
        const userToUnfollow = await Users.findById(userToUnfollowId);

        // Check if the user to unfollow exists
        if (!userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current user is following the user to unfollow
        if (!user.following.includes(userToUnfollowId)) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        // Remove the user to unfollow from the current user's following array
        user.following = user.following.filter(id => id.toString() !== userToUnfollowId);

        // Remove the current user from the user to unfollow's followers array
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== userId.toString());

        // Save both users
        await user.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
