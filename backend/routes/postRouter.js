import express from 'express'
const router = express.Router()
import upload from '../utils/multer.js'
import verifyUser from '../middlewares/authMiddleware.js';
import {
    getHomePagePosts,
    createPost,
    fetchPosts,
    deletePost,
    archivePost,
    likeOrUnlikePost,
    fetchArchivedPosts,
    addComment,
    fetchComments,
    fetchPostById,
    updatePost,
    checkIsSaved,
    toggleSavePost,
    getCollections,
    getSavedPosts,
} from '../controllers/postController.js'

// authorization will be applied all the routes below this line
router.use(verifyUser)

router.get('/all-posts', getHomePagePosts);
router.post('/create', upload.single('image'), createPost)
router.get('/get-posts', fetchPosts);
router.get('/fetch-post-data/:id', fetchPostById);
router.put('/update-post/:id', updatePost);
router.delete('/delete-post/:id', deletePost)
router.post('/archive-post/:id', archivePost);
router.get('/fetch-archived-posts', fetchArchivedPosts);
router.post('/like/:id', likeOrUnlikePost);
router.get('/fetch-comments/:id', fetchComments);
router.post('/add-comment', addComment);

// Saved posts

router.post('/save-post', toggleSavePost);
router.get('/is-saved/:id', checkIsSaved);
router.get('/fetch-collections', getCollections);
router.get('/fetch-saved-posts/:id', getSavedPosts)

export default router;