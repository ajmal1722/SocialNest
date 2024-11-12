import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-nest-backend.vercel.app/post',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        timeout: 1000
    }    
})

export default instance;