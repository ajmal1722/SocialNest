import express from 'express';
const router = express.Router();
import verifyAccessToken from '../middlewares/authMiddleware.js';
import {
    userSignup, 
    userLogin,  
    protectedRoute,
    userLogout,
    generateOtp,
    changePassword,
    singleUserDetails
} from '../controllers/userAuthController.js';

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/logout', userLogout);

// Google login authentication
// router.post('/google-auth-login', googleAuthLogin)

// forget password
router.post('/generate-otp', generateOtp);
router.post('/change-password', changePassword)

// Apply middleware to all routes below this line
router.use(verifyAccessToken);

// Protected Routes
router.get('/is-protected', protectedRoute);

router.get('/:id/', singleUserDetails);

export default router;