import React from 'react'

const SingleChat = () => {
    return (
        <div className='flex justify-end mb-4'>
            <div className='mr-2 p-2 bg-blue-500 text-white rounded-md max-w-[70%] break-words'>
                <p>
                    I'm good! What about you? This is another long message that will wrap onto new lines if it is too long for the message container.
                </p>
            </div>
            <img src="https://via.placeholder.com/30" alt="User Profile" className='rounded-full h-8 w-8' />
        </div>
    )
}

export default SingleChat
