import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import instance from "../../axios_instaces/userInstance";

const UserAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        // Function to check authentication status
        const checkAuth = async () => {
            try {
                // Send request to verify authentication
                await instance.get('/is-protected', { withCredentials: true });
                // console.log(res);
                setIsAuthenticated(true); // If request succeeds, user is authenticated
            } catch (error) {
                console.log('Error during authentication check:', error);
                setIsAuthenticated(false); // If request fails, user is not authenticated
            }
        };

        checkAuth();
    }, []);

    // Render loading indicator while authentication status is being determined
    if (isAuthenticated === null) {
        return <div className='min-h-[90vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1 flex justify-center items-center'>
            Loading...
        </div>; 
    }

    // If authenticated, render the Outlet for nested routes
    if (isAuthenticated) {
        console.log('User is authenticated');
        return <Outlet />;
    } else {
        // If not authenticated, redirect to login page
        console.log('Not authenticated');
        return <Navigate to='/user/login' replace />;
    }
};

export default UserAuth;