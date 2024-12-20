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

/**
 * @swagger
 * /post/update-post/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentType:
 *                 type: string
 *                 description: Type of content (e.g., Image, Blog)
 *                 example: Blog
 *               caption:
 *                 type: string
 *                 description: Caption for the post
 *                 example: "This is an updated caption"
 *               blogContent:
 *                 type: string
 *                 description: Content of the blog post (only for Blog content type)
 *                 example: "This is the updated content of the blog post"
 *     responses:
 *       200:
 *         description: Post updated successfully
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
 *       400:
 *         description: Invalid content type or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid content type
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
 *                 message:
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
 *                   example: Internal server error
 */

/**
 * @swagger
 * /post/delete-post/{id}:
 *   delete:
 *     summary: Soft delete a post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *                 deletedPost:
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
 *                     isDeleted:
 *                       type: boolean
 *                       description: Flag indicating if the post is deleted
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date when the post was created
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date when the post was last updated
 *       400:
 *         description: Post ID not provided or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Post not found
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                   example: Error message describing the issue
 */

/**
 * @swagger
 * /post/archive-post/{id}:
 *   post:
 *     summary: Archive or unarchive a post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the post to archive or unarchive
 *     responses:
 *       200:
 *         description: Post archived or unarchived successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post archived successfully
 *                 archivedPost:
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
 *                     isArchived:
 *                       type: boolean
 *                       description: Flag indicating if the post is archived
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date when the post was created
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date when the post was last updated
 *       400:
 *         description: Post ID not provided or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Post not found
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                   example: Error message describing the issue
 */
/**
 * @swagger
 * /like/{id}:
 *   post:
 *     summary: Like or Unlike a post
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the post to like or unlike
 *     responses:
 *       200:
 *         description: Post liked or unliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post liked successfully
 *                 post:
 *                   type: object
 *                   description: Updated post object
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                   example: Error message describing the issue
 */

/**
 * @swagger
 * /add-comment:
 *   post:
 *     summary: Add a comment to a post
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post to add a comment to
 *               comment:
 *                 type: string
 *                 description: The content of the comment
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 comments:
 *                   type: object
 *                   description: Added comment details
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
 *                   example: Error message describing the issue
 */

/**
 * @swagger
 * /fetch-comments/{id}:
 *   get:
 *     summary: Fetch comments for a specific post
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the post to fetch comments for
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Comment ID
 *                       user_id:
 *                         type: string
 *                         description: User ID of the commenter
 *                       content:
 *                         type: string
 *                         description: Content of the comment
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Comment creation date
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Comment last update date
 *                       user_details:
 *                         type: object
 *                         description: Details of the user who commented
 *                         properties:
 *                           _id:
 *                             type: string
 *                           username:
 *                             type: string
 *                           profilePicture:
 *                             type: string
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                   example: Error message describing the issue
 */
