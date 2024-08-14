import { useState, useEffect } from "react";
import { getHomePagePostsApi } from "../utils/api/post_api";
import SinglePost from '../components/reusable/SinglePost';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getHomePagePostsApi();
                if (response) {
                    setPosts(response);
                }
            } catch (error) {
                console.log('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className='min-h-[70vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            {loading ? (
                <h1 className='flex justify-center items-center h-full'>Loading...</h1>
            ) : (
                posts.length > 0 ? (
                    posts.map((post) => (
                        <SinglePost key={post._id} post={post} />
                    ))
                ) : (
                    <h1 className='flex justify-center items-center h-full'>No posts available</h1>
                )
            )}
        </div>
    );
};

export default HomePage;