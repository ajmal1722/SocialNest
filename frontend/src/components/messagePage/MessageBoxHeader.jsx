import React from 'react'

const MessageBoxHeader = () => {
    return (
        <div className='flex items-center p-4 border-b'>
            <img src="https://via.placeholder.com/40" alt="Profile" className='rounded-full h-10 w-10' />
            <span className='ml-4 font-semibold'>Username</span>
        </div>
    )
}

export default MessageBoxHeader
