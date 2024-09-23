import Message from "../models/messageSchema.js";
import Conversation from "../models/conversationSchema.js";

export const getMessage = async (req, res) => {
    try {
        
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.user;
        const { message } = req.body;
        
        // Check if a conversation exists between the two participants
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]}
        })

        // If no conversation, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        // Create and save the new message
        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            receiver: receiverId,
            message,
        })

        await newMessage.save();

        // Update the conversation with the last message and timestamp
        conversation.lastMessage = message;
        conversation.lastMessageAt = Date.now();
        await conversation.save();

        res.status(201).json({ message: 'Message send successfully', newMessage })
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}