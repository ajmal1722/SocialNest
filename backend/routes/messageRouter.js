import express from 'express';
const router = express.Router();
import verifyUser from '../middlewares/authMiddleware.js';
import {
    fetchConversations,
    searchUsers,
    getMessage,
    sendMessage,
    getUnreadMessageCount,
    markMessagesAsRead,
    getUnreadMessageCountPerConversation,
} from '../controllers/messageController.js';

router.get('/users', verifyUser, fetchConversations);
router.get('/search', verifyUser, searchUsers)
router.get('/get-unread-count', verifyUser, getUnreadMessageCount);
router.get('/get-unread-count-per-conversation', verifyUser, getUnreadMessageCountPerConversation);

router.get('/:id', verifyUser, getMessage);
router.get('/mark-as-read/:id', verifyUser, markMessagesAsRead);
router.post('/send/:id', verifyUser, sendMessage);

export default router;