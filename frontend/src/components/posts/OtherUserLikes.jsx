import { useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeOrUnlikePostApi } from "../../utils/api/post_api";

const OtherUserLikes = ({ post, initialUser }) => {
    const userInfo = initialUser;
    const ownerInfo = useSelector(state => state.auth.userInfo);
    
    const [likes, setLikes] = useState(post.likes);
    const isLiked = likes?.includes(ownerInfo._id);

    console.log('likes check:', isLiked);
    

    const handleLike = async () => {
        try {
            const response = await likeOrUnlikePostApi(post._id);
            if (response.message === 'Post liked successfully') {
                setLikes(prevLikes => [...prevLikes, userInfo._id]);
            } else if (response.message === 'Post unliked successfully') {
                setLikes(prevLikes => prevLikes.filter(id => id !== userInfo._id));
            }
        } catch (error) {
            console.error('Failed to like post:', error);
        }
    };

    return (
        <div className="cursor-pointer">
            {isLiked ?
                <FaHeart className='text-secondary-light' onClick={handleLike} /> :
                <FaRegHeart className='hover:scale-110' onClick={handleLike} />}
            <h1 className="text-sm text-center font-semibold my-1">
                {likes?.length === 1 ? "1 like" : `${likes?.length} likes`}
            </h1>
        </div>
    );
};

export default OtherUserLikes;