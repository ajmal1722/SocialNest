import express from 'express';
const router = express.Router();
import verifyAccessToken from '../middlewares/authMiddleware.js';
import {
    userSignup, 
    userLogin,  
    protectedRoute,
    userLogout,
    googleAuthLogin,
    generateOtp,
} from '../controllers/userAuthController.js';

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/logout', userLogout);

// Google login authentication
router.post('/google-auth-login', googleAuthLogin)

// forget password
router.post('/generate-otp', generateOtp)

// Apply middleware to all routes below this line
router.use(verifyAccessToken);

// Protected Routes
router.get('/is-protected', protectedRoute);

export default router;