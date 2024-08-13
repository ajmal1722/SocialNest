import { useState } from 'react';
import { Card, Col } from 'antd';
const { Meta } = Card;
import { SlOptions } from 'react-icons/sl';
import ProfilePostOptions from '../profileComponents/ProfilePostOptions';
import ArchivedPostOptionContent from './ArchivedPostOptionContent';

const SinglePostCard = ({ post, setArchivedPosts }) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <Col span={8}>
            <Card
                hoverable
                cover={<img alt="example" src={post.image_url} />}
                className='hover:scale-105 transition-transform duration-500'
            >
                <Meta
                    title={
                        <div className="flex justify-between items-center">
                            <span>{post.caption}</span>
                            <SlOptions
                                className="cursor-pointer"
                                onClick={() => setShowOptions(true)}
                            />
                        </div>
                    }
                />
            </Card>
            {showOptions && 
            <ProfilePostOptions 
                content={<ArchivedPostOptionContent post={post} setShowOptions={setShowOptions} setArchivedPosts={setArchivedPosts} />}
                setShowOptions={setShowOptions}
            />}
        </Col>
    );
};

export default SinglePostCard;