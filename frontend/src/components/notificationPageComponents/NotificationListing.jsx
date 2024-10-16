import { useState, useEffect } from 'react';
import { useSocket } from '../../utils/socket/socketContext'; // Assuming you have a socket context set up
import { fetchNotificationsApi } from '../../utils/api/notification_api';
import SingleNotification from './SingleNotification';

const NotificationListing = () => {
    const [notifications, setNotifications] = useState([]);
    const { socket } = useSocket();

    // Fetch initial notifications on component mount
    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetchNotificationsApi();
            setNotifications(response); // Load existing notifications from API
        };

        fetchNotifications();
    }, []);

    // Handle real-time notifications via socket
    useEffect(() => {
        const handleNewNotification = (notification) => {
            console.log(notification)
            // Add the new notification to the top of the list
            setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        };

        // Listen for 'notification' event from the server
        socket.on('notification', handleNewNotification);

        // Cleanup on component unmount
        return () => {
            socket.off('notification', handleNewNotification);
        };
    }, [socket]);

    return (
        <div className=''>
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <SingleNotification 
                        key={notification._id}
                        notification={notification}
                    />
                ))
            ) : (
                <p>No notifications yet</p>
            )}
        </div>
    );
};

export default NotificationListing;