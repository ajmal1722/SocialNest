import Message from "../models/messageSchema.js";
import Conversation from "../models/conversationSchema.js";
import { getSocketIo } from "../sockets/index.js";

export const getMessage = async (req, res) => {
    try {
        const userId = req.user;
        const userToChat = req.params.id;

        res.status(200).json({ msg: 'coming soon..'})
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

        if (!message) {
            return res.status(400).json({ error: 'Message is required' })
        }
        
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

        // Emit the message to the receiver in real-time (if Socket.io is being used)
        const io = getSocketIo();
        io.to(receiverId).emit('chatMessage', newMessage);

        res.status(201).json({ newMessage })
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}