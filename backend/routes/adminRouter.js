import express from 'express';
const router = express.Router();
import {
    adminLogin,
} from '../controllers/admincontroller.js';

// router.post('/signup', adminSignup);
router.post('/login', adminLogin);

export default router