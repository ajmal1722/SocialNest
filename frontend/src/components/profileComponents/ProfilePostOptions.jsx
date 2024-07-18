import React from 'react'

const ProfilePostOptions = ({ setShowOptions }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black  bg-opacity-50 text-center">
            <div className="bg-primary-light dark:bg-secondary-dark max-w-sm w-full rounded-lg p-3 relative text-primary-dark dark:text-primary-light">
                <button className='text-secondary-light font-semibold border-b dark:border-gray-500 py-2 w-full'>
                    Delete
                </button>
                <button className='border-b dark:border-gray-500 py-3 w-full'>
                    Edit
                </button>
                <button onClick={() => setShowOptions(false)} className=' font-semibold py-2 w-full'>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ProfilePostOptions