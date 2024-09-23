import express from 'express';
const router = express.Router();
import verifyUser from '../middlewares/authMiddleware.js';
import {
    fetchUsers,
    getMessage,
    sendMessage,
} from '../controllers/messageController.js';

router.get('/users', verifyUser, fetchUsers);
router.get('/:id', verifyUser, getMessage);
router.post('/send/:id', verifyUser, sendMessage);

export default router;