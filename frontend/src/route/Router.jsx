import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layoutes/MainLayout";
import HomePage from "../pages/HomePage";
import UserLogin from "../pages/UserLogin";
import UserSignUp from "../pages/UserSignUp";
import ProfilePage from "../pages/ProfilePage";
import SingleUserProfileLoader from "../pages/SingleUserProfileLoader";
import UserAuth from "../utils/auth/UserAuth";
import CreatePostPage from "../pages/CreatePostPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import NotificationPage from "../pages/NotificationPage";
import EditPostLoader from "../pages/EditPostLoader";
import ArchivedPosts from "../pages/ArchivedPosts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                element: <UserAuth />, 
                children: [
                    {
                        path: '/',
                        element: <HomePage />,
                        index: true,
                    },
                    {
                        path: '/notifications',
                        element: <NotificationPage />
                    },
                    {
                        path: '/profile',
                        element: <ProfilePage />
                    },
                    {
                        path: '/user/:id',
                        element: <SingleUserProfileLoader />
                    },
                    {
                        path: '/create-post',
                        element: <CreatePostPage />
                    },
                    {
                        path: '/edit-post/:id',
                        element: <EditPostLoader />
                    },
                    {
                        path: '/archive',
                        element: <ArchivedPosts />
                    },
                ]
            }
        ]
    },
    {
        path: '/user/login',
        element: <UserLogin />
    },
    {
        path: '/user/signup',
        element: <UserSignUp />
    },
    {
        path: '/user/forget-password',
        element: <ForgotPasswordPage />
    },
]);

export default router