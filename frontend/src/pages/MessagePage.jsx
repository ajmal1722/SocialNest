import React from 'react'

const MessagePage = () => {
    return (
        <div className='min-h-[70vh] md:col-span-8 col-span-10 flex justify-between'>
            <div className='w-full md:h-[85vh] h-[75vh] flex flex-col'>
                <div className='dark:bg-secondary-dark m-5 h-[600px] flex flex-col rounded-md'>
                    {/* Top Section: Profile Image and Username */}
                    <div className='flex items-center p-4 border-b'>
                        <img src="https://via.placeholder.com/40" alt="Profile" className='rounded-full h-10 w-10' />
                        <span className='ml-4 font-semibold'>Username</span>
                    </div>

                    {/* Middle Section: Chat Content */}
                    <div className='flex-1 p-4 overflow-y-auto'>
                        {/* Chat message from another user */}
                        <div className='flex mb-4'>
                            <img src="https://via.placeholder.com/30" alt="Sender Profile" className='rounded-full h-8 w-8' />
                            <div className='ml-2 p-2 bg-gray-200 rounded-md max-w-[70%] break-words'>
                                <p>
                                    Hey there! How's it going? This is a really long message that should break into multiple lines if it exceeds the container's width.
                                </p>
                            </div>
                        </div>

                        {/* Chat message from current user */}
                        <div className='flex justify-end mb-4'>
                            <div className='mr-2 p-2 bg-blue-500 text-white rounded-md max-w-[70%] break-words'>
                                <p>
                                    I'm good! What about you? This is another long message that will wrap onto new lines if it is too long for the message container.
                                </p>
                            </div>
                            <img src="https://via.placeholder.com/30" alt="User Profile" className='rounded-full h-8 w-8' />
                        </div>

                        {/* Add more chat messages here */}
                    </div>

                    {/* Bottom Section: Input for Typing Messages */}
                    <div className='p-4 border-t'>
                        <input
                            type='text'
                            placeholder='Type a message...'
                            className='w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                </div>
            </div>

            {/* Right section (can be anything else) */}
            <div className='w-3/6 h-full border-l dark:border-gray-500'>
                {/* Add content here */}
            </div>
        </div>
    )
}

export default MessagePage
