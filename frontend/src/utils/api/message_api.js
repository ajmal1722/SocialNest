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

export const markMessagesAsReadApi = async (id) => {
    try {
        const response = await messageInstance.post(`/mark`, message);
        console.log('message mark response:', response.data.messages);
        return response.data
    } catch (error) {
        console.log('error marking read messages:', error);
    }
}