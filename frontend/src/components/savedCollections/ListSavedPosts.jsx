import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSavedPostsApi } from "../../utils/api/post_api";
import SinglePost from '../reusable/SinglePost'

const ListSavedPosts = () => {
    const { id } = useParams();
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        const fetchSavedPosts = async () => {
            try {
                const response = await fetchSavedPostsApi(id);
                console.log('response in fron end:', response.savedPosts);
                setSavedPosts(response.savedPosts);
            } catch (error) {
                console.log('Error fetching saved posts:', error);
            }
        }

        fetchSavedPosts()
    }, [])
    
    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            {savedPosts.length > 0 ? 
            savedPosts.map(post => (
                <SinglePost key={post._id} post={post.post} initialUser={post.user} />
            )) : 
            'no Posts saved yet'}
        </div>
    )
}

export default ListSavedPosts
