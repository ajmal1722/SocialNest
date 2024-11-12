import axios from "axios";

const followInstance = axios.create({
    baseURL: 'https://social-nest-backend.vercel.app/follow',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
    }    
})

export default followInstance;