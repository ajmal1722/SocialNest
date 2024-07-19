import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { set_posts } from "../redux/slices/postSlice";
import { getPosts } from "../utils/api/post_api";
import ProfileImage from "../components/profileComponents/ProfileImage";
import PostListingLinks from "../components/profileComponents/PostListingLinks";
import LogoutButton from "../components/authentication/LogoutButton";
import ProfilePostListing from "../components/profileComponents/ProfilePostListing";

const ProfilePage = () => {
    const [activeLink, setActiveLink] = useState('Posts');
    const posts = useSelector((state) => state.posts)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await getPosts();
                dispatch(set_posts(result));
    console.log('post from redux:', postFromRedux);
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
            <ToastContainer />
            <ProfileImage />
            <LogoutButton navigate={navigate} />
            <PostListingLinks setActiveLink={setActiveLink} />
            <hr className="my-5 dark:border-gray-500" />
            <ProfilePostListing posts={filterPost()} />
        </div>
    )
}

export default ProfilePage