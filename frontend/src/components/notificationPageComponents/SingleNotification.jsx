import { Link } from 'react-router-dom'
import NotificationMessage from "./NotificationMessage";
import DateFormatter from "../reusable/DateFormatter";

const SingleNotification = ({ notification }) => {
    return (
        <div className='flex items-center gap-4 p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150'>
            {/* Sender's Profile Picture */}
            <Link to={`/user/${notification.senderId._id}`}>
                <img
                    src={notification.senderId.profilePicture}
                    alt={`${notification.senderId.name}'s profile`}
                    className='w-12 h-12 rounded-full object-cover'
                />
            </Link>

            {/* Notification Details */}
            <Link to={`/user/${notification.senderId._id}`}>
                <div className='flex flex-col'>
                    <span className='font-medium text-gray-900 dark:text-gray-100'>
                        {notification.senderId.username}
                    </span>
                </div>
            </Link>

            {/* Notification Message */}
            <NotificationMessage notification={notification} />

            {/* Notification Time */}
            <span className='ml-auto text-xs text-gray-500 dark:text-gray-400'>
                <DateFormatter date={notification.createdAt} />
            </span>
        </div>
    );
};

export default SingleNotification;