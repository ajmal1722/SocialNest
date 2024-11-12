import axios from "axios";

const messageInstance = axios.create({
    baseURL: 'https://social-nest-backend.vercel.app/messages',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
    }    
})

export default messageInstance;