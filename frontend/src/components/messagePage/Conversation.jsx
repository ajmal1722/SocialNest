import React from 'react'

const Conversation = () => {
    return (
        <div className='flex border w-full'>
            <div className='flex items-center'>
                <img 
                    src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg" alt="" 
                    className='h-12 rounded-full m-2'
                />
            </div>
            <div className='my-3'>
                <h1 className='text-lg font-semibold'>
                    userName
                </h1>
                <p>
                    This is last message 
                </p>
            </div>
        </div>
    )
}

export default Conversation
