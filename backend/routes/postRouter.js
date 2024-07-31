import express from 'express'
const router = express.Router()
import upload from '../utils/multer.js'
import verifyUser from '../middlewares/authMiddleware.js'
import {
    createPost,
    fetchPosts,
    deletePost,
    archivePost,
    likeOrUnlikePost,
} from '../controllers/postController.js'

// authorization will be applied all the routes below this line
router.use(verifyUser)

router.post('/create',upload.single('image'), createPost)
router.get('/get-posts', fetchPosts)
router.delete('/delete-post/:id', deletePost)
router.post('/archive-post/:id', archivePost);
router.post('/like/:id', likeOrUnlikePost);

export default router;