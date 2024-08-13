import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Col } from 'antd';
const { Meta } = Card;
import { SlOptions } from 'react-icons/sl';
import { deletePost } from '../../utils/api/post_api';
import { delete_post } from '../../redux/slices/postSlice';
import ProfilePostOptions from '../profileComponents/ProfilePostOptions';
import ArchivedPostOptionContent from './ArchivedPostOptionContent';

const SinglePostCard = ({ post, setArchivedPosts }) => {
    const dispatch = useDispatch()
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
        <Col span={8}>
            <Card
                hoverable
                cover={<img alt="example" src={post.image_url} className='h-[350px] object-cover' />}
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
                handleDelete={handleDelete}
            />}
        </Col>
    );
};

export default SinglePostCard;