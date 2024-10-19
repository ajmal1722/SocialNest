import React from 'react';

const NotificationMessage = ({ notification }) => {
    console.log('notification type:', notification)
    const renderMessage = () => {
        switch (notification.type) {
            case 'follow':
                return `has started following you`;
            case 'like':
                return `liked your post`;
            case 'comment':
                return `commented on your post`;
            default:
                return 'You have a new notification';
        }
    };

    return (
        <div className=''>
            {/* Notification message */}
            <p className='text-sm text-gray-600 dark:text-gray-300'>
                {renderMessage()}
            </p>

            {/* Post preview for like/comment notifications */}
            {(notification.type === 'like' || notification.type === 'comment') && notification.post && (
                <div className='mt-2'>
                    <img
                        src={notification.post.image_url} // Assuming post has an imageUrl
                        alt='Post preview'
                        className='w-16 h-16 object-cover rounded-md'
                    />
                </div>
            )}
        </div>
    );
};

export default NotificationMessage;