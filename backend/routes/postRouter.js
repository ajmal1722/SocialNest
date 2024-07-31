import express from 'express'
const router = express.Router()
import upload from '../utils/multer.js'
import verifyUser from '../middlewares/authMiddleware.js'
import {
    createPost,
    fetchPosts,
    deletePost,
    archivePost,
} from '../controllers/postController.js'

// authorization will be applied all the routes below this line
router.use(verifyUser)

router.post('/create',upload.single('image'), createPost)
router.get('/get-posts', fetchPosts)
router.delete('/delete-post/:id', deletePost)
router.post('/archive-post/:id', archivePost);

export default router;