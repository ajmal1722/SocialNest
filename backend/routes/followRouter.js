import express from 'express';
const router = express.Router();
import verifyUser from '../middlewares/authMiddleware.js'
import {
    fetchSuggestions,
    followUser,
} from '../controllers/followers.js';

// authorization will be applied all the routes below this line
router.use(verifyUser)

router.get('/fetch-suggestions', fetchSuggestions);

export default router