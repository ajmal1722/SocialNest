import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from "react-toastify";
import { set_posts } from "../redux/slices/postSlice";
import { set_credentials } from '../redux/slices/authSlice';
import { getPosts } from "../utils/api/post_api";
import ProfileImage from "../components/profileComponents/ProfileImage";
import ProfileInfo from "../components/profileComponents/ProfileInfo";
import NavigationButton from "../components/reusable/NavigationButton";
import ProfilePostListing from "../components/profileComponents/ProfilePostListing";

const ProfilePage = () => {
    const { id } = useParams();
    const [activeLink, setActiveLink] = useState('Posts');
    const posts = useSelector((state) => state.posts);

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                
                const result = await getPosts();
                console.log('results:', result);
                dispatch(set_posts(result.posts));
                dispatch(set_credentials(result.user));
            } catch (error) {
                console.log('Error fetching posts,', error);
            }
        }
        fetchUserData()
    }, [])

    const filterPost = () => {
        if (activeLink === 'Blogs') {
            return posts.filter(post => post.content_type === 'Blog')
        } else if (activeLink === 'Medias') {
            return posts.filter(post => post.content_type === 'Image')
        }
        return posts
    }

    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <ToastContainer />
            <div className='md:flex gap-20 md:mx-10 sm:mx-5 mx-2 '>
                <ProfileImage />
                <ProfileInfo />
            </div>
            <NavigationButton
                navOptions={['Posts', 'Blogs', 'Medias']}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
            />
            <hr className="my-5 dark:border-gray-500" />
            <ProfilePostListing posts={filterPost()} />
        </div>
    )
}

export default ProfilePage