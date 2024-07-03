import { useOutletContext, Navigate, Outlet } from "react-router-dom";

const UserAuth = () => {
    const context = useOutletContext();

    if (!context.user) {
        return <Navigate to='/user/login' replace />;
    }

    return < Outlet context={context} />;
};

export default UserAuth;