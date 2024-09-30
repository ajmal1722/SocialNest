import Message from "../models/messageSchema.js";
import Conversation from "../models/conversationSchema.js";
import { getSocketIo } from "../sockets/index.js";
import userSocketMap from '../sockets/userSocketMap.js'

export const fetchConversations = async (req, res) => {
    try {
        const userId = req.user; // Assuming req.user contains the user's ObjectId

        // Find conversations where the userId is a participant
        const conversations = await Conversation.find({ participants: userId })
            .populate('participants', 'username profilePicture') // Populate participant details
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

        // Emit the message to the receiver in real-time
        const io = getSocketIo();

        // Retrieve the receiver's socket ID from the `userSocketMap`
        const receiverSocketId = userSocketMap.get(receiverId);

        if (receiverSocketId) {
            // Send the message to the specific receiver using their socket ID
            io.to(receiverSocketId).emit('chatMessage', {
                sender: senderId,
                message: newMessage.message,
            });
            console.log(`Message sent to receiver socket ID: ${receiverSocketId}`);
        } else {
            console.log('Receiver is not connected', receiverSocketId);
        }

        res.status(201).json({ newMessage })
    } catch (error) {
        console.log('Error message:', error);
        res.status(500).json({ status: 'Failed', error: error.message });
    }
}

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
