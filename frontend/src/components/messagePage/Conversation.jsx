import React from 'react'

const Conversation = ({ user, getMessages }) => {
    return (
        <div onClick={() => getMessages(user)} className='flex border w-full cursor-pointer'>
            <div className='flex items-center'>
                <img
                    src={user.profilePicture} alt=""
                    className='h-12 rounded-full m-2'
                />
            </div>
            <div className='my-3 w-9/12'>
                <h1 className='text-lg font-semibold'>
                    {user.username}
                </h1>
                <div className='flex justify-between'>
                    <p>
                        This is last message
                    </p>
                    <span className='rounded-full md:mr-1 bg-sky-600 px-2 mr-4'>
                        3
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Conversation
