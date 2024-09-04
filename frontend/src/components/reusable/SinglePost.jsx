import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SlOptions } from "react-icons/sl";
import DateFormatter from "./DateFormatter";
import { delete_post } from "../../redux/slices/postSlice";
import Likes from "../posts/Likes";
import OtherUserLikes from "../posts/OtherUserLikes";
import Comments from "../posts/Comments";
import SavePost from "../posts/SavePost";
import ProfilePostOptions from "../profileComponents/ProfilePostOptions";
import { deletePost, archivePostApi } from "../../utils/api/post_api";
import { blockUserApi } from "../../utils/api/user_api";

const SinglePost = ({ post, initialUser, setPosts }) => {
    const [showOptions, setShowOptions] = useState(false);
    const userInfo = useSelector(state => state.auth.userInfo);

    const isOwner = !initialUser || userInfo._id === initialUser._id;

    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await deletePost(post._id);
            dispatch(delete_post(post._id));
            setShowOptions(false); // Close options after deletion
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    const handleBlock = async (id) => {
        const response = await blockUserApi(id)
    }

    const handleArchive = async () => {
        try {
            await archivePostApi(post._id)
            dispatch(delete_post(post._id)); // Using delete reducer for archive, because they use same logic as delete in redux
            setShowOptions(false);
        } catch (error) {
            console.error('Failed to archive post:', error);
        }
    }

    const blockUserButton = (
        <button onClick={() => handleBlock(post.author_id)} className='text-secondary-light font-semibold border-b dark:border-gray-500 py-2 w-full hover:scale-105'>
            Block User
        </button>
    );

    return (
        <div className='mx-auto border dark:border-gray-500 max-w-lg my-2 p-3 rounded-lg text-primary-dark dark:text-primary-light'>
            <div className='flex justify-between items-center gap-3 h-14 p-2'>
                <Link
                    to={`/user/${initialUser ? initialUser._id : userInfo._id}`}
                    key={initialUser ? initialUser._id : userInfo._id} // Use user ID as key
                    className="flex items-center gap-3"
                >
                    <img
                        src={initialUser ? initialUser.profilePicture : userInfo.profilePicture }
                        className='rounded-full max-w-8 object-cover'
                    />
                    <h1 className='text-lg'>
                        {initialUser ? initialUser.username : userInfo.username}
                    </h1>
                    <DateFormatter date={post.createdAt} />
                </Link>
                <SlOptions
                    onClick={() => setShowOptions(true)}
                    className='cursor-pointer'
                />
            </div>
            <h1 className='text-xl font-semibold my-2'>
                {post.caption}
            </h1>
            {post.content_type === 'Image' ? (
                <img src={post.image_url} alt="Post Image" className="w-full h-auto" />
            ) : (
                <p className='text-gray-700 dark:text-gray-400'>
                    {post.blogContent}
                </p>
            )}
            <div className='flex justify-between px-3 text-2xl mt-4'>
                {initialUser ? <OtherUserLikes post={post} initialUser={initialUser} /> :
                    <Likes post={post} />}
                <Comments post={post} />
                <SavePost post={post} />
            </div>
            {showOptions && (
                <ProfilePostOptions
                    setShowOptions={setShowOptions}
                    postId={post._id}
                    setPosts={setPosts}
                    handleDelete={handleDelete}
                    handleArchive={handleArchive}
                    isOwner={isOwner}
                    content={!isOwner ? blockUserButton : null} // Pass Block User button if not owner
                />
            )}
        </div>
    )
}

export default SinglePost