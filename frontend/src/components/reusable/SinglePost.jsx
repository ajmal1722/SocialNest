import { useState } from "react";
import { SlOptions } from "react-icons/sl";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { BsSave2Fill } from "react-icons/bs";
import ProfilePostOptions from "../profileComponents/ProfilePostOptions";
import { deletePost } from "../../utils/api/post_api";

const SinglePost = ({ post }) => {
    const [showOptions, setShowOptions] = useState(false);
    
    const handleDelete = async () => {
        try {
            const response = await deletePost(post._id);
            console.log('Post deleted successfully!', response);
            setShowOptions(false); // Close options after deletion
        } catch (error) {
            // Handle error, e.g., show error message
            console.error('Failed to delete post:', error);
        }
    };

    return (
        <div className='mx-auto border dark:border-gray-500 max-w-lg my-2 p-3 rounded-lg text-primary-dark dark:text-primary-light'>
            <div className='flex justify-between items-center gap-3 h-14 p-2'>
                <div className="flex items-center gap-3">
                <img
                    src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" alt=""
                    className='rounded-full max-w-10'
                />
                <h1 className='text-lg'>
                    Username
                </h1>
                <p className='text-xs'>
                    3 hr ago
                </p>
                </div>
                <SlOptions 
                    onClick={() => setShowOptions(true)} 
                    className='cursor-pointer'
                />
            </div>
            <h1 className='text-xl font-semibold my-2'>
                {post.caption}
            </h1>
            <p className='text-gray-700 dark:text-gray-400'>
                {post.blogContent}
            </p>
            <div className='flex justify-between px-3 text-2xl mt-4'>
                <FaRegHeart />
                <FaRegComment />
                <BsSave2Fill />
            </div>
            {showOptions && (
                <ProfilePostOptions
                    setShowOptions={setShowOptions}
                    postId={post._id}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default SinglePost
