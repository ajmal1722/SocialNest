import express from 'express';
const router = express.Router();
import verifyUser from '../middlewares/authMiddleware.js'
import {
    fetchFollowers,
    fetchFollowing,
    fetchSuggestions,
    followUser,
    unfollowUser,
} from '../controllers/followers.js';

// authorization will be applied all the routes below this line
router.use(verifyUser)

router.get('/fetch-suggestions', fetchSuggestions);
router.get('/get-followers', fetchFollowers);
router.get('/get-following', fetchFollowing);
router.post('/follow-user/:id', followUser);
router.post('/unfollow-user/:id', unfollowUser);

export default router