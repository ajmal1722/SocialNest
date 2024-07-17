import { useState, useEffect } from "react";
import { useOutletContext, Navigate } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import { getPosts } from "../utils/api/post_api";
import ProfileImage from "../components/profileComponents/ProfileImage";
import PostListingLinks from "../components/profileComponents/PostListingLinks";
import LogoutButton from "../components/authentication/LogoutButton";
import ProfilePostListing from "../components/profileComponents/ProfilePostListing";

const ProfilePage = () => {
    const [activeLink, setActiveLink] = useState('Posts')
    const [posts, setPosts] = useState([])

    const context = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await getPosts();
                setPosts(result);
            } catch (error) {
                console.log('Error fetching posts,', error);
            }
        }
        fetchPosts()
    }, [])

    // if (!context.user){
    //     return <Navigate to='/' replace />
    // }

    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10 text-center px-4 lg:px-8'>
            <ProfileImage />
            <LogoutButton navigate={navigate} />
            <PostListingLinks setActiveLink={setActiveLink} />
            <hr className="my-5" />
            {
                activeLink === 'Post' ? (
                    'posts'
                ) : activeLink === 'Blog' ? (
                    'blogs'
                ) : activeLink === 'Media' ? (
                    'media'
                ) : null
            }
            <ProfilePostListing posts={posts} />
        </div>
    )
}

export default ProfilePage