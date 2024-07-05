import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layoutes/MainLayout";
import HomePage from "../pages/HomePage";
import UserLogin from "../pages/UserLogin";
import UserSignUp from "../pages/UserSignUp";
import ProfilePage from "../pages/ProfilePage";
import UserAuth from "../utils/auth/UserAuth";

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
                        path: '/profile',
                        element: <ProfilePage />
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
    }
]);

export default router