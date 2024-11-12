import axios from "axios";

const notificationInstanse = axios.create({
    baseURL: 'https://social-nest-backend.vercel.app/notification',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
    }    
})

export default notificationInstanse;