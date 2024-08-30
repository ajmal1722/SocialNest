import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { checkAdminAuthenticatedApi } from "../api/admin_api"; // Make sure the import path is correct

const AdminAuth = () => {
    const [isAdminAuth, setIsAdminAuth] = useState(null);
    const [loading, setLoading] = useState(true); 
    console.log('Admin Auth component loaded..')

    useEffect(() => {
        const checkIsAdminAuthenticated = async () => {
            try {
                const response = await checkAdminAuthenticatedApi();
                if (response && response.isAuthenticated) {
                    setIsAdminAuth(true);
                } else {
                    setIsAdminAuth(false);
                }
            } catch (error) {
                console.error("Error checking admin authentication:", error);
                setIsAdminAuth(false);
            } finally {
                setLoading(false); // Set loading to false after check is complete
            }
        };

        checkIsAdminAuthenticated();
    }, []);

    // Render loading indicator while authentication status is being determined
    if (loading) {
        return <div>Loading...</div>;
    }

    // Navigate to the admin login page if not authenticated, otherwise render the children
    return isAdminAuth ? <Outlet /> : <Navigate to='/admin/login' replace />;
};

export default AdminAuth;