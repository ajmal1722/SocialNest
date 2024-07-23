import React from 'react'

const RightSidbar = () => {
    return (
        <div className='sidebar lg:col-span-2 lg:fixed bottom-0 xl:right-72 lg:right-60 hidden md:block border-l dark:border-gray-500'>
            <div className='h-full py-8 text-xl text-ternary-dark dark:text-primary-light'>
                sidebar
            </div>
        </div>
    )
}

export default RightSidbar