import { useOutletContext, Navigate } from "react-router-dom";


const ProfilePage = () => {

    const context = useOutletContext()

    if (!context.user){
        return <Navigate to='/' replace />
    }
    return (
        <div className='text-pink-500 text-center'>
        this is profile page
        </div>
    )
}

export default ProfilePage
