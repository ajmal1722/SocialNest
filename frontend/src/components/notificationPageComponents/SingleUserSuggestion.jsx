import React from 'react'

const SingleUserSuggestion = () => {
    return (
        <div className='flex justify-between gap-2 border p-2 rounded-lg m-1'>
            <div className='flex gap-2'>
            <div>
                <img 
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" 
                    className='rounded-full h-12'
                />
            </div>
            <div className=''>
                <h1 className='font-semibold'>
                    Username
                </h1>
                <h2 className='text-sm font-thin mx-1'>
                    full Name
                </h2>
            </div>
            </div>
            <button className='mr-4 text-base font-semibold text-blue-500 hover:text-primary-dark hover:dark:text-primary-light'>
                Follow
            </button>
        </div>
    )
}

export default SingleUserSuggestion
