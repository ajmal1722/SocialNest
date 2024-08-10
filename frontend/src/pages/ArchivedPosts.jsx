import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import NavigationButton from '../components/reusable/NavigationButton';
import { fetchArchivedPostsApi } from "../utils/api/post_api";
import SingleBlogCard from '../components/archiveComponents/SingleBlogCard';
import SinglePostCard from '../components/archiveComponents/SinglePostCard';

const ArchivedPosts = () => {
    const [activeLink, setActiveLink] = useState('Blogs');
    const [archivedPosts, setArchivedPosts] = useState([]);

    const fetchArchivedPosts = async (activeLink) => {
        try {
            const response = await fetchArchivedPostsApi();
            const filteredPosts = response.filter(post => 
                activeLink === 'Blogs' ? post.content_type === 'Blog' : post.content_type === 'Image'
            );
            setArchivedPosts(filteredPosts);
        } catch (error) {
            console.error('Error fetching archived posts:', error);
        }
    };

    useEffect(() => {
        fetchArchivedPosts(activeLink);
    }, [activeLink]);

    return (
        <div className='min-h-[90vh] md:col-span-8 col-span-10 px-4 lg:px-8 mt-4 mb-16 md:mb-1'>
            <NavigationButton
                navOptions={['Blogs', 'Images']}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
            />
            <Row gutter={16} className='mt-12'>
                {archivedPosts.map((post) => (
                    activeLink === 'Blogs' ? 
                    <SingleBlogCard key={post._id} post={post} /> : 
                    <SinglePostCard key={post._id} post={post} />
                ))}
            </Row>
        </div>
    );
}

export default ArchivedPosts;