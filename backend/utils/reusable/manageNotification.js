import Notifications from "../../models/notificationSchema.js";

// Function to create a notification
export const createNotification = async (recipientId, senderId, type, postId = null, comment) => {
    const newNotification = new Notifications({
        recipientId,  // The recipient of the notification (e.g., post author)
        senderId,     // The sender of the notification (e.g., user liking the post)
        type,         // Notification type (like, comment, follow, etc.)
    });

    // If the type is 'like' or 'comment', include the postId
    if (type === 'like' || type === 'comment') {
        newNotification.postId = postId;  // Attach the postId to the notification
        if (type === 'comment') {
            newNotification.commentMessage = comment;
        }
    }

    await newNotification.save(); // Save the notification to the database
};

// Function to delete a notification
export const deleteNotification = async (recipientId, senderId, type, postId = null) => {
    const query = {
        recipientId, 
        senderId,
        type, 
    };

    // If the type is 'like' or 'comment', include the postId in the query
    if (type === 'like' || type === 'comment') {
        query.postId = postId;
    }

    await Notifications.findOneAndDelete(query);  // Delete the matching notification from the database
};