import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layoutes/MainLayout";
import HomePage from "../pages/HomePage";
import UserLogin from "../pages/UserLogin";
import UserSignUp from "../pages/UserSignUp";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import SingleUserProfileLoader from "../pages/SingleUserProfileLoader";
import UserAuth from "../utils/auth/UserAuth";
import CreatePostPage from "../pages/CreatePostPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import NotificationPage from "../pages/NotificationPage";
import EditPostLoader from "../pages/EditPostLoader";
import ArchivedPosts from "../pages/ArchivedPosts";
import SavedPostPage from "../pages/SavedPostPage";
import ListSavedPosts from "../components/savedCollections/ListSavedPosts";
import SearchUserPage from "../pages/SearchUserPage";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminLayout from "../admin/Layout/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminAuth from "../utils/auth/AdminAuth";

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
                        path: '/search-user',
                        element: <SearchUserPage />,
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
                        path: '/edit-profile',
                        element: <EditProfilePage />
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
                    {
                        path: '/saved-posts',
                        element: <SavedPostPage />
                    },
                    {
                        path: '/saved-posts/:id',
                        element: <ListSavedPosts />
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
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                element: <AdminAuth />,
                children: [
                    {
                        index: true,
                        element: <AdminDashboard />
                    }
                ]
            }
        ]
    },
    {
        path: '/admin/login',
        element: <AdminLogin />
    }
]);

export default router