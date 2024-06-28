import express from 'express';
const router = express.Router();
import { userSignup, userLogin } from '../controllers/userAuthController.js';

router.post('/signup', userSignup);
router.post('/login', userLogin);

export default router;