import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Col } from 'antd';
import { SlOptions } from "react-icons/sl";
import { deletePost } from '../../utils/api/post_api';
import { delete_post } from '../../redux/slices/postSlice';
import ProfilePostOptions from '../profileComponents/ProfilePostOptions';
import ArchivedPostOptionContent from './ArchivedPostOptionContent';

const SingleBlogCard = ({ post, setArchivedPosts }) => {
    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = useState(false);

    const handleDelete = async () => {
        try {
            await deletePost(post._id);
            dispatch(delete_post(post._id));
            setShowOptions(false);
            setArchivedPosts(prevPost => prevPost.filter(archivedPost => archivedPost._id !== post._id))
        } catch (error) {
            console.log('Error deleting post:', deletePost);
        }
    }

    return (
        <Col
            xs={24}  
            sm={12}  
            md={12}   
            lg={8}   
            className='my-3'
        >
            <Card
                title={<span className="dark:text-white font-bold">{post.caption}</span>}
                bordered={false}
                extra={<SlOptions className='cursor-pointer dark:text-white' onClick={() => setShowOptions(true)} />}
                className='min-h-80 lg:min-h-64 bg-white shadow-2xl dark:bg-secondary-dark text-primary-dark dark:text-primary-light hover:scale-105'
            >
                {post.blogContent}
            </Card>
            {showOptions && 
            <ProfilePostOptions 
                content={<ArchivedPostOptionContent post={post} setShowOptions={setShowOptions} setArchivedPosts={setArchivedPosts} />}
                setShowOptions={setShowOptions}
                handleDelete={handleDelete}
            />}
        </Col>
    );
}

export default SingleBlogCard;