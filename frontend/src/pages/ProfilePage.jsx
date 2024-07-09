import { useOutletContext, Navigate } from "react-router-dom";
import GoogleOAuth from "../components/authentication/GoogleOAuth";
import LogoutButton from "../components/authentication/LogoutButton";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {

    const context = useOutletContext()
    const navigate = useNavigate()

    // if (!context.user){
    //     return <Navigate to='/' replace />
    // }

    return (
        <div className='text-pink-500 text-center'>
        this is profile page
        <GoogleOAuth/>
        <LogoutButton navigate={navigate} />
        </div>
    )
}

export default ProfilePage
