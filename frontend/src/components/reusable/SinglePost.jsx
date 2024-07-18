import { SlOptionsVertical } from "react-icons/sl";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { BsSave2Fill } from "react-icons/bs";

const SinglePost = ({ post }) => {
    return (
        <div className='mx-auto border max-w-lg my-2 p-3 rounded-lg text-primary-dark dark:text-primary-light'>
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
                <SlOptionsVertical />
            </div>
            <h1 className='text-xl font-semibold my-2'>
                blog title
            </h1>
            <p className='text-gray-700 dark:text-gray-400'>
                {post.blogContent}
            </p>
            <div className='flex justify-between px-3 text-2xl mt-4'>
                <FaRegHeart />
                <FaRegComment />
                <BsSave2Fill />
            </div>
        </div>
    )
}

export default SinglePost
