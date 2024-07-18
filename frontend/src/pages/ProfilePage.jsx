import { useState, useEffect } from "react";
import { useOutletContext, Navigate } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import { getPosts } from "../utils/api/post_api";
import ProfileImage from "../components/profileComponents/ProfileImage";
import PostListingLinks from "../components/profileComponents/PostListingLinks";
import LogoutButton from "../components/authentication/LogoutButton";
import ProfilePostListing from "../components/profileComponents/ProfilePostListing";
import ProfilePostOptions from "../components/profileComponents/ProfilePostOptions";

const ProfilePage = () => {
    const [activeLink, setActiveLink] = useState('Posts');
    const [showOptions, setShowOptions] = useState(false);

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

    const filterPost = () => {
        if (activeLink === 'Blog') {
            return posts.filter(post => post.content_type === 'Blog')
        } else if (activeLink === 'Media') {
            return posts.filter(post => post.content_type === 'Image')
        }
        return posts
    }

    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <ProfileImage />
            <LogoutButton navigate={navigate} />
            <PostListingLinks setActiveLink={setActiveLink} />
            <hr className="my-5" />
            <ProfilePostListing posts={filterPost()} setShowOptions={setShowOptions} />
            {
                showOptions && <ProfilePostOptions setShowOptions={setShowOptions} />
            }
        </div>
    )
}

export default ProfilePage