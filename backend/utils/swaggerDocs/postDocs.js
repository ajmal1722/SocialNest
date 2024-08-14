/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               contentType:
 *                 type: string
 *                 description: Type of content (e.g., Image, Blog)
 *                 example: Image
 *               caption:
 *                 type: string
 *                 description: Caption for the post
 *                 example: "This is a caption"
 *               blogContent:
 *                 type: string
 *                 description: Content of the blog post
 *                 example: "This is the content of the blog post"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for image posts
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /get-posts:
 *   get:
 *     summary: Fetch posts of the authenticated user
 *     tags:
 *       - Posts
 *     security:
 *       - BearerAuth: []  // Indicates that this endpoint requires authentication
 *     responses:
 *       200:
 *         description: Successfully fetched posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                     username:
 *                       type: string
 *                       description: User's username
 *                     email:
 *                       type: string
 *                       description: User's email
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Post ID
 *                       author_id:
 *                         type: string
 *                         description: Author's user ID
 *                       caption:
 *                         type: string
 *                         description: Caption of the post
 *                       image_url:
 *                         type: string
 *                         description: URL of the image (for image posts)
 *                       blogContent:
 *                         type: string
 *                         description: Content of the blog (for blog posts)
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the post was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the post was last updated
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *     components:
 *       securitySchemes:
 *         BearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /fetch-post-data/{id}:
 *   get:
 *     summary: Fetch a specific post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the post to fetch
 *     responses:
 *       200:
 *         description: Successfully fetched the post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 post:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Post ID
 *                     author_id:
 *                       type: string
 *                       description: Author's user ID
 *                     caption:
 *                       type: string
 *                       description: Caption of the post
 *                     image_url:
 *                       type: string
 *                       description: URL of the image (for image posts)
 *                     blogContent:
 *                       type: string
 *                       description: Content of the blog (for blog posts)
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date when the post was created
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date when the post was last updated
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 error:
 *                   type: string
 *                   example: Post not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 error:
 *                   type: string
 */