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
router.get('/fetch-followers/:id', fetchFollowers);

/**
 * @swagger
 * /fetch-following/{id}:
 *   get:
 *     summary: Fetch the users a specific user is following
 *     description: Retrieves the list of users that the specified user is following by their user ID. The response includes basic details such as username, name, and profile picture.
 *     tags:
 *       - Following
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose following list you want to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users the specified user is following.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     description: The username of the user being followed.
 *                     example: johndoe
 *                   name:
 *                     type: string
 *                     description: The name of the user being followed.
 *                     example: John Doe
 *                   profilePicture:
 *                     type: string
 *                     description: URL to the profile picture of the user being followed.
 *                     example: https://example.com/profile-pic.jpg
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching the following list.
 */
router.get('/fetch-following/:id', fetchFollowing);

/**
 * @swagger
 * /follow-user/{id}:
 *   post:
 *     summary: Follow a user
 *     description: Allows the authenticated user to follow another user by their user ID.
 *     tags:
 *       - Following
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to be followed.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User followed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User followed successfully
 *                 id:
 *                   type: string
 *                   description: The ID of the user who was followed.
 *                   example: 60d21b4667d0d8992e610c85
 *       400:
 *         description: User is already following the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are already following this user
 *       404:
 *         description: User to be followed not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while following the user
 */
router.post('/follow-user/:id', followUser);

/**
 * @swagger
 * /unfollow-user/{id}:
 *   post:
 *     summary: Unfollow a user
 *     description: Allows the authenticated user to unfollow another user by their user ID.
 *     tags:
 *       - Following
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to be unfollowed.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User unfollowed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User unfollowed successfully
 *                 id:
 *                   type: string
 *                   description: The ID of the user who was unfollowed.
 *                   example: 60d21b4667d0d8992e610c85
 *       400:
 *         description: User is not following the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not following this user
 *       404:
 *         description: User to be unfollowed not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while unfollowing the user
 */
router.post('/unfollow-user/:id', unfollowUser);

export default router