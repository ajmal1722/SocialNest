import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import cookies from 'js-cookie'; 
import instance from "../../axios_instaces/userInstance";

const UserAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // useEffect(() => {
    //     const accessToken = cookies.get('accessToken');
    //     const refreshToken = cookies.get('refreshToken');

    //     const verifyAndRefreshTokens = async () => {
    //         console.log('Access Token:', accessToken);
    //         console.log('Refresh Token:', refreshToken);

    //         if (accessToken) {
    //             setIsAuthenticated(true);
    //         } else if (refreshToken) {
    //             try {
    //                 const response = await instance.post('/generate-access-token', { refreshToken });
    //                 console.log('Response:', response);
    //                 cookies.set('accessToken', response.data.accessToken, { httpOnly: true });
    //                 setIsAuthenticated(true);
    //             } catch (error) {
    //                 console.error('Token refresh error:', error);
    //                 setIsAuthenticated(false);
    //             }
    //         } else {
    //             setIsAuthenticated(false);
    //         }
    //     };

    //     verifyAndRefreshTokens();
    // }, []);

    // if (isAuthenticated === null) {
    //     return <div>Loading...</div>; // or a spinner
    // }

    // if (isAuthenticated) {
    //     return <Outlet />;
    // } else {
    //     return <Navigate to='/user/login' replace />;
    // }
};

export default UserAuth;