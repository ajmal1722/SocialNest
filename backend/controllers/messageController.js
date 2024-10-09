import Message from "../models/messageSchema.js";
import Conversation from "../models/conversationSchema.js";
import User from '../models/userSchema.js'
import { getSocketIo } from "../sockets/index.js";
import userSocketMap from '../sockets/userSocketMap.js'

export const fetchConversations = async (req, res) => {
    try {
        const userId = req.user; // Assuming req.user contains the user's ObjectId

        // Find conversations where the userId is a participant
        const conversations = await Conversation.find({ participants: userId })
            .sort({ lastMessageAt: -1 }) // Sort by lastMessageAt in descending order (newest first)
            .populate('participants', 'username profilePicture blockedUsers') // Populate participant details
            .exec();

        // Filter out the current user's data from participants
        const filteredConversations = conversations.map(conversation => {
            const otherParticipant = conversation.participants.find(
                participant => participant._id.toString() !== userId.toString()
            );

            return {
                ...conversation._doc,
                participants: otherParticipant || null, // Assign the single participant object
            };
        });

        res.status(200).json({ conversations: filteredConversations });
    } catch (error) {
        console.log('Error fetching conversations:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const users = await User.find().select('username profilePicture')

        res.status(200).json({ conversations: users });
    } catch (error) {
        console.log('Error fetching users:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

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
        const receiverId = req.params.id; // ID of the user receiving the message
        const senderId = req.user; // ID of the user sending the message (from JWT or session)
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Check if a conversation exists between the sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create a new message in the conversation
        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            receiver: receiverId,
            message,
        });

        await newMessage.save();

        // Update the conversation's last message and timestamp
        conversation.lastMessage = message;
        conversation.lastMessageAt = Date.now();
        await conversation.save();

        // Emit the message to the receiver in real-time
        const io = getSocketIo(); // Get the Socket.io instance

        // Retrieve the receiver's socket ID from the userSocketMap
        const receiverSocketId = userSocketMap.get(receiverId);

        if (receiverSocketId) {
            // Emit the message only to the specific receiver using their socket ID
            io.to(receiverSocketId).emit('chatMessage', {
                conversationId: newMessage.conversationId,
                sender: senderId,
                receiver: newMessage.receiver,
                message: newMessage.message,
                createdAt: newMessage.createdAt
            });
            console.log(`Message sent to receiver with socket ID: ${receiverSocketId}`);
        } else {
            console.log('Receiver is not connected.');
        }

        // Send response back to the sender
        res.status(201).json({ newMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const getUnreadMessageCount = async (req, res) => {
    try {
        const userId = req.user; 
        console.log(userId)

        // Find all unread messages where the receiver is the current user
        const unreadMessageCount = await Message.countDocuments({
            receiver: userId,
            read: false
        })

        res.status(200).json({
            message: 'Unread message count retrieved successfully',
            unreadMessageCount
        });
    } catch (error) {
        console.log('Error fetching unread message count:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const markMessagesAsRead = async (req, res) => {
    try {
        const userId = req.user;
        const conversationId = req.params.id;

        // Update all unread messages in the conversation where the receiver is the current user
        await Message.updateMany(
            { conversationId, receiver: userId, read: false },
            { $set: { read: true }}
        )

        // Emit event to notify the sender that the messages were read in real-time
        const io = getSocketIo();
        io.to(conversationId).emit('messagesRead', {
            conversationId,
            userId
        })

        res.status(200).json({
            message: 'Messages marked as read successfully',
        });
    } catch (error) {
        console.log('Error marking messages as read:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

// Get unread message count for each conversation
export const getUnreadMessageCountPerConversation = async (req, res) => {
    try {
        const userId = req.user;

        // Find all conversations where the user is a participant
        const conversations = await Conversation.find({ participants: userId });

        // Map through the conversations and get unread message count for each
        const unreadCounts = await Promise.all(conversations.map(async (conversation) => {
            const unreadCount = await Message.countDocuments({
                conversationId: conversation._id,
                receiver: userId,
                read: false
            });

            return {
                conversationId: conversation._id,
                unreadCount
            };
        })); 
        
        res.status(200).json({
            message: 'Unread message counts retrieved successfully',
            unreadCounts
        });
    } catch (error) {
        console.log('Error fetching unread message counts:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};

export const unsendMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const userId = req.user; // Assuming user ID comes from authentication (JWT/session)

        // Find the message by ID
        const message = await Message.findById(messageId);

        // If message not found, return 404
        if (!message) {
            return res.status(404).json({ status: 'Failed', error: 'Message not found' });
        }

        // Check if the user is the sender of the message
        if (message.sender.toString() !== userId.toString()) {
            return res.status(403).json({ status: 'Failed', error: 'You are not authorized to delete this message' });
        }

        // Delete the message
        await message.deleteOne();

        // Find the conversation and update the last message if necessary
        const conversation = await Conversation.findById(message.conversationId);

        if (conversation && conversation.lastMessage === message.message) {
            // Find the new last message in the conversation
            const lastMessage = await Message.findOne({ conversationId: conversation._id })
                .sort({ createdAt: -1 });

            if (lastMessage) {
                conversation.lastMessage = lastMessage.message;
                conversation.lastMessageAt = lastMessage.createdAt;
            } else {
                conversation.lastMessage = null;
                conversation.lastMessageAt = null;
            }

            await conversation.save();
        }

        res.status(200).json({ status: 'Success', message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error while unsending message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
};