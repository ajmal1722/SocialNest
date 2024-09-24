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
        console.log('error fetching users:', error);
    }
}