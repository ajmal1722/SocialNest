import { handleLogout } from "../../utils/api/user_api"

const LogoutButton = ({ navigate}) => {
    return (
        <button onClick={() => handleLogout(navigate)} className="bg-red-500 text-white p-2 rounded">
            Logout
        </button>
    )
}

export default LogoutButton
