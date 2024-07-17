import React from 'react'

const SinglePost = ({ post }) => {
    return (
        <div className='border'>
            <p>
                { post.blogContent }
            </p>
        </div>
    )
}

export default SinglePost
