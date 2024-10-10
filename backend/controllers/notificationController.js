import Notifications from "../models/notificationSchema.js";

const fetchNotifications = async (req, res) => {
    try {
        const userId = req.user; // Get the ID of the logged-in user

        // Fetch notifications where the recipient is the logged-in user
        const notifications = await Notifications.find({ recipientId: userId })
            .populate('senderId', 'username profilePicture') // Populate sender details (optional)
            .sort({ createdAt: -1 }) // Sort by most recent notifications first
            .exec();

        res.status(200).json(notifications); // Return the notifications
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export {
    fetchNotifications,
};