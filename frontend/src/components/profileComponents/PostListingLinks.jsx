import React from 'react'

const PostListingLinks = ({ setActiveLink }) => {
    return (
        <div className='flex justify-center gap-4 md:gap-10 text-primary-dark dark:text-primary-light'>
            <button onClick={() => setActiveLink('Post')} className=''>
                Posts
            </button>
            <button onClick={() => setActiveLink('Blog')}>
                Blogs
            </button>
            <button onClick={() => setActiveLink('Media')}>
                Media
            </button>
        </div>
    )
}

export default PostListingLinks
