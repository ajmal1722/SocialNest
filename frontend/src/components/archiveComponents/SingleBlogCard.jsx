import { useState } from 'react';
import { Card, Col } from 'antd';
import { SlOptions } from "react-icons/sl";
import ProfilePostOptions from '../profileComponents/ProfilePostOptions';
import ArchivedPostOptionContent from './ArchivedPostOptionContent';

const SingleBlogCard = ({ post, setArchivedPosts }) => {
    const [showOptions, setShowOptions] = useState(false);

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
            />}
        </Col>
    );
}

export default SingleBlogCard;