import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { set_posts } from "../redux/slices/postSlice";
import { set_credentials } from '../redux/slices/authSlice';
import { getPosts } from "../utils/api/post_api";
import ProfileImage from "../components/profileComponents/ProfileImage";
import ProfileInfo from "../components/profileComponents/ProfileInfo";
import NavigationButton from "../components/reusable/NavigationButton";
import ProfilePostListing from "../components/profileComponents/ProfilePostListing";

const ProfilePage = ({ initialPosts = [], initialUser = null }) => {
    const [activeLink, setActiveLink] = useState('Posts');
    const [singleUserProfileData, setSingleUserProfileData] = useState(initialUser);
    const [profilePosts, setProfilePosts] = useState(initialPosts);
    const posts = useSelector((state) => state.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!initialUser) {
                    const result = await getPosts();
                    dispatch(set_posts(result.posts));
                    dispatch(set_credentials(result.user));
                    setSingleUserProfileData(result.user);
                    setProfilePosts(result.posts);
                }
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };

        fetchUserData();
    }, []);

    const filterPost = () => {
        const filteredPosts = initialUser ? profilePosts : posts;
        if (activeLink === 'Blogs') {
            return filteredPosts.filter(post => post.content_type === 'Blog');
        } else if (activeLink === 'Medias') {
            return filteredPosts.filter(post => post.content_type === 'Image');
        }
        return filteredPosts;
    };

    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <ToastContainer />
            <div className='md:flex gap-10 lg:gap-20 md:mx-10 sm:mx-5 mx-2 '>
                <ProfileImage initialUser={initialUser} />
                <ProfileInfo profileData={singleUserProfileData} posts={initialUser ? initialPosts : posts} />
            </div>
            <NavigationButton
                navOptions={['Posts', 'Blogs', 'Medias']}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
            />
            <hr className="my-5 dark:border-gray-500" />
            <ProfilePostListing posts={filterPost()} initialUser={singleUserProfileData} />
        </div>
    );
}

export default ProfilePage;