import { useState, useEffect } from 'react';
import { fetchNotificationsApi } from '../../utils/api/notification_api';
import SingleNotification from './SingleNotification';

const NotificationListing = () => {
    const [notifications, setNotifications] = useState();

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetchNotificationsApi();
            setNotifications(response);
        }

        fetchNotifications()
    }, [])
    return (
        <div>
            Notifications
            {notifications?.map(notification => (
                <SingleNotification 
                    key={notification._id}
                    notification={notification}
                />
            ))}
        </div>
    )
}

export default NotificationListing
