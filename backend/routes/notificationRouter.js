import express from "express";
const router = express.Router();
import verifyUser from "../middlewares/authMiddleware.js";
import {
    fetchNotifications,
} from "../controllers/notificationController.js";

// Authorization middleware
router.use(verifyUser);

router.get('/', fetchNotifications);

export default router;