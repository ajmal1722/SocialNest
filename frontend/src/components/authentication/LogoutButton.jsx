import { useDispatch } from "react-redux";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/api/user_api";
import { set_credentials } from '../../redux/slices/authSlice';

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = async () => {
        try {
            await handleLogout(navigate);
            dispatch(set_credentials(null));  // Clear user credentials from Redux state
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <button onClick={logOut} className="bg-secondary-light text-white px-4 p-2 rounded flex gap-2 items-center">
            <FaPowerOff />
            Logout
        </button>
    );
}

export default LogoutButton;