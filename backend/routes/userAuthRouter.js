import express from 'express';
const router = express.Router();
import { userSignup, userLogin } from '../controllers/userAuthController.js';

router.post('/user/signup', userSignup);
router.post('/user/login', userLogin);

export default router;