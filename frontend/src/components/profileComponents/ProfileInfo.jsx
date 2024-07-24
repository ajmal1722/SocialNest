import React from 'react'

const ProfileInfo = () => {
    return (
        <div>
            <div className='flex my-4'>
                <h1 className='text-2xl font-semibold'>
                    Full name
                </h1>
                <button className='px-4'>
                    Edit Profile
                </button>
            </div>
            <h1 className='font-semibold mb-4'>
                <span className='font-bold text-2xl m-1'>@</span>
                Username
            </h1>
            <div className='flex text-center gap-6 my-4'>
                <div className='cursor-pointer'>
                    <h1 className='text-2xl font-bold'>
                        0
                    </h1>
                    <h1>
                        Posts
                    </h1>
                </div>
                <div className='cursor-pointer'>
                    <h1 className='text-2xl font-bold'>
                        1
                    </h1>
                    <h1>
                        Followers
                    </h1>
                </div>
                <div className='cursor-pointer'>
                    <h1 className='text-2xl font-bold'>
                        0
                    </h1>
                    <h1>
                        Following
                    </h1>
                </div>
            </div>
            <h1>
                Member since July 2023
            </h1>
        </div>
    )
}

export default ProfileInfo
