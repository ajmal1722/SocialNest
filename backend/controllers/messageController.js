import Message from "../models/messageSchema.js";
import Conversation from "../models/conversationSchema.js";
import User from '../models/userSchema.js'
import { getSocketIo } from "../sockets/index.js";

export const fetchUsers = async (req, res) => {
    try {
        const users = await User.find().select('_id username profilePicture')

        res.status(200).json({ users })
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}

export const getMessage = async (req, res) => {
    try {
        const userId = req.user;
        const userToChat = req.params.id;

        // Find the conversation between the two users
        const conversation = await Conversation.findOne({
            participants: { $all: [userId, userToChat] }
        });

        // If no conversation is found, return an empty message list
        if (!conversation) {
            return res.status(200).json({
                message: 'No conversation found between the users',
                messages: []
            });
        }

        // Find all messages for the conversation, sorted by creation date
        const messages = await Message.find({ conversationId: conversation._id })
            .sort({ createdAt: 1 }); // Sort messages by ascending order of creation date (oldest to newest)

        res.status(200).json({ 
            message: 'Messages retrieved successfully', 
            messages 
        });
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
        console.log(req.body)

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