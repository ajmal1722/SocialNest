import express from 'express';
const router = express.Router();
import {
    userSignup, 
    userLogin, 
    generateAccessToken 
} from '../controllers/userAuthController.js';

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/generate-access-token', generateAccessToken);

export default router;