import express from 'express';
const router = express.Router();
import verifyAccessToken from '../middlewares/authMiddleware.js';
import {
    userSignup, 
    userLogin,  
    protectedRoute,
    userLogout,
    googleAuthLogin
} from '../controllers/userAuthController.js';

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/logout', userLogout);
// router.post('/generate-access-token', generateAccessToken);

// Google login authentication
router.post('/google-auth-login', googleAuthLogin)

// Apply middleware to all routes below this line
router.use(verifyAccessToken);

// Protected Routes
router.get('/is-protected', protectedRoute);

export default router;