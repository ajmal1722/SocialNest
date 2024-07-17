import React from 'react'

const SinglePost = ({ post }) => {
    return (
        <div className='mx-auto border max-w-lg my-2'>
            <p>
                { post.blogContent }
            </p>
        </div>
    )
}

export default SinglePost
