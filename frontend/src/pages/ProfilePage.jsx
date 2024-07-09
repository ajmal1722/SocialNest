import { useOutletContext, Navigate } from "react-router-dom";
import GoogleOAuth from "../components/authentication/GoogleOAuth";


const ProfilePage = () => {

    const context = useOutletContext()

    // if (!context.user){
    //     return <Navigate to='/' replace />
    // }

    return (
        <div className='text-pink-500 text-center'>
        this is profile page
        <GoogleOAuth/>
        </div>
    )
}

export default ProfilePage
