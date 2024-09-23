import express from 'express';
const router = express.Router();
import verifyUser from '../middlewares/authMiddleware.js';
import {
    getMessage,
    sendMessage,
} from '../controllers/messageController.js';

router.get('/:id', verifyUser, getMessage);
router.post('/send/:id', verifyUser, sendMessage);

export default router;