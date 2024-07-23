import React from 'react'

const RightSidbar = ({ content }) => {
    return (
        <div className='sidebar lg:col-span-2 md:fixed bottom-0 right-0 max-w-80 xl:min-w-80 md:min-w-60 hidden md:block border-l dark:border-gray-500'>
            <div className='h-full py-8 text-xl text-ternary-dark dark:text-primary-light'>
                { content }
            </div>
        </div>
    )
}

export default RightSidbar