import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../utils/api/post_api";
import { getHomePagePostsApi } from "../utils/api/post_api";
import { set_posts } from '../redux/slices/postSlice';
import { set_credentials } from '../redux/slices/authSlice';
import SinglePost from '../components/reusable/SinglePost';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const initialRender = useRef(true); // To track the initial render

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true); 
            try {
                const result = await getPosts()
                const response = await getHomePagePostsApi(page);
                dispatch(set_credentials(result.user))
                if (response && response.length > 0) {
                    setPosts((prevPosts) => [...prevPosts, ...response]); // Append new posts to existing posts
                } else {
                    setHasMore(false); // No more posts available
                }
            } catch (error) {
                console.log('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        // Guard against initial double-fetch
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            fetchPosts();
        }
    }, [page]);

    const handleScroll = () => {
        if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight - 10) {
            if (!loading && hasMore) { 
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    return (
        <div className='min-h-[70vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <SinglePost 
                        key={post._id} 
                        post={post} 
                        setPosts={setPosts}
                        initialUser={post.author_details} 
                    />
                ))
            ) : (
                !loading && <h1 className='flex justify-center items-center h-full'>No posts available</h1>
            )}
            {loading && <h1 className='flex justify-center items-center'>Loading...</h1>}
        </div>
    );
};

export default HomePage;