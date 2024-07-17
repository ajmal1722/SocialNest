import { useState } from "react";
import { useOutletContext, Navigate } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import ProfileImage from "../components/profileComponents/ProfileImage";
import PostListingLinks from "../components/profileComponents/PostListingLinks";
import LogoutButton from "../components/authentication/LogoutButton";

const ProfilePage = () => {
    const [activeLink, setActiveLink] = useState('Post')

    const context = useOutletContext()
    const navigate = useNavigate()

    // if (!context.user){
    //     return <Navigate to='/' replace />
    // }

    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10  text-pink-500 text-center px-4 lg:px-8'>
            this is profile page
            <ProfileImage />
            <hr className="my-5" />
            <PostListingLinks setActiveLink={setActiveLink} />
            {
                activeLink === 'Post' ? 'post' : 'blog'
            }
            <LogoutButton navigate={navigate} />
        </div>
    )
}

export default ProfilePage