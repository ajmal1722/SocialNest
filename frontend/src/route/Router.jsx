import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layoutes/MainLayout";
import HomePage from "../pages/HomePage";
import UserLogin from "../pages/UserLogin";
import UserSignUp from "../pages/UserSignUp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
                index: true,
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
])

export default router