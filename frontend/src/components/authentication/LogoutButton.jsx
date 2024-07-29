import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/api/user_api"

const LogoutButton = () => {
    const navigate = useNavigate();
    return (
        <button onClick={() => handleLogout(navigate)} className="bg-secondary-light text-white px-4 p-2 rounded flex gap-2 items-center">
            <FaPowerOff />
            Logout
        </button>
    )
}

export default LogoutButton
