import React from 'react'

const PostListingLinks = ({ setActiveLink }) => {
    return (
        <div className='flex justify-center gap-4'>
            <button onClick={() => setActiveLink('Blog')}>
                Mini Blogs
            </button>
            <button onClick={() => setActiveLink('Post')}>
                Images & Videos
            </button>
        </div>
    )
}

export default PostListingLinks
