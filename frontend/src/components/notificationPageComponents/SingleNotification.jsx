import React from 'react';

const SingleNotification = ({ notification }) => {
    return (
        <div className='flex items-center gap-4 p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150'>
            {/* Sender's Profile Picture */}
            <img
                src={notification.senderId.profilePicture}
                alt={`${notification.senderId.name}'s profile`}
                className='w-12 h-12 rounded-full object-cover'
            />

            {/* Notification Details */}
            <div className='flex flex-col'>
                {/* Sender's Name */}
                <span className='font-medium text-gray-900 dark:text-gray-100'>
                    {notification.senderId.name}
                </span>
                {/* Notification Message */}
                <span className='text-sm text-gray-600 dark:text-gray-300'>
                    {notification.type}
                </span>
            </div>

            {/* Notification Time */}
            <span className='ml-auto text-xs text-gray-500 dark:text-gray-400'>
                {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>
    );
};

export default SingleNotification;