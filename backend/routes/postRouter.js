import express from 'express'
const router = express.Router()
import verifyUser from '../middlewares/authMiddleware.js'
import {
    createPost,
    fetchPosts,
    deletePost,
} from '../controllers/postController.js'

// authorization will be applied all the routes below this line
router.use(verifyUser)

router.post('/create', createPost)
router.get('/get-posts', fetchPosts)
router.delete('/delete-post', deletePost)

export default router;