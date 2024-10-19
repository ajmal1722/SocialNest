import Notifications from "../../models/notificationSchema.js";

export const createNotification = async (recipientId, senderId, type) => {
    const newNotification = new Notifications({
        recipientId,  // The user being followed (the recipient of the notification)
        senderId,             // The user who is following (the sender of the notification)
        type,               // Notification type
    });

    await newNotification.save(); // Save the notification to the database 
}

export const deleteNotification = async (recipientId, senderId, type) => {
    await Notifications.findOneAndDelete({
        recipientId, 
        senderId,
        type, 
    });
}