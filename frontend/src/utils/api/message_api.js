import messageInstance from "../../axios_instaces/messageInstance";

export const convoUserApi = async () => {
    try {
        const response = await messageInstance.get('/users');
        console.log('conversation users', response.data.users);
        return response.data
     } catch (error) {
         console.log('error fetching users:', error);
     }
}

export const getMessagesApi = async (id) => {
    try {
        const response = await messageInstance.get(`/${id}`);
        console.log('messages', response.data.messages);
        return response.data
    } catch (error) {
        console.log('error fetching messages:', error);
    }
}

export const sendMessagesApi = async (id, message) => {
    try {
        const response = await messageInstance.post(`/send/${id}`, message);
        console.log('message send response:', response.data.messages);
        return response.data
    } catch (error) {
        console.log('error sending messages:', error);
    }
}

export const getUnreadMessagesCountApi = async () => {
    try {
        const response = await messageInstance.get(`/get-unread-count`);
        console.log('unread message count:', response.data);
        return response.data
    } catch (error) {
        console.log('error marking read messages:', error);
    }
}

export const markMessagesAsReadApi = async (id) => {
    try {
        const response = await messageInstance.post(`/mark`, message);
        console.log('message mark response:', response.data.messages);
        return response.data
    } catch (error) {
        console.log('error counting unread messages:', error);
    }
}

export const getUnreadMessageCountPerConversationApi = async () => {
    try {
        const response = await messageInstance.get(`/get-unread-count-per-conversation`);
        console.log('unread message count per conversation:', response.data.unreadCounts);
        return response.data
    } catch (error) {
        console.log('error unread message count per conversation:', error);
    }
}