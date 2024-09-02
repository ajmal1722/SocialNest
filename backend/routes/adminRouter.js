import express from 'express';
const router = express.Router();
import verifyAdminAccessToken from '../middlewares/isAdminMiddleware.js';
import {
    adminLogin,
    isAdminProtected,
    fetchReportPost,
} from '../controllers/admincontroller.js';

// router.post('/signup', adminSignup);
router.post('/login', adminLogin);

// This middleware will be applied to all the route below this middleware
router.use(verifyAdminAccessToken);
router.get('/is-admin-protected', isAdminProtected);
router.get('/reports', fetchReportPost)

export default router