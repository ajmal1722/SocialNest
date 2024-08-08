import React, { useEffect, useState } from 'react';
import { fetchArchivedPostsApi } from "../utils/api/post_api";

const ArchivedPosts = () => {
    const [archivedPosts, setArchivedPosts] = useState([]);

    const fetchArchivedPosts = async () => {
        try {
            const response = await fetchArchivedPostsApi();
            setArchivedPosts(response);
            console.log('arch posts:', response);
            
        } catch (error) {
            console.error('Error fetching archived posts:', error);
        }
    };

    useEffect(() => {
        fetchArchivedPosts();
    }, []);
    console.log('archivedPosts:', archivedPosts);
    

    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <div className="flex flex-wrap justify-center gap-6">
                {archivedPosts.map((post, index) => (
                    <div key={index} className='bg-gray-50 min-h-96 min-w-60 w-2/12'>
                        {/* Replace with your post content */}
                        <h2>{post.caption}</h2>
                        <p>{post.blogContent}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArchivedPosts;