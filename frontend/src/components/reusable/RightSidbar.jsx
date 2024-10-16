import React from 'react'

const RightSidbar = ({ content }) => {
    return (
        <div className='sidebar lg:col-span-2 md:fixed bottom-0 right-0 xl:min-w-80 md:min-w-60 md:block md:border-l dark:border-gray-500 overflow-y-auto '>
            <div className='h-full py-8 text-xl text-ternary-dark dark:text-primary-light'>
                { content }
            </div>
        </div>
    )
}

export default RightSidbar