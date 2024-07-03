import { useOutletContext, Navigate } from "react-router-dom";

const UserAuth = ({ children }) => {
    const context = useOutletContext();

    if (!context.user) {
        return <Navigate to='/user/login' replace />;
    }

    return children;
};

export default UserAuth;
