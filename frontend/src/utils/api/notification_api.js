import notificationInstanse from "../../axios_instaces/notificationInstance";

const fetchNotificationsApi = async () => {
    try {
        const response = await notificationInstanse.get('/')
        console.log('fetch notifications:', response.data);
        return response.data;
    } catch (error) {
        console.log('error fetching notifications:', error);
    }
}

export {
    fetchNotificationsApi
}