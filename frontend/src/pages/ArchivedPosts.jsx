import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import NavigationButton from '../components/reusable/NavigationButton';
import { fetchArchivedPostsApi } from "../utils/api/post_api";
import SingleBlogCard from '../components/archiveComponents/SingleBlogCard';

const ArchivedPosts = () => {
    const [activeLink, setActiveLink] = useState('Blogs');
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
            <NavigationButton
                navOptions={['Blogs', 'Images']}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
            />
            <Row gutter={16} className='mt-12'>
                {archivedPosts.map((post) => (
                    <SingleBlogCard key={post._id} post={post} />
                ))}
            </Row>
        </div>
    );
}

export default ArchivedPosts;