import React from 'react'

const ArchivedPostOptionContent = () => {
    return (
        <div >
            <button onClick={() => handleAction('delete')} className='text-secondary-light font-semibold border-b dark:border-gray-500 py-2 w-full'>
                Delete
            </button>
            <button onClick={() => handleAction('delete')} className='text-green-500 font-semibold border-b dark:border-gray-500 py-2 w-full'>
                Add to Profile 
            </button>
        </div>
    )
}

export default ArchivedPostOptionContent
