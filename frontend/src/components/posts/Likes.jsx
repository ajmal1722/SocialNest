import { useSelector, useDispatch } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { like_post, unLike_post } from "../../redux/slices/postSlice";
import { likeOrUnlikePostApi } from "../../utils/api/post_api";

const Likes = ({ post }) => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const likes = useSelector(state => state.posts.find(item => item._id === post._id).likes);
    const isLiked = likes.includes(userInfo._id)

    const dispatch = useDispatch();

    const handleLike = async () => {
        try {
            const response = await likeOrUnlikePostApi(post._id);
            if (response.message === 'Post liked successfully') {
                dispatch(like_post({ postId: post._id, userId: userInfo._id }))
            } else if (response.message === 'Post unliked successfully') {
                dispatch(unLike_post({ postId: post._id, userId: userInfo._id }))
            }
        } catch (error) {
            console.error('Failed to like post:', error);
        }
    }

    return (
        <div className="cursor-pointer">
            {isLiked ?
                <FaHeart className='text-secondary-light' onClick={handleLike} /> :
                <FaRegHeart className='hover:scale-110' onClick={handleLike} />}
            <h1 className="text-sm text-center font-semibold my-1">
                {likes.length === 1 ? "1 like" : `${likes.length} likes`}
            </h1>
        </div>
    )
}

export default Likes