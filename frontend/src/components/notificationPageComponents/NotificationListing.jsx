import { useState, useEffect } from 'react';
import { useSocket } from '../../utils/socket/socketContext'; // Assuming you have a socket context set up
import { fetchNotificationsApi } from '../../utils/api/notification_api';
import SingleNotification from './SingleNotification';

const NotificationListing = () => {
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { socket, notifications, setNotifications } = useSocket();

    // Fetch initial notifications on component mount
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetchNotificationsApi();
                console.log('response:', response)
                setNotifications(response)
                // setNotifications((prev) => [...response, ...prev]); // Merge API notifications with existing
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setIsLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            {isLoading ? (
                <p className='text-center my-8'>Loading...</p> // Loading indicator
            ) : notifications.length > 0 ? (
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