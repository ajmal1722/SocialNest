import React from 'react'

const SinglePost = ({ post }) => {
    return (
        <div className='mx-auto border max-w-lg my-2 p-3 rounded-lg text-primary-dark dark:text-primary-light'>
            <div className='flex items-center gap-3 h-14 p-2'>
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
            <h1 className='text-xl font-semibold my-2'>
                blog title
            </h1>
            <p className='text-gray-700 dark:text-gray-400'>
                {post.blogContent}
            </p>
        </div>
    )
}

export default SinglePost
