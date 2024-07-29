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

// Swagger Documentations

/**
 * @swagger
 * /follow/fetch-suggestions:
 *   get:
 *     summary: Fetch user suggestions
 *     description: Fetch a list of user suggestions for the current user to follow.
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user suggestions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: '60c72b2f9b1d8e001c8e4c8d'
 *                       username:
 *                         type: string
 *                         example: 'john_doe'
 *                       name:
 *                         type: string
 *                         example: 'John Doe'
 *                       email:
 *                         type: string
 *                         example: 'john.doe@example.com'
 *                       profilePicture:
 *                         type: string
 *                         example: 'http://example.com/profile.jpg'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal server error'
 */
router.get('/fetch-suggestions', fetchSuggestions);

/**
 * @swagger
 * /follow/fetch-followers:
 *   get:
 *     summary: Fetch followers of the current user
 *     description: Retrieve a list of followers for the current user.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of followers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: '60c72b2f9b1d8e001c8e4c8d'
 *                   username:
 *                     type: string
 *                     example: 'john_doe'
 *                   name:
 *                     type: string
 *                     example: 'John Doe'
 *                   profilePicture:
 *                     type: string
 *                     example: 'http://example.com/profile.jpg'
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'User not found'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Internal server error'
 */
router.get('/fetch-followers', fetchFollowers);
router.get('/fetch-following', fetchFollowing);
router.post('/follow-user/:id', followUser);
router.post('/unfollow-user/:id', unfollowUser);

export default router