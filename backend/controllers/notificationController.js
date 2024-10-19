import Notifications from "../models/notificationSchema.js";

const fetchNotifications = async (req, res) => {
    try {
        const userId = req.user; // Get the ID of the logged-in user

        // Fetch notifications where the recipient is the logged-in user
        const notifications = await Notifications.find({ recipientId: userId })
            .populate('senderId', 'username profilePicture') // Populate sender details
            .populate('postId', 'image_url')
            .sort({ createdAt: -1 }) // Sort by most recent notifications first
            .exec();

        const renamedNotifications = notifications.map(notification => ({
            ...notification.toObject(),  // Convert Mongoose document to plain object
            post: notification.postId,  // Rename postId to post
            postId: undefined,  // Optionally remove postId if needed
        }));

        res.status(200).json(renamedNotifications); // Return the notifications
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export {
    fetchNotifications,
};