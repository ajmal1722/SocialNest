import React from 'react'

const Conversation = ({ user, getMessages }) => {
    return (
        <div onClick={() => getMessages(user._id)} className='flex border w-full cursor-pointer'>
            <div className='flex items-center'>
                <img 
                    src={user.profilePicture} alt="" 
                    className='h-12 rounded-full m-2'
                />
            </div>
            <div className='my-3'>
                <h1 className='text-lg font-semibold'>
                    {user.username}
                </h1>
                <p>
                    This is last message 
                </p>
            </div>
        </div>
    )
}

export default Conversation
